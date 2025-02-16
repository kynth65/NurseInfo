import React from "react";

const Loading = ({ size = "default" }) => {
    const sizeClasses = {
        small: "w-8 h-8 border-4",
        default: "w-16 h-16 border-8",
        large: "w-24 h-24 border-8",
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-neutral-100 bg-opacity-80">
            <div className="flex flex-col items-center gap-4">
                <div
                    className={`${sizeClasses[size]} border-t-violet-600 border-violet-200 rounded-full animate-spin`}
                />
                <span className="text-lg font-medium text-violet-600 animate-pulse">
                    Loading...
                </span>
            </div>
        </div>
    );
};

export default Loading;
