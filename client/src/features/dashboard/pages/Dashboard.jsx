import { useAuth } from "../../auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";

import DashboardHeader from "../components/DashboardHeader";
import FeatureGrid from "../components/FeatureGrid";

const Dashboard = () => {
    const { user, handleLogout } = useAuth();
    const navigate = useNavigate();

    const onLogout = async () => {
        await handleLogout();
        navigate("/login");
    };

    return (
        <main className="min-h-screen w-full bg-[#080808] text-white px-4 py-5 sm:px-6 lg:px-10 xl:px-12">

            <div className="w-full">

                {/* Header */}
                <DashboardHeader
                    user={user}
                    onLogout={onLogout}
                />


                {/* Welcome */}
                <section className="mb-10">

                    <p className="text-xs uppercase tracking-[0.18em] text-[#E52B35] mb-2">
                        Dashboard
                    </p>

                    <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                        Welcome back,{" "}
                        <span className="text-[#E52B35]">
                            {user?.user?.username}
                        </span>
                    </h2>

                    <p className="text-sm text-[#756D71] mt-2 max-w-xl">
                        Choose a tool to prepare, analyze, and improve your
                        interview performance.
                    </p>

                </section>


                {/* Feature Heading */}
                <section className="mb-5">

                    <div className="flex items-end justify-between">

                        <div>

                            <h3 className="text-lg font-semibold">
                                What are you working on?
                            </h3>

                            <p className="text-xs text-[#756D71] mt-1">
                                Select a tool to get started
                            </p>

                        </div>


                        <div className="hidden sm:flex items-center gap-2">

                            <span className="w-1.5 h-1.5 rounded-full bg-[#E52B35]" />

                            <span className="text-[10px] text-[#756D71]">
                                3 tools available
                            </span>

                        </div>

                    </div>

                </section>


                {/* Feature Cards */}
                <FeatureGrid />


                {/* Footer */}
                <div className="flex justify-center mt-10">

                    <p className="text-[10px] text-[#4F494C]">
                        PrepAI • AI-powered interview preparation
                    </p>

                </div>

            </div>

        </main>
    );
};

export default Dashboard;