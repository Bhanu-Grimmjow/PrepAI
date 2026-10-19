const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function compareResumeWithJD(resumeText, jobDescriptionText) {
  const prompt = `
You are a resume and job description analyzer.

Compare the resume with the job description.

Return only valid JSON in this format:
{
  "matchPercentage": 0,
  "matchedSkills": [],
  "partiallyMatchedSkills": [],
  "missingSkills": [],
  "strengths": [],
  "improvementRoadmap": []
}

Resume:
${resumeText}

Job Description:
${jobDescriptionText}

Rules:
- Use evidence from the resume.
- Missing from the resume does not necessarily mean the candidate lacks that skill.
- Give a realistic estimated match percentage.
- Keep the roadmap practical and beginner-friendly.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.8-flash",
    contents: prompt,
  });

  return JSON.parse(response.text);
}

module.exports = { compareResumeWithJD };
