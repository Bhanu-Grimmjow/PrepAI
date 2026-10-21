import { useState } from "react";
import { analyzeSkillGap } from "../services/skillGap.api";

function SkillGap() {
    const [resume, setResume] = useState(null);
    const [jobDescription, setJobDescription] = useState(null);
    const [jobDescriptionText, setJobDescriptionText] = useState("");
    const [loading, setLoading] = useState(false);
    const [analysis, setAnalysis] = useState(null);
    const [error, setError] = useState("");


    async function handleAnalyze() {
        setError("");
        setAnalysis(null);

        if (!resume) {
            setError("Please upload your resume first.");
            return;
        }

        if (!jobDescription && !jobDescriptionText.trim()) {
            setError("Please upload or paste a job description.");
            return;
        }

        setLoading(true);

        try {
            const result = await analyzeSkillGap(
                resume,
                jobDescription || jobDescriptionText
            );

            setAnalysis(result);
        } catch (error) {
            setError(error.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    }


    return (

        <div className="min-h-screen w-full bg-[#080808] text-white px-4 py-8 sm:px-6 lg:px-10">
            <div className="max-w-5xl mx-auto">

                <p className="text-xs uppercase tracking-[0.18em] text-[#E52B35] mb-2">
                    Improve
                </p>

                <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                    Skill Gap Analyzer
                </h1>

                <p className="text-sm text-[#756D71] mt-3 max-w-2xl">
                    Compare your resume with a job description and discover
                    which skills match, which need improvement, and what to learn next.
                </p>


                <div className="mt-8 rounded-2xl border border-[#2A1719] bg-[#10090A] p-5 sm:p-7 space-y-7">
                    <div className="form-group">
                        <label className="text-sm font-medium text-white">
                            Upload Your Resume (PDF or DOCX)
                        </label>

                        <input
                            type="file"
                            accept=".pdf,.docx"
                            className="block w-full text-sm text-[#B9B0B3] file:mr-4 file:rounded-lg file:border-0 file:bg-[#2A1114] file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-[#42171C]"
                            onChange={(event) => setResume(event.target.files[0])}
                        />
                    </div>

                    <div className="flex flex-col gap-3">
                        <label className="text-sm font-medium text-white">
                            Upload Job Description (Optional)
                        </label>

                        <input
                            type="file"
                            accept=".pdf,.docx"
                            className="block w-full text-sm text-[#B9B0B3] file:mr-4 file:rounded-lg file:border-0 file:bg-[#2A1114] file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-[#42171C]"
                            onChange={(event) =>
                                setJobDescription(event.target.files[0])
                            }
                        />
                    </div>

                    <div className="flex flex-col gap-3">
                        <label>Or Paste Job Description</label>


                        <textarea
                            rows="7"
                            className="w-full rounded-xl border border-[#332024] bg-[#080808] p-4 text-sm text-white placeholder:text-[#756D71] outline-none focus:border-[#E52B35] focus:ring-1 focus:ring-[#E52B35] resize-y"
                            placeholder="Paste the job description here..."
                            value={jobDescriptionText}
                            onChange={(event) =>
                                setJobDescriptionText(event.target.value)
                            }
                        />

                    </div>


                    <button
                        type="button"
                        onClick={handleAnalyze}
                        disabled={loading}
                        className="w-full rounded-xl bg-[#E52B35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#C9202A] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "Analyzing..." : "Analyze Skill Gap"}
                    </button>



                    {error && (
                        <p className="error-message">
                            {error}
                        </p>
                    )}

                    
{analysis && (
    <div className="mt-8 space-y-6 border-t border-[#321619] pt-7">

        {/* Results heading */}
        <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[#E52B35]">
                Your Report
            </p>

            <h2 className="mt-2 text-2xl font-semibold">
                Skill Gap Analysis
            </h2>

            <p className="mt-2 text-sm text-[#8F8589]">
                Here is how your resume aligns with the job description.
            </p>
        </div>

        {/* Match percentage */}
        <div className="rounded-2xl border border-[#321619] bg-[#160B0D] p-5">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <p className="text-sm text-[#B9B0B3]">
                        Estimated Resume Match
                    </p>

                    <p className="mt-2 text-4xl font-bold text-white">
                        {analysis.matchPercentage}%
                    </p>
                </div>

                <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-[#E52B35] text-xl font-semibold text-[#E52B35]">
                    {analysis.matchPercentage}%
                </div>
            </div>

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-[#321619]">
                <div
                    className="h-full rounded-full bg-[#E52B35] transition-all duration-500"
                    style={{
                        width: `${Math.min(
                            100,
                            Math.max(0, Number(analysis.matchPercentage) || 0)
                        )}%`,
                    }}
                />
            </div>

            <p className="mt-3 text-xs leading-5 text-[#8F8589]">
                This is an AI-generated estimate based on the information
                found in your resume. A skill missing from your resume
                does not necessarily mean you do not have it.
            </p>
        </div>

        {/* Skill categories */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

            {/* Matched skills */}
            <div className="rounded-xl border border-emerald-900/60 bg-[#0D1511] p-5">
                <h3 className="font-semibold text-emerald-400">
                    Matched Skills
                </h3>

                <p className="mt-1 text-xs text-[#8F8589]">
                    Clearly supported by your resume
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                    {(analysis.matchedSkills || []).length > 0 ? (
                        analysis.matchedSkills.map((skill, index) => (
                            <span
                                key={index}
                                className="rounded-full border border-emerald-900 bg-emerald-950/50 px-3 py-1.5 text-xs text-emerald-300"
                            >
                                {skill}
                            </span>
                        ))
                    ) : (
                        <p className="text-sm text-[#8F8589]">
                            No matched skills found.
                        </p>
                    )}
                </div>
            </div>

            {/* Partially matched skills */}
            <div className="rounded-xl border border-amber-900/60 bg-[#171209] p-5">
                <h3 className="font-semibold text-amber-400">
                    Partially Matched
                </h3>

                <p className="mt-1 text-xs text-[#8F8589]">
                    More evidence or practice may be needed
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                    {(analysis.partiallyMatchedSkills || []).length > 0 ? (
                        analysis.partiallyMatchedSkills.map((skill, index) => (
                            <span
                                key={index}
                                className="rounded-full border border-amber-900 bg-amber-950/40 px-3 py-1.5 text-xs text-amber-300"
                            >
                                {skill}
                            </span>
                        ))
                    ) : (
                        <p className="text-sm text-[#8F8589]">
                            No partially matched skills.
                        </p>
                    )}
                </div>
            </div>

            {/* Missing skills */}
            <div className="rounded-xl border border-[#5A2026] bg-[#190B0D] p-5">
                <h3 className="font-semibold text-[#FF6870]">
                    Not Found in Resume
                </h3>

                <p className="mt-1 text-xs text-[#8F8589]">
                    Consider adding evidence if you have these skills
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                    {(analysis.missingSkills || []).length > 0 ? (
                        analysis.missingSkills.map((skill, index) => (
                            <span
                                key={index}
                                className="rounded-full border border-[#5A2026] bg-[#2A1114] px-3 py-1.5 text-xs text-[#FF9298]"
                            >
                                {skill}
                            </span>
                        ))
                    ) : (
                        <p className="text-sm text-[#8F8589]">
                            No additional skills listed.
                        </p>
                    )}
                </div>
            </div>

        </div>

        {/* Strengths */}
        <div className="rounded-xl border border-[#321619] bg-[#10090A] p-5">
            <h3 className="text-lg font-semibold">
                Your Strengths
            </h3>

            <ul className="mt-4 space-y-3">
                {(analysis.strengths || []).length > 0 ? (
                    analysis.strengths.map((strength, index) => (
                        <li
                            key={index}
                            className="flex gap-3 text-sm leading-6 text-[#D8D0D3]"
                        >
                            <span className="text-emerald-400">✓</span>
                            <span>{strength}</span>
                        </li>
                    ))
                ) : (
                    <li className="text-sm text-[#8F8589]">
                        No strengths were returned.
                    </li>
                )}
            </ul>
        </div>

        {/* Improvement roadmap */}
        <div className="rounded-xl border border-[#321619] bg-[#10090A] p-5">
            <h3 className="text-lg font-semibold">
                Your Improvement Roadmap
            </h3>

            <p className="mt-2 text-sm text-[#8F8589]">
                Work through these recommendations to improve your job readiness.
            </p>

            <div className="mt-5 space-y-4">
                {(analysis.improvementRoadmap || []).length > 0 ? (
                    analysis.improvementRoadmap.map((step, index) => (
                        <div key={index} className="flex gap-4">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2A1114] text-sm font-semibold text-[#FF6870]">
                                {index + 1}
                            </div>

                            <p className="pt-1 text-sm leading-6 text-[#D8D0D3]">
                                {step}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-[#8F8589]">
                        No roadmap recommendations were returned.
                    </p>
                )}
            </div>
        </div>

    </div>
)}

                </div>
            </div>
        </div>
    );
}

export default SkillGap;

