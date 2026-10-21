
const API_URL = "http://localhost:3000";

export async function analyzeSkillGap(resume, jobDescription) {
  const formData = new FormData();

  formData.append("resume", resume);
  formData.append("jobDescription", jobDescription);

  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/api/skill-gap/analyze`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Analysis failed");
  }

  return result.analysis;
}
