import { useRef, useState } from "react";
import { analyzeSkillGap } from "../services/skillGap.api";

function SkillGap() {
    const [resume, setResume] = useState(null);
    const [jobDescription, setJobDescription] = useState(null);
    const [jobDescriptionText, setJobDescriptionText] = useState("");
    const [loading, setLoading] = useState(false);
    const [analysis, setAnalysis] = useState(null);
    const [error, setError] = useState("");
    const [cached, setCached] = useState(false);

    const resumeInputRef = useRef(null);
    const jobDescriptionInputRef = useRef(null);

    async function handleAnalyze() {
        setError("");
     setAnalysis(null);
setCached(false);
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

          setAnalysis(result.analysis);
setCached(result.cached);
        } catch (error) {
            setError(error.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen w-full bg-[#080808] px-4 py-8 text-white sm:px-6">
            <div className="mx-auto max-w-3xl">
                <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="mb-8 text-sm text-[#8F8589] transition hover:text-white"
                >
                    ← Back to dashboard
                </button>

                <p className="mb-2 text-xs uppercase tracking-[0.18em] text-[#E52B35]">
                    Improve
                </p>

                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                    Skill Gap Analyzer
                </h1>

                <p className="mt-3 max-w-2xl text-sm text-[#756D71]">
                    Compare your resume with a job description and discover
                    which skills match, which need improvement, and what to learn next.
                </p>

                <div className="mt-8 space-y-7 rounded-2xl border border-[#2A1719] bg-[#10090A] p-5 sm:p-7">
                    <div className="form-group">
                        <label className="mb-3 block text-sm font-medium text-white">
                            Upload Your Resume (PDF or DOCX)
                        </label>

                        <input
                            ref={resumeInputRef}
                            id="resume-upload"
                            type="file"
                            accept=".pdf,.docx"
                            className="peer sr-only"
                            onChange={(event) => {
                                setResume(event.target.files?.[0] || null);
                            }}
                        />

                        <label
                            htmlFor="resume-upload"
                            className="inline-flex cursor-pointer rounded-lg bg-[#2A1114] px-4 py-2 text-sm font-medium text-white hover:bg-[#42171C] peer-focus-visible:ring-2 peer-focus-visible:ring-[#E52B35]"
                        >
                            Choose resume file
                        </label>

                        {resume && (
                            <div className="mt-2 flex items-center gap-3">
                                <span className="text-sm text-[#B9B0B3]">
                                    {resume.name}
                                </span>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setResume(null);

                                        if (resumeInputRef.current) {
                                            resumeInputRef.current.value = "";
                                        }
                                    }}
                                    className="text-sm text-[#E52B35] hover:text-white"
                                >
                                    Remove
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-3">
                        <label
                            htmlFor="job-description-upload"
                            className="text-sm font-medium text-white"
                        >
                            Upload Job Description  (PDF or DOCX)
                        </label>

                        <input
                            ref={jobDescriptionInputRef}
                            id="job-description-upload"
                            type="file"
                            accept=".pdf,.docx"
                            disabled={Boolean(jobDescriptionText.trim())}
                            className="peer sr-only"
                            onChange={(event) => {
                                const file = event.target.files?.[0] || null;
                                setJobDescription(file);

                                if (file) {
                                    setJobDescriptionText("");
                                }
                            }}
                        />

                        <label
                            htmlFor="job-description-upload"
                            className="inline-flex w-fit cursor-pointer rounded-lg bg-[#2A1114] px-4 py-2 text-sm font-medium text-white hover:bg-[#42171C] peer-disabled:cursor-not-allowed peer-disabled:opacity-50 peer-focus-visible:ring-2 peer-focus-visible:ring-[#E52B35]"
                        >
                            Choose job description file
                        </label>

                        {jobDescription && (
                            <div className="flex items-center gap-3">
                                <span className="text-sm text-[#B9B0B3]">
                                    {jobDescription.name}
                                </span>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setJobDescription(null);

                                        if (jobDescriptionInputRef.current) {
                                            jobDescriptionInputRef.current.value = "";
                                        }
                                    }}
                                    className="text-sm text-[#E52B35] hover:text-white"
                                >
                                    Remove
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-3">
                        <label htmlFor="job-description-text">
                            Or Paste Job Description
                        </label>

                        <textarea
                            id="job-description-text"
                            rows="7"
                            disabled={Boolean(jobDescription)}
                            className="w-full resize-y rounded-xl border border-[#332024] bg-[#080808] p-4 text-sm text-white outline-none placeholder:text-[#756D71] focus:border-[#E52B35] focus:ring-1 focus:ring-[#E52B35] disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Paste the job description here..."
                            value={jobDescriptionText}
                            onChange={(event) => {
                                const text = event.target.value;
                                setJobDescriptionText(text);

                                if (text.trim()) {
                                    setJobDescription(null);

                                    if (jobDescriptionInputRef.current) {
                                        jobDescriptionInputRef.current.value = "";
                                    }
                                }
                            }}
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

                   {loading && (
    <p role="status" className="rounded-lg border border-[#321619] bg-[#13090A] px-4 py-3 text-sm text-[#B9B0B3]">
        Analyzing your resume against the job description...
    </p>
)}

{error && (
    <p role="alert" className="rounded-lg border border-[#5A2026] bg-[#190B0D] px-4 py-3 text-sm text-[#FF9298]">
        {error}
    </p>
)}
                    {analysis && (
                        <div className="mt-8 space-y-6 border-t border-[#321619] pt-7">
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
                                <p role="status" className="mt-3 text-xs text-[#8F8589]">
    {cached ? "Loaded your saved analysis." : "Analysis complete."}
</p>
                            </div>

                            <div className="rounded-2xl border border-[#321619] bg-[#160B0D] p-5">
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <p className="text-sm text-[#B9B0B3]">
                                            Estimated Resume Match
                                        </p>

                                        <p className="mt-2 text-3xl font-bold text-white">
                                            {analysis.matchPercentage}%
                                        </p>
                                    </div>

                                    
                                </div>

                                <div className="mt-5 h-2 overflow-hidden rounded-full bg-[#321619]">
                                    <div
                                        className="h-full rounded-full bg-[#E52B35] transition-all duration-500"
                                        style={{
                                            width: `${Math.min(
                                                100,
                                                Math.max(
                                                    0,
                                                    Number(analysis.matchPercentage) || 0
                                                )
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

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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

                                <div className="rounded-xl border border-amber-900/60 bg-[#171209] p-5">
                                    <h3 className="font-semibold text-amber-400">
                                        Partially Matched
                                    </h3>

                                    <p className="mt-1 text-xs text-[#8F8589]">
                                        More evidence or practice may be needed
                                    </p>

                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {(analysis.partiallyMatchedSkills || []).length > 0 ? (
                                            analysis.partiallyMatchedSkills.map(
                                                (skill, index) => (
                                                    <span
                                                        key={index}
                                                        className="rounded-full border border-amber-900 bg-amber-950/40 px-3 py-1.5 text-xs text-amber-300"
                                                    >
                                                        {skill}
                                                    </span>
                                                )
                                            )
                                        ) : (
                                            <p className="text-sm text-[#8F8589]">
                                                No partially matched skills.
                                            </p>
                                        )}
                                    </div>
                                </div>

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