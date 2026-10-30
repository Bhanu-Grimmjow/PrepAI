import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSessionSummary } from "../services/session.api";
import { formatTopic } from "../utils/topicLabels";
const DIMENSIONS = [
    { key: "clarity", label: "Clarity" },
    { key: "relevance", label: "Relevance" },
    { key: "technicalAccuracy", label: "Technical accuracy" },
    { key: "confidence", label: "Confidence" },
];

const SessionSummary = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [openIndex, setOpenIndex] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        getSessionSummary(id)
            .then(setData)
            .catch(() => setError("Failed to load summary"))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <main className="min-h-screen bg-[#080808] text-white flex items-center justify-center">
                <p className="text-[#756D71]">Loading summary...</p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="min-h-screen bg-[#080808] text-white flex flex-col items-center justify-center gap-4">
                <p className="text-[#E52B35]">{error}</p>
                <button
                    type="button"
                    onClick={() => navigate("/dashboard")}
                    className="text-sm text-white underline"
                >
                    Back to dashboard
                </button>
            </main>
        );
    }

    const { session, totalQuestions, answers, stats } = data;
    const isPartial = answers.length < totalQuestions;
    const weakestLabel =
        DIMENSIONS.find(({ key }) => key === stats?.weakest)?.label ||
        stats?.weakest;

    return (
        <main className="min-h-screen bg-[#080808] text-white px-4 py-10 sm:px-6 lg:px-10">
            <div className="max-w-3xl mx-auto">
                <p className="text-xs uppercase tracking-[0.18em] text-[#E52B35] mb-2">
                    Interview {isPartial ? "in progress" : "complete"}
                </p>

                <h1 className="text-2xl sm:text-3xl font-semibold">
                  {formatTopic(session.topic)} Results
                </h1>

                <p className="text-sm text-[#756D71] mt-2">
                    {new Date(session.createdAt).toLocaleDateString()}
                    {" · "}
                    {answers.length} of {totalQuestions} answered
                </p>

                {stats && (
                    <>
                        <section className="bg-[#13090A] border border-[#321619] rounded-2xl p-6 mt-8">
                            <p className="text-sm text-[#756D71]">Overall score</p>
                            <p className="text-4xl font-bold text-[#E52B35] mt-1">
                                {stats.overall}
                                <span className="text-lg text-[#756D71]">/10</span>
                            </p>

                            <div className="grid grid-cols-2 gap-3 mt-6">
                                {DIMENSIONS.map(({ key, label }) => (
                                    <div key={key} className="bg-[#0D0608] rounded-xl p-4">
                                        <p className="text-xs text-[#756D71]">{label}</p>
                                        <p className="text-xl font-semibold mt-1">
                                            {stats.averages[key]}
                                            <span className="text-xs text-[#756D71]">/10</span>
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <p className="text-sm text-[#756D71] mt-5 mb-8">
                            Focus next:{" "}
                            <span className="text-[#E52B35] font-medium">
                                {weakestLabel}
                            </span>
                        </p>
                    </>
                )}

                {!stats && (
                    <p className="text-sm text-[#756D71] mt-8">
                        No answers have been submitted yet.
                    </p>
                )}

                {answers.length > 0 && (
                    <section className="mt-8">
                        <h2 className="text-lg font-semibold mb-4">Question feedback</h2>

                        <div className="space-y-3">
                            {answers.map((answer, index) => {
                                const isOpen = openIndex === index;

                                return (
                                    <article
                                        key={answer._id}
                                        className="bg-[#13090A] border border-[#321619] rounded-2xl overflow-hidden"
                                    >
                                        <button
                                            type="button"
                                            aria-expanded={isOpen}
                                            onClick={() =>
                                                setOpenIndex(isOpen ? null : index)
                                            }
                                            className="w-full text-left p-5 flex items-start justify-between gap-4 hover:bg-[#1A0C0E]"
                                        >
                                            <span>
                                                <span className="block text-xs text-[#756D71] mb-2">
                                                    Question {answer.questionIndex + 1}
                                                </span>
                                                <span className="block font-medium leading-6">
                                                    {answer.question}
                                                </span>
                                            </span>

                                            <span className="shrink-0 text-[#E52B35] font-semibold">
                                                {answer.overallScore}/10
                                                <span className="ml-2 text-[#756D71]">
                                                    {isOpen ? "−" : "+"}
                                                </span>
                                            </span>
                                        </button>

                                        {isOpen && (
                                            <div className="border-t border-[#321619] p-5">
                                                <p className="text-xs uppercase tracking-widest text-[#756D71] mb-2">
                                                    Your answer
                                                </p>
                                                <p className="text-sm text-[#D1CDD0] whitespace-pre-wrap">
                                                    {answer.transcript}
                                                </p>

                                                <div className="grid grid-cols-2 gap-3 mt-5">
                                                    {DIMENSIONS.map(({ key, label }) => (
                                                        <div
                                                            key={key}
                                                            className="bg-[#0D0608] rounded-xl p-3"
                                                        >
                                                            <p className="text-[10px] uppercase text-[#756D71]">
                                                                {label}
                                                            </p>
                                                            <p className="text-lg font-semibold mt-1">
                                                                {answer.scores[key]}/10
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>

                                                {answer.strengths.length > 0 && (
                                                    <div className="mt-5">
                                                        <p className="text-xs uppercase tracking-widest text-[#756D71] mb-2">
                                                            Strengths
                                                        </p>
                                                        {answer.strengths.map((item, itemIndex) => (
                                                            <p
                                                                key={itemIndex}
                                                                className="text-sm text-white"
                                                            >
                                                                <span className="text-green-500 mr-2">✓</span>
                                                                {item}
                                                            </p>
                                                        ))}
                                                    </div>
                                                )}

                                                <div className="mt-5">
                                                    <p className="text-xs uppercase tracking-widest text-[#756D71] mb-2">
                                                        Areas to improve
                                                    </p>
                                                    {answer.weaknesses.map((item, itemIndex) => (
                                                        <p
                                                            key={itemIndex}
                                                            className="text-sm text-white"
                                                        >
                                                            <span className="text-[#E52B35] mr-2">✗</span>
                                                            {item}
                                                        </p>
                                                    ))}
                                                </div>

                                                <div className="bg-[#0D0608] rounded-xl p-4 mt-5">
                                                    <p className="text-xs uppercase tracking-widest text-[#756D71] mb-1">
                                                        Tip
                                                    </p>
                                                    <p className="text-sm text-white">
                                                        {answer.suggestion}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </article>
                                );
                            })}
                        </div>
                    </section>
                )}

                <div className="flex flex-col sm:flex-row gap-3 mt-8">
                    {isPartial && (
                        <button
                            type="button"
                            onClick={() => navigate(`/interview/${id}`)}
                            className="flex-1 py-3 rounded-xl bg-[#E52B35] text-white text-sm font-medium hover:bg-[#c9242d]"
                        >
                            Continue interview
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={() => navigate("/mock-interview")}
                        className="flex-1 py-3 rounded-xl bg-[#E52B35] text-white text-sm font-medium hover:bg-[#c9242d]"
                    >
                        Practice again
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/dashboard")}
                        className="flex-1 py-3 rounded-xl border border-[#321619] text-white text-sm font-medium hover:bg-[#1A0C0E]"
                    >
                        Dashboard
                    </button>
                </div>
            </div>
        </main>
    );
};

export default SessionSummary;