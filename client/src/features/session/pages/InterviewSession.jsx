import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSessionById, submitAnswer } from "../services/session.api";
import useSpeechRecognition from "../hooks/useSpeechRecognition";

const InterviewSession = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [questions, setQuestions]   = useState([]);
    const [current, setCurrent]       = useState(0);
    const [transcript, setTranscript] = useState("");
    const [feedback, setFeedback]     = useState(null);
    const [loading, setLoading]       = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError]           = useState("");

   const { isListening, text, startListening, stopListening, resetText, isSupported, error: micError } =
    useSpeechRecognition();


    // sync spoken text into transcript while listening
    useEffect(() => {
        if (isListening) setTranscript(text);
    }, [text, isListening]);

    // stop mic when user leaves the page
    useEffect(() => {
        return () => stopListening();
    }, []);

    useEffect(() => {
        getSessionById(id)
            .then((data) => setQuestions(data.session.questions))
            .catch(() => setError("Failed to load session"))
            .finally(() => setLoading(false));
    }, [id]);

    const handleSubmit = async () => {
        if (!transcript.trim()) return;
        stopListening();
        setSubmitting(true);
        try {
            const data = await submitAnswer(id, {
                question:   questions[current].text,
                transcript: transcript.trim(),
            });
            setFeedback(data.answer);
        } catch {
            setError("Failed to submit answer");
        } finally {
            setSubmitting(false);
        }
    };

    const handleNext = () => {
        resetText();
        if (current + 1 >= questions.length) {
            navigate("/dashboard");
            return;
        }
        setCurrent((c) => c + 1);
        setTranscript("");
        setFeedback(null);
    };

    if (loading) return (
        <main className="min-h-screen bg-[#080808] text-white flex items-center justify-center">
            <p className="text-[#756D71]">Loading session...</p>
        </main>
    );

    if (error) return (
        <main className="min-h-screen bg-[#080808] text-white flex items-center justify-center">
            <p className="text-[#E52B35]">{error}</p>
        </main>
    );

    const question = questions[current];

    return (
        <main className="min-h-screen bg-[#080808] text-white px-4 py-10 sm:px-6 lg:px-10">
            <div className="max-w-2xl mx-auto">

                {/* Progress */}
                <div className="flex items-center justify-between mb-8">
                    <p className="text-xs uppercase tracking-[0.18em] text-[#E52B35]">
                        Mock Interview
                    </p>
                    <p className="text-xs text-[#756D71]">
                        Question {current + 1} of {questions.length}
                    </p>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1 bg-[#1A1A1A] rounded-full mb-8">
                    <div
                        className="h-1 bg-[#E52B35] rounded-full transition-all duration-300"
                        style={{ width: `${((current + 1) / questions.length) * 100}%` }}
                    />
                </div>

                {/* Question */}
                <div className="bg-[#13090A] border border-[#321619] rounded-2xl p-6 mb-6">
                    <p className="text-sm text-[#756D71] mb-2">Question</p>
                    <p className="text-base font-medium leading-7">{question.text}</p>
                </div>

                {/* Answer area */}
                {!feedback && (
                    <>
                        {!isSupported && (
                            <p className="text-xs text-[#756D71] mb-3">
                                Voice input is not supported in this browser. Type your answer below.
                            </p>
                        )}

                        {micError && (
                            <p className="text-xs text-[#E52B35] mb-3">
                                {micError === "not-allowed"
                                    ? "Microphone access was blocked. Allow mic permission and refresh."
                                    : `Mic error: ${micError}`}
                            </p>
                        )}

                        {isSupported && (
                            <button
                                onClick={isListening ? stopListening : () => startListening(transcript)}
                                className={`
                                    mb-3 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors
                                    ${isListening
                                        ? "bg-[#E52B35] text-white hover:bg-[#c9242d]"
                                        : "bg-[#1A1A1A] text-[#756D71] hover:bg-[#221214] hover:text-white"
                                    }
                                `}
                            >
                                <span>{isListening ? "⏹ Stop Recording" : "🎙 Start Recording"}</span>
                                {isListening && (
                                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                                )}
                            </button>
                        )}

                        {isListening && (
                            <p className="text-xs text-[#756D71] mb-2">Listening... speak now</p>
                        )}

                        <textarea
                            value={transcript}
                            onChange={(e) => setTranscript(e.target.value)}
                            placeholder="Click 'Start Recording' to speak, or type your answer here..."
                            rows={6}
                            className="
                                w-full bg-[#13090A] border border-[#321619] rounded-2xl
                                p-4 text-sm text-white placeholder-[#4F494C]
                                focus:outline-none focus:border-[#E52B35]
                                resize-none transition-colors
                            "
                        />

                        <button
                            onClick={handleSubmit}
                            disabled={submitting || !transcript.trim()}
                            className="
                                mt-4 w-full py-3 rounded-xl
                                bg-[#E52B35] text-white text-sm font-medium
                                hover:bg-[#c9242d] transition-colors
                                disabled:opacity-50 disabled:cursor-not-allowed
                            "
                        >
                            {submitting ? "Submitting..." : "Submit Answer"}
                        </button>
                    </>
                )}

                {/* Feedback card */}
                {feedback && (
                    <div className="bg-[#13090A] border border-[#321619] rounded-2xl p-6 space-y-5">

                        <p className="text-sm text-[#756D71]">Feedback</p>

                        <div className="grid grid-cols-2 gap-3">
                            {Object.entries(feedback.scores).map(([key, val]) => (
                                <div key={key} className="bg-[#0D0608] rounded-xl p-3">
                                    <p className="text-[10px] uppercase tracking-widest text-[#756D71]">
                                        {key.replace(/([A-Z])/g, " $1")}
                                    </p>
                                    <p className="text-xl font-semibold text-white mt-1">
                                        {val}<span className="text-xs text-[#756D71]">/10</span>
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center justify-between border-t border-[#321619] pt-4">
                            <p className="text-sm text-[#756D71]">Overall Score</p>
                            <p className="text-2xl font-bold text-[#E52B35]">
                                {feedback.overallScore}<span className="text-sm text-[#756D71]">/10</span>
                            </p>
                        </div>

                        <div>
                            <p className="text-xs uppercase tracking-widest text-[#756D71] mb-2">Strengths</p>
                            {feedback.strengths.map((s, i) => (
                                <p key={i} className="text-sm text-white flex gap-2">
                                    <span className="text-green-500">✓</span> {s}
                                </p>
                            ))}
                        </div>

                        <div>
                            <p className="text-xs uppercase tracking-widest text-[#756D71] mb-2">Weaknesses</p>
                            {feedback.weaknesses.map((w, i) => (
                                <p key={i} className="text-sm text-white flex gap-2">
                                    <span className="text-[#E52B35]">✗</span> {w}
                                </p>
                            ))}
                        </div>

                        <div className="bg-[#0D0608] rounded-xl p-4">
                            <p className="text-xs uppercase tracking-widest text-[#756D71] mb-1">Tip</p>
                            <p className="text-sm text-white">{feedback.suggestion}</p>
                        </div>

                        <button
                            onClick={handleNext}
                            className="
                                w-full py-3 rounded-xl
                                bg-[#E52B35] text-white text-sm font-medium
                                hover:bg-[#c9242d] transition-colors
                            "
                        >
                            {current + 1 >= questions.length ? "Finish Interview" : "Next Question →"}
                        </button>

                    </div>
                )}

            </div>
        </main>
    );
};

export default InterviewSession;

