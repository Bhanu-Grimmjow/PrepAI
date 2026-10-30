import { useNavigate } from "react-router-dom";
import { useState } from "react";
import FeatureCard from "./FeatureCard";

const FeatureGrid = () => {
    const navigate = useNavigate();
    const [showResumeMessage, setShowResumeMessage] = useState(false);

    return (
        <>
      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            <FeatureCard
                label="Practice"
                title="Interview"
                description="Practice real interview questions with AI-powered feedback on your answers."
                footer="Voice enabled"
                onClick={() => navigate("/mock-interview")}
                icon={
                    <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <rect
                            x="3"
                            y="5"
                            width="18"
                            height="14"
                            rx="2"
                        />
                        <path d="M8 10h.01" />
                        <path d="M12 10h.01" />
                        <path d="M16 10h.01" />
                        <path d="M8 14h8" />
                    </svg>
                }
            />


            

            {/* Skill Gap */}
            <FeatureCard
                label="Improve"
                title="Skill Gap"
                description="Compare your skills with a job description and discover what you need to learn."
                footer="Skill analysis"
                onClick={() => navigate("/skill-gap")}
                icon={
                    <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="12" cy="12" r="9" />
                        <path d="M8 12h8" />
                        <path d="M12 8v8" />
                    </svg>
                }
            />
{/* Resume Score */}
            <FeatureCard
                label="Analyze"
                title="Resume Score"
                description="We're working on this tool and plan to bring it to you soon."
               footer="Coming soon"
muted
onClick={() => setShowResumeMessage(true)}
                icon={
                    <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <path d="M14 2v6h6" />
                        <path d="M8 13h8" />
                        <path d="M8 17h5" />
                    </svg>
                }
            />

        </section>
        {showResumeMessage && (
    <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
        onClick={() => setShowResumeMessage(false)}
    >
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="resume-coming-soon-title"
            className="w-full max-w-md rounded-2xl border border-[#321619] bg-[#13090A] p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
        >
            <h2
                id="resume-coming-soon-title"
                className="text-xl font-semibold text-white"
            >
                Resume Score is coming soon
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#B9B0B3]">
                Sorry, this tool isn’t available yet. We’re working on it and
                hope to bring it to you soon.
            </p>

            <button
                type="button"
                onClick={() => setShowResumeMessage(false)}
                className="mt-6 rounded-lg bg-[#E52B35] px-4 py-2 text-sm font-medium text-white hover:bg-[#C9202A]"
            >
                Got it
            </button>
        </div>
    </div>
)}
        </>
    );
};

export default FeatureGrid;