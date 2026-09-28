const DashboardHeader = ({ user, onLogout }) => {
    return (
        <header className="flex items-center justify-between mb-10">

            {/* Logo */}
            <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-xl bg-[#E52B35] flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                        P
                    </span>
                </div>

                <div>
                    <h1 className="text-lg font-semibold tracking-tight text-white">
                        PrepAI
                    </h1>

                    <p className="text-[11px] text-[#756D71]">
                        AI Interview Coach
                    </p>
                </div>

            </div>


            {/* User Section */}
            <div className="flex items-center gap-2">

                {/* Desktop Profile */}
                <div
                    className="
                        hidden sm:flex
                        items-center
                        gap-3
                        h-11
                        px-3
                        rounded-xl
                        bg-[#11090A]
                        border border-[#321619]
                        hover:border-[#4A1D22]
                        transition-colors
                        duration-150
                    "
                >

                    {/* Avatar */}
                    <div
                        className="
                            w-8 h-8
                            rounded-lg
                            bg-[#2A0D10]
                            border border-[#5A1D24]
                            flex items-center justify-center
                        "
                    >
                        <span className="text-xs font-bold text-[#E52B35]">
                            {user?.user?.username
                                ?.charAt(0)
                                ?.toUpperCase()}
                        </span>
                    </div>


                    {/* User Info */}
                    <div className="leading-tight">

                        <p className="text-sm text-white font-medium">
                            {user?.user?.username}
                        </p>

                        <div className="flex items-center gap-1.5 mt-0.5">

                            <span className="w-1.5 h-1.5 rounded-full bg-[#E52B35]" />

                            <p className="text-[10px] text-[#756D71]">
                                Candidate
                            </p>

                        </div>

                    </div>

                </div>


                {/* Logout */}
                <button
                    onClick={onLogout}
                    aria-label="Logout"
                    className="
                        w-11 h-11
                        rounded-xl
                        bg-[#11090A]
                        border border-[#321619]
                        flex items-center justify-center
                        text-[#8F878B]
                        transition-colors
                        duration-150
                        hover:bg-[#1A0C0E]
                        hover:border-[#64232A]
                        hover:text-[#E52B35]
                    "
                >
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <path d="M16 17l5-5-5-5" />
                        <path d="M21 12H9" />
                    </svg>
                </button>


                {/* Mobile Avatar */}
                <div
                    className="
                        sm:hidden
                        w-10 h-10
                        rounded-xl
                        bg-[#2A0D10]
                        border border-[#4A1D22]
                        flex items-center justify-center
                    "
                >
                    <span className="text-xs font-bold text-[#E52B35]">
                        {user?.user?.username
                            ?.charAt(0)
                            ?.toUpperCase()}
                    </span>
                </div>

            </div>

        </header>
    );
};

export default DashboardHeader;