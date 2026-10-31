import { Link, useLocation } from "react-router-dom";

const features = [
    "Practice interviews by voice or text",
    "Review feedback on your answers",
    "Revisit saved interview results",
    "Compare a resume with a job description",
];

const scores = [
    ["Clarity", "8"],
    ["Relevance", "9"],
    ["Accuracy", "7"],
    ["Confidence", "8"],
];

const AuthLayout = ({ children, heading, subtitle }) => {
    const { pathname } = useLocation();
    const isRegisterPage = pathname === "/register";

    return (
        <main className="min-h-screen w-full scroll-smooth bg-[#080808] text-white lg:grid lg:grid-cols-[0.9fr_1.1fr] lg:grid-rows-[auto_1fr]">
            <header className="order-0 flex items-center justify-between border-b border-[#321619] bg-[#080808] px-4 py-3 sm:px-8 lg:col-span-2 lg:px-12">
                <Link to="/login" className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E52B35] font-bold text-white">
                        P
                    </span>
                    <span>
                        <span className="block text-sm font-semibold">PrepAI</span>
                        <span className="block text-[11px] text-[#8F8A94]">
                            AI Interview Coach
                        </span>
                    </span>
                </Link>

                <Link
                    to={isRegisterPage ? "/login" : "/register"}
                    className="rounded-lg border border-[#321619] bg-[#13090A] px-3 py-2 text-xs font-medium text-[#D1CDD0] transition-colors hover:border-[#6B2930] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E52B35] sm:px-4 sm:text-sm"
                >
                    {isRegisterPage ? "Log in" : "Create account"}
                </Link>
            </header>

            <section
                id="auth-form"
                className="order-2 flex min-h-[80vh] scroll-mt-4 items-center justify-center px-4 py-8 sm:px-8 lg:order-1 lg:min-h-[calc(100vh-65px)] lg:px-10"
            >
                <div className="w-full max-w-[420px]">{children}</div>
            </section>

            <aside className="order-1 border-b border-[#321619] bg-gradient-to-br from-[#13090A] to-[#080808] px-5 py-8 sm:px-8 lg:order-2 lg:flex lg:min-h-[calc(100vh-65px)] lg:items-center lg:border-b-0 lg:border-l lg:px-10 xl:px-16">
                <div className="mx-auto w-full max-w-xl">
                    <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-[#E52B35]">
                        Practice with purpose
                    </p>

                    <h1 className="max-w-lg text-2xl font-semibold leading-tight tracking-tight sm:text-3xl xl:text-4xl">
                        {heading}
                    </h1>

                    <p className="mt-3 max-w-lg text-sm leading-6 text-[#B9B0B3]">
                        {subtitle}
                    </p>

                    <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {features.map((feature) => (
                            <li
                                key={feature}
                                className="flex items-center gap-3 rounded-xl border border-[#321619] bg-[#13090A]/80 p-4 text-sm text-[#D1CDD0]"
                            >
                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#5A2026] bg-[#2A1114] text-xs text-[#E52B35]">
                                    ✓
                                </span>
                                {feature}
                            </li>
                        ))}
                    </ul>

                    <div className="mt-4 rounded-xl border border-[#321619] bg-[#10090A] p-4">
                        <div className="mb-3 flex items-center justify-between gap-2">
                            <p className="text-xs font-medium text-[#D1CDD0]">
                                Example feedback
                            </p>
                            <span className="rounded-full bg-[#2A1114] px-2 py-1 text-[10px] text-[#B9B0B3]">
                                Example only
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                            {scores.map(([label, score]) => (
                                <div
                                    key={label}
                                    className="rounded-lg bg-[#0B0708] py-2 text-center"
                                >
                                    <p className="text-[9px] uppercase tracking-wide text-[#8F8A94]">
                                        {label}
                                    </p>
                                    <p className="mt-1 text-sm font-semibold">
                                        {score}
                                        <span className="text-[10px] text-[#8F8A94]">
                                            /10
                                        </span>
                                    </p>
                                </div>
                            ))}
                        </div>

                        <p className="mt-3 text-[11px] leading-5 text-[#8F8A94]">
                            AI feedback is an estimate. Use it as guidance.
                        </p>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                        <a
                            href="https://github.com/Bhanu-Grimmjow/PrepAI"
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-[#B9B0B3] underline decoration-[#5A2026] underline-offset-4 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E52B35]"
                        >
                            View source on GitHub
                        </a>

                        <a
                            href="#auth-form"
                            className="inline-flex items-center justify-center rounded-xl bg-[#E52B35] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#C9202A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E52B35] lg:hidden"
                        >
                            Go to {isRegisterPage ? "sign up" : "login"}
                            <span className="ml-2" aria-hidden="true">↓</span>
                        </a>
                    </div>
                </div>
            </aside>
        </main>
    );
};

export default AuthLayout;