const crypto = require("node:crypto");
const SkillGapCache = require("../models/skillGapCache.model");

const PROMPT_VERSION = "v1";
const SKILL_GAP_MODEL =
  process.env.SKILL_GAP_MODEL || "openai/gpt-oss-20b";


const {
  extractPdfText,
  extractDocxText,
} = require("../services/fileParse.service");

const { compareResumeWithJD } = require("../services/skillGap.service");

const MAX_RESUME_TEXT_LENGTH = 10000;
const MAX_JOB_DESCRIPTION_TEXT_LENGTH = 10000;
function getGeminiStatus(error) {
  if (error?.status === 503 || error?.statusCode === 503) return 503;
  if (error?.status === 504 || error?.statusCode === 504) return 504;

  try {
    const details = JSON.parse(error?.message || "");
    const code = details.error?.code;
    const status = details.error?.status;

    if (code === 503 || status === "UNAVAILABLE") return 503;
    if (code === 504 || status === "DEADLINE_EXCEEDED") return 504;
  } catch {
    if (error?.message?.includes("DEADLINE_EXCEEDED")) return 504;
  }

  return null;
}
function normalizeText(text) {
  return text.replace(/\r\n/g, "\n").replace(/[ \t]+/g, " ").trim();
}

function createInputHash(resumeText, jobDescriptionText) {
  const cacheInput = JSON.stringify([
    "groq",
    SKILL_GAP_MODEL,
    PROMPT_VERSION,
    normalizeText(resumeText),
    normalizeText(jobDescriptionText),
  ]);

  return crypto.createHash("sha256").update(cacheInput).digest("hex");
}

async function extractFileText(file) {
  const fileName = file.originalname.toLowerCase();

  if (file.mimetype === "application/pdf" || fileName.endsWith(".pdf")) {
    return await extractPdfText(file.buffer);
  }

  if (
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    file.mimetype === "application/octet-stream" ||
    fileName.endsWith(".docx")
  ) {
    return await extractDocxText(file.buffer);
  }

  throw new Error("Unsupported file type.");
}

async function analyzeSkillGap(req, res) {
  try {
    const resume = req.files?.resume?.[0];
    const jobDescriptionFile = req.files?.jobDescription?.[0];

    if (!resume) {
      return res.status(400).json({
        message: "Please upload your resume.",
      });
    }

    const resumeText = await extractFileText(resume);

    let jobDescriptionText = req.body.jobDescription || "";

    if (jobDescriptionFile) {
      jobDescriptionText = await extractFileText(jobDescriptionFile);
    }

    if (!jobDescriptionText.trim()) {
      return res.status(400).json({
        message: "Please provide a job description.",
      });
    }

    if (resumeText.length > MAX_RESUME_TEXT_LENGTH) {
      return res.status(400).json({
        message: "Resume text is too long. Please upload a shorter resume.",
      });
    }

    if (jobDescriptionText.length > MAX_JOB_DESCRIPTION_TEXT_LENGTH) {
      return res.status(400).json({
        message: "Job description is too long. Please provide a shorter description.",
      });
    }

    const normalizedResumeText = normalizeText(resumeText);
const normalizedJobDescriptionText = normalizeText(jobDescriptionText);

const cacheFilter = {
  userId: req.user.id,
  inputHash: createInputHash(
    normalizedResumeText,
    normalizedJobDescriptionText
  ),
};

const cachedResult = await SkillGapCache.findOne(cacheFilter).lean();

if (cachedResult) {
  return res.json({
    message: "Skill gap analysis loaded from saved results.",
    analysis: cachedResult.analysis,
    cached: true,
  });
}

const analysis = await compareResumeWithJD(
  normalizedResumeText,
  normalizedJobDescriptionText
);

try {
  await SkillGapCache.create({
    ...cacheFilter,
    analysis,
  });

  return res.json({
    message: "Skill gap analysis completed successfully.",
    analysis,
    cached: false,
  });
} catch (error) {
  if (error.code !== 11000) {
    throw error;
  }

  const savedResult = await SkillGapCache.findOne(cacheFilter).lean();

  if (!savedResult) {
    throw error;
  }

  return res.json({
    message: "Skill gap analysis loaded from saved results.",
    analysis: savedResult.analysis,
    cached: true,
  });
}
  } catch (error) {
    const providerStatus = getGeminiStatus(error);

    console.error("Skill gap extraction error:", error.message);

    if (providerStatus === 503) {
      return res.status(503).json({
        message: "The AI service is temporarily busy. Please wait a minute and try again.",
      });
    }

    if (providerStatus === 504) {
      return res.status(504).json({
        message: "The AI service took too long to respond. Try again with shorter resume or job-description text.",
      });
    }

    return res.status(500).json({
      message: "Could not process the uploaded files.",
    });
  }
}

module.exports = { analyzeSkillGap };