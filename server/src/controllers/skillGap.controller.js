const {
  extractPdfText,
  extractDocxText,
} = require("../services/fileParse.service");

const { compareResumeWithJD } = require("../services/gemini.service");

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

    const analysis = await compareResumeWithJD(resumeText, jobDescriptionText);

    return res.json({
      message: "Skill gap analysis completed successfully.",
      analysis,
    });
  } catch (error) {
    console.error("Skill gap extraction error:", error.message);
    return res.status(500).json({
      message: "Could not process the uploaded files.",
    });
  }
}

module.exports = { analyzeSkillGap };
