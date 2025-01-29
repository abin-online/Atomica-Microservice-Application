'use client'

import React from "react";

const ProfileSkeleton = () => {
    return (
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg rounded-lg p-6 w-80 h-[912px] animate-pulse">
            {/* Profile Picture Skeleton */}
            <div className="px-12 relative">
                <div className="w-32 h-32 rounded-full bg-gray-300 mb-4 mx-auto"></div>
            </div>

            {/* User Details Skeleton */}
            <div className="text-center w-full">
                <div className="w-3/4 h-6 bg-gray-300 mx-auto rounded-md mb-2"></div>
                <div className="w-1/2 h-4 bg-gray-300 mx-auto rounded-md mb-4"></div>
                <div className="w-full h-4 bg-gray-300 mx-auto rounded-md mb-4"></div>
            </div>

            {/* Social Media Links Skeleton */}
            <div className="flex flex-col space-y-3 mb-6 w-full">
                <div className="w-full h-4 bg-gray-300 rounded-md"></div>
                <div className="w-full h-4 bg-gray-300 rounded-md"></div>
                <div className="w-full h-4 bg-gray-300 rounded-md"></div>
                <div className="w-full h-4 bg-gray-300 rounded-md"></div>
            </div>

            {/* Button Skeleton */}
            <div className="flex justify-center">
                <div className="w-1/2 h-10 bg-gray-300 rounded-md"></div>
            </div>
        </div>
    );
};

export default ProfileSkeleton;
