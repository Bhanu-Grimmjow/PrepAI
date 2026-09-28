import { useNavigate } from "react-router-dom";
import FeatureCard from "./FeatureCard";

const FeatureGrid = () => {
    const navigate = useNavigate();

    return (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5">

            {/* Mock Interview */}
            <FeatureCard
                label="Practice"
                title="Mock Interview"
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


            {/* Resume Score */}
            <FeatureCard
                label="Analyze"
                title="Resume Score"
                description="Upload your resume and get an AI-powered ATS score with actionable feedback."
                footer="ATS analysis"
                onClick={() => navigate("/resume-score")}
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

        </section>
    );
};

export default FeatureGrid;