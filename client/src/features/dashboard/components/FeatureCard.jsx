const FeatureCard = ({
    label,
    title,
    description,
    footer,
    icon,
    onClick,
}) => {
    return (
        <button
            onClick={onClick}
            className="
                group
                relative
                overflow-hidden
                text-left
                min-h-[330px]
                rounded-2xl
                bg-[#13090A]
                border border-[#321619]
                p-6

                transition-[border-color,box-shadow,transform]
                duration-200

                hover:border-[#E52B35]
                hover:shadow-[0_0_30px_rgba(229,43,53,0.20)]
                hover:-translate-y-1

                focus:outline-none
                focus-visible:border-[#E52B35]
            "
        >

            {/* Top */}
            <div className="flex items-start justify-between">

                {/* Icon */}
                <div
                    className="
                        w-12 h-12
                        rounded-xl
                        bg-[#2A0D10]
                        border border-[#4A1D22]
                        flex items-center justify-center
                        text-[#E52B35]

                        transition-colors
                        duration-150

                        group-hover:bg-[#E52B35]
                        group-hover:text-white
                    "
                >
                    {icon}
                </div>


                {/* Arrow */}
                <div
                    className="
                        w-9 h-9
                        rounded-full
                        border border-[#321619]
                        flex items-center justify-center
                        text-[#756D71]

                        transition-colors
                        duration-150

                        group-hover:border-[#E52B35]
                        group-hover:text-[#E52B35]
                    "
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M5 12h14" />
                        <path d="m13 6 6 6-6 6" />
                    </svg>
                </div>

            </div>


            {/* Content */}
            <div className="mt-10">

                <p className="text-[10px] uppercase tracking-[0.18em] text-[#E52B35]">
                    {label}
                </p>

                <h3 className="text-2xl font-semibold text-white mt-2">
                    {title}
                </h3>

                <p className="text-sm text-[#8F878B] mt-3 leading-6">
                    {description}
                </p>

            </div>


            {/* Footer */}
            <div className="absolute bottom-6 left-6 right-6">

                <div className="flex items-center justify-between">

                    <span className="text-xs text-[#756D71]">
                        {footer}
                    </span>

                    <span
                        className="
                            text-xs
                            text-[#8F878B]
                            transition-colors
                            duration-150
                            group-hover:text-[#E52B35]
                        "
                    >
                        Open →
                    </span>

                </div>

            </div>

        </button>
    );
};

export default FeatureCard;