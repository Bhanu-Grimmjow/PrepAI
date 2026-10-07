import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTopics, createSession } from "../services/session.api";

const CATEGORY_META = {
    frontend: { label: "Frontend",     color: "#3B82F6" },
    backend:  { label: "Backend",      color: "#10B981" },
    core:     { label: "Core Subject", color: "#F59E0B" },
    dsa:      { label: "DSA",          color: "#E52B35" },
};

const StartInterview = () => {
    const navigate = useNavigate();
    const [categories, setCategories]     = useState({});
    const [selected, setSelected]         = useState(null);   // selected category
    const [loading, setLoading]           = useState(true);
    const [creating, setCreating]         = useState(false);
    const [error, setError]               = useState("");

    useEffect(() => {
        getTopics()
            .then((data) => setCategories(data.categories))
            .catch(() => setError("Failed to load topics"))
            .finally(() => setLoading(false));
    }, []);

    const handleCategoryClick = async (category) => {
        // DSA skips Screen 2 — create session immediately
        if (category === "dsa") {
            setCreating(true);
            try {
                const data = await createSession("dsa");
                navigate(`/interview/${data.sessionId}`);
            } catch {
                setError("Failed to create session");
                setCreating(false);
            }
            return;
        }
        setSelected(category);
    };

    const handleTopicClick = async (topic) => {
        setCreating(true);
        try {
            const data = await createSession(topic);
            navigate(`/interview/${data.sessionId}`);
        } catch {
            setError("Failed to create session");
            setCreating(false);
        }
    };

    if (loading) return (
        <main className="min-h-screen bg-[#080808] text-white flex items-center justify-center">
            <p className="text-[#756D71]">Loading...</p>
        </main>
    );

    return (
        <main className="min-h-screen bg-[#080808] text-white px-4 py-10 sm:px-6 lg:px-10">

            <div className="max-w-3xl mx-auto">

                {/* Back button */}
                <button
                    onClick={() => selected ? setSelected(null) : navigate("/dashboard")}
                    className="text-xs text-[#756D71] hover:text-white mb-8 flex items-center gap-2 transition-colors"
                >
                    ← {selected ? "Back to categories" : "Back to dashboard"}
                </button>

                {error && (
                    <p className="text-[#E52B35] text-sm mb-6">{error}</p>
                )}

                {/* Screen 1 — categories */}
                {!selected && (
                    <>
                        <p className="text-xs uppercase tracking-[0.18em] text-[#E52B35] mb-2">
                            Mock Interview
                        </p>
                        <h2 className="text-2xl font-semibold mb-1">Pick a category</h2>
                        <p className="text-sm text-[#756D71] mb-8">
                            Choose what you want to be interviewed on
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                            {Object.keys(categories).map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => handleCategoryClick(cat)}
                                    disabled={creating}
                                    className="
                                        text-left p-6 rounded-2xl
                                        bg-[#13090A] border border-[#321619]
                                        hover:border-[#E52B35] hover:shadow-[0_0_20px_rgba(229,43,53,0.15)]
                                        hover:-translate-y-0.5
                                        transition-all duration-200
                                        disabled:opacity-50
                                    "
                                >
                                    <p className="text-base font-semibold">
                                        {CATEGORY_META[cat]?.label || cat}
                                    </p>
                                    <p className="text-xs text-[#756D71] mt-1">
                                        {categories[cat].join(", ")}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </>
                )}

                {/* Screen 2 — topics */}
                {selected && (
                    <>
                        <p className="text-xs uppercase tracking-[0.18em] text-[#E52B35] mb-2">
                            {CATEGORY_META[selected]?.label}
                        </p>
                        <h2 className="text-2xl font-semibold mb-1">Pick a topic</h2>
                        <p className="text-sm text-[#756D71] mb-8">
                            5 random questions will be pulled for your session
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                            {categories[selected].map((topic) => (
                                <button
                                    key={topic}
                                    onClick={() => handleTopicClick(topic)}
                                    disabled={creating}
                                    className="
                                        text-left p-6 rounded-2xl
                                        bg-[#13090A] border border-[#321619]
                                        hover:border-[#E52B35] hover:shadow-[0_0_20px_rgba(229,43,53,0.15)]
                                        hover:-translate-y-0.5
                                        transition-all duration-200
                                        disabled:opacity-50
                                    "
                                >
                                    <p className="text-base font-semibold uppercase tracking-wide">
                                        {topic}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </>
                )}

                {creating && (
                    <p className="text-center text-[#756D71] text-sm mt-8">
                        Creating session...
                    </p>
                )}

            </div>

        </main>
    );
};

export default StartInterview;
