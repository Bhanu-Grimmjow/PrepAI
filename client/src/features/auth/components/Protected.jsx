import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router-dom'

const Protected = ({ children }) => {
    const { loading, user } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen w-full bg-[#080808] flex items-center justify-center">
                <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#E52B35] animate-pulse" />
                        <span className="w-2 h-2 rounded-full bg-[#E52B35] animate-pulse [animation-delay:150ms]" />
                        <span className="w-2 h-2 rounded-full bg-[#E52B35] animate-pulse [animation-delay:300ms]" />
                    </div>
                    <p className="mt-4 text-sm text-[#8F8A94]">Loading...</p>
                </div>
            </div>
        );
    }

    if (!user) return <Navigate to="/login" />;

    return children;
}

export default Protected;
