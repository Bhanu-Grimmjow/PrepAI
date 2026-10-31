import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import AuthLayout from "../components/AuthLayout";

const Login = () => {
    const { loading, handleLogin } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
const [showPassword, setShowPassword] = useState(false);
    const handleSubmit = async (event) => {
        event.preventDefault();
        await handleLogin({ email, password });
        navigate("/dashboard");
    };

    const layoutProps = {
        heading: "Welcome back. Keep practicing.",
        subtitle:
            "Pick up where you left off, review your past interviews, and work on the skills your last results pointed to.",
    };

    if (loading) {
        return (
            <AuthLayout {...layoutProps}>
                <div
                    role="status"
                    className="rounded-2xl border border-[#321619] bg-[#13090A] p-8 text-center"
                >
                    <div className="flex items-center justify-center gap-1.5">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-[#E52B35]" />
                        <span className="h-2 w-2 animate-pulse rounded-full bg-[#E52B35] [animation-delay:150ms]" />
                        <span className="h-2 w-2 animate-pulse rounded-full bg-[#E52B35] [animation-delay:300ms]" />
                    </div>
                    <p className="mt-4 text-sm text-[#B9B0B3]">Loading...</p>
                </div>
            </AuthLayout>
        );
    }

    return (
        <AuthLayout {...layoutProps}>
            <div className="w-full rounded-2xl border border-[#321619] bg-[#13090A] px-6 py-6 sm:px-7">
                <div className="mb-5 text-center">
                    <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#E52B35]">
                        <span className="text-lg font-bold">P</span>
                    </div>
                    <h2 className="text-2xl font-bold sm:text-3xl">Welcome Back</h2>
                    <p className="mt-1 text-sm text-[#8F8A94]">
                        Login to your account
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="login-email"
                            className="mb-1.5 block text-sm font-medium"
                        >
                            Email
                        </label>
                        <input
                            id="login-email"
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="Enter your email"
                            className="h-11 w-full rounded-lg border border-[#321619] bg-[#0B0B0B] px-4 text-white placeholder-[#5F5963] outline-none transition-colors hover:border-[#4A1D22] focus:border-[#E52B35] focus-visible:ring-2 focus-visible:ring-[#E52B35]"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="login-password"
                            className="mb-1.5 block text-sm font-medium"
                        >
                            Password
                        </label>
                        <div className="relative">
    <input
        id="login-password"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Enter your password"
        className="h-11 w-full rounded-lg border border-[#321619] bg-[#0B0B0B] px-4 pr-12 text-white placeholder-[#5F5963] outline-none transition-colors hover:border-[#4A1D22] focus:border-[#E52B35] focus-visible:ring-2 focus-visible:ring-[#E52B35]"
    />
    <button
        type="button"
        onClick={() => setShowPassword((visible) => !visible)}
        aria-label={showPassword ? "Hide password" : "Show password"}
        aria-pressed={showPassword}
        className="absolute inset-y-0 right-0 flex items-center px-4 text-[#8F8A94] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E52B35]"
    >
        {showPassword ? (
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M3 3l18 18" />
                <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                <path d="M9.9 5.2A10.8 10.8 0 0 1 12 5c5 0 8.5 4.5 9.5 7-.4 1-1.2 2.1-2.2 3.1" />
                <path d="M6.2 6.2C3.9 7.6 2.4 9.7 2 12c.5 1.3 1.7 3.1 3.8 4.5A10.3 10.3 0 0 0 12 19c1 0 2-.2 2.9-.5" />
            </svg>
        ) : (
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
                <circle cx="12" cy="12" r="3" />
            </svg>
        )}
    </button>
</div>
                    </div>

                    <button
                        type="submit"
                        className="h-11 w-full rounded-lg bg-[#E52B35] font-semibold text-white transition-colors hover:bg-[#F13A44] active:bg-[#D9232D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E52B35]"
                    >
                        Login
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-[#8F8A94]">
                    Don&apos;t have an account?{" "}
                    <Link
                        to="/register"
                        className="font-semibold text-[#E52B35] hover:text-[#FF5A62] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E52B35]"
                    >
                        Sign Up
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
};

export default Login;