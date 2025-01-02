'use client'

import React from 'react'

const Marqueue = () => {
    return (
        <>
            <div className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white ">                
                <div className="overflow-hidden relative">
                <div className="animate-marquee whitespace-nowrap">
                    <span className="mx-10 ">
                        Welcome to Our Space Exploration Platform! 🌌
                    </span>
                    <span className="mx-10">
                        Discover the Universe with Us! 🚀
                    </span>
                    <span className="mx-10">
                        Experience Infinite Possibilities! ✨
                    </span>
                </div>
            </div>
                <style jsx>{`
          .animate-marquee {
            display: inline-block;
            animation: marquee 10s linear infinite;
          }
          @keyframes marquee {
            from {
              transform: translateX(100%);
            }
            to {
              transform: translateX(-100%);
            }
          }
        `}</style>
            </div>
        </>
    )
}

export default Marqueue
