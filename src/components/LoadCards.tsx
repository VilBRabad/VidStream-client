import Skeleton from 'react-loading-skeleton'

function LoadCards() {
    return (
        <>
            <h1 className="pl-6 md:pl-12 text-lg mt-16 font-semibold"><Skeleton count={1} height={30} width={200}/></h1>
            <div className={`pop-cards relative z-50 mt-4 flex gap-2 lg:gap-4 h-[17.1rem] xl:h-[24rem] w-screen pl-6 lg:pl-12`}>
                {[...Array(6)].map((_, ind) => (
                    <div key={ind} className="movie-card">
                        <Skeleton height={390}/>
                    </div>
                ))}
            </div>
        </>
    )
}

export default LoadCards