import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSessions } from "../services/session.api";

const STATUS_STYLES = {
    completed: "bg-green-950 text-green-400 border-green-900",
    in_progress: "bg-yellow-950 text-yellow-400 border-yellow-900",
    not_started: "bg-[#1A1A1A] text-[#8F878B] border-[#321619]",
};

const formatStatus = (status) =>
    status.replace("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());

const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

const SessionHistory = () => {
    const navigate = useNavigate();

    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        getSessions()
            .then((data) => setSessions(data.sessions))
            .catch(() => setError("Failed to load interviews"))
            .finally(() => setLoading(false));
    }, []);

    const openSession = (session) => {
        if (session.status === "completed") {
            navigate(`/interview/${session._id}/summary`);
            return;
        }

        navigate(`/interview/${session._id}`);
    };

    return (
        <main className="min-h-screen bg-[#080808] text-white px-4 py-10 sm:px-6 lg:px-10">
            <div className="max-w-3xl mx-auto">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                    <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-[#E52B35] mb-2">
                            Your progress
                        </p>
                        <h1 className="text-2xl sm:text-3xl font-semibold">
                            Past interviews
                        </h1>
                    </div>

                    <button
                        type="button"
                        onClick={() => navigate("/mock-interview")}
                        className="px-4 py-2.5 rounded-xl bg-[#E52B35] text-white text-sm font-medium hover:bg-[#c9242d] transition-colors"
                    >
                        Start new interview
                    </button>
                </div>

                {loading && (
                    <p className="text-sm text-[#756D71]">Loading interviews...</p>
                )}

                {!loading && error && (
                    <p className="text-sm text-[#E52B35]">{error}</p>
                )}

                {!loading && !error && sessions.length === 0 && (
                    <section className="bg-[#13090A] border border-[#321619] rounded-2xl p-6">
                        <h2 className="text-lg font-semibold">No interviews yet</h2>
                        <p className="text-sm text-[#756D71] mt-2 mb-5">
                            Start a mock interview to see your results and progress here.
                        </p>
                        <button
                            type="button"
                            onClick={() => navigate("/mock-interview")}
                            className="px-4 py-2.5 rounded-xl bg-[#E52B35] text-white text-sm font-medium hover:bg-[#c9242d] transition-colors"
                        >
                            Start an interview
                        </button>
                    </section>
                )}

                {!loading && !error && sessions.length > 0 && (
                    <div className="space-y-3">
                        {sessions.map((session) => (
                            <button
                                key={session._id}
                                type="button"
                                onClick={() => openSession(session)}
                                className="w-full text-left bg-[#13090A] border border-[#321619] rounded-2xl p-5 hover:border-[#E52B35] transition-colors"
                            >
                                <div className="flex flex-wrap items-start justify-between gap-3">
                                    <div>
                                        <h2 className="font-semibold uppercase">
                                            {session.topic}
                                        </h2>
                                        <p className="text-xs text-[#756D71] mt-1">
                                            {formatDate(session.createdAt)}
                                        </p>
                                    </div>

                                    <span
                                        className={`text-xs px-2.5 py-1 rounded-full border ${
                                            STATUS_STYLES[session.status] ||
                                            STATUS_STYLES.not_started
                                        }`}
                                    >
                                        {formatStatus(session.status)}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between gap-4 mt-5 text-sm">
                                    <span className="text-[#8F878B]">
                                        {session.answered}/{session.totalQuestions} answered
                                    </span>
                                    <span className="text-white font-medium">
                                        Average: {session.avgScore == null
                                            ? "—"
                                            : `${session.avgScore}/10`}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>
                )}

                <button
                    type="button"
                    onClick={() => navigate("/dashboard")}
                    className="mt-8 text-sm text-[#756D71] hover:text-white transition-colors"
                >
                    ← Back to dashboard
                </button>
            </div>
        </main>
    );
};

export default SessionHistory;