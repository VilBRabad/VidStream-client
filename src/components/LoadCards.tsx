import React from 'react'

function LoadCards() {
    return (
        <div className={`pop-cards relative z-50 mt-4 flex gap-2 lg:gap-4 h-[17.1rem] xl:h-[24rem] w-screen pl-6 lg:pl-12`}>
            {[...Array(6)].map((_, ind) => (
                <div key={ind} className="movie-card animate-pulse">
                </div>
            ))}
        </div>
    )
}

export default LoadCards