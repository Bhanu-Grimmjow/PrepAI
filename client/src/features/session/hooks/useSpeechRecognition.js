import { useState, useRef, useEffect, useCallback } from "react";

const SpeechRecognitionAPI =
    typeof window !== "undefined"
        ? window.SpeechRecognition || window.webkitSpeechRecognition
        : null;

export default function useSpeechRecognition() {
    const isSupported = Boolean(SpeechRecognitionAPI);

    const [isListening, setIsListening] = useState(false);
    const [text, setText]               = useState("");
    const [error, setError]             = useState("");

    const recognitionRef = useRef(null);
    const finalRef       = useRef("");
    const baseRef        = useRef("");

    const startListening = useCallback((base = "") => {
        if (!SpeechRecognitionAPI) return;

        baseRef.current  = base.trim() ? base.trim() + " " : "";
        finalRef.current = "";
        setText(baseRef.current);
        setError("");

        const recognition = new SpeechRecognitionAPI();
        recognition.lang           = "en-IN";
        recognition.continuous     = true;
        recognition.interimResults = true;

        recognition.onresult = (e) => {
            let interim = "";
            for (let i = e.resultIndex; i < e.results.length; i++) {
                const result = e.results[i];
                if (result.isFinal) finalRef.current += result[0].transcript + " ";
                else interim += result[0].transcript;
            }
            setText(baseRef.current + finalRef.current + interim);
        };

        recognition.onerror = (e) => {
            setError(e.error);
            setIsListening(false);
        };

        // let onend flip isListening so last words aren't lost
        recognition.onend = () => setIsListening(false);

        recognition.start();
        recognitionRef.current = recognition;
        setIsListening(true);
    }, []);

    const stopListening = useCallback(() => {
        recognitionRef.current?.stop();
        // don't setIsListening(false) here — onend will do it after last result
    }, []);

    const resetText = useCallback(() => {
        finalRef.current = "";
        baseRef.current  = "";
        setText("");
    }, []);

    useEffect(() => {
        return () => recognitionRef.current?.abort();
    }, []);

    return { isSupported, isListening, text, error, startListening, stopListening, resetText };
}
