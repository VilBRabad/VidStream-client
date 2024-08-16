// import axios from "axios";
// import { useEffect, useState } from "react"
// import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton"
import CloudinaryImage from "./CloudinaryImage";
import { useUser } from "../contexts/UserContext";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// import {fetchWatchlist} from "../redux/watchlist/watchlistSlice"
// import { useAppDispatch } from "../utils/hooks";

const WatchLists = () => {

    const { user } = useUser();
    // const dispatch = useAppDispatch();
    const watchlist = useSelector((store: IStore)=>store.watchlist);

    // useEffect(() => {
    //     if(user){
    //         dispatch(fetchWatchlist());
    //     }
    // }, []);

    return (
        <div className="min-h-screen w-screen px-4 md:px-10 lg:px-24">
            {
                user?
                <>
                    <div className="mt-20">
                        <h1 className="text-xl font-semibold">Your Watch List</h1>
                    </div>
                    <div className="relative mt-6 w-full flex flex-wrap gap-2 md:gap-4 max-md:justify-center">
                        {
                            watchlist.movies ?
                                watchlist.movies.map((movie, ind) => (
                                    <div key={ind} className="h-[13.5rem] w-[10rem] md:h-[22rem] md:w-[16rem]">
                                        <CloudinaryImage movie={movie} />
                                    </div>
                                ))
                                :
                                (
                                    watchlist.isLoading ?
                                    [...Array(10)].map((_, ind) => (
                                        <Skeleton key={ind} className="h-[13.5rem] w-[10rem] md:h-[22rem] md:w-[16rem]" />
                                    ))
                                    :
                                    <p>Unable to find watchlist, please try again</p>
                                )
                        }
                    </div>
                </>
                :
                <div className="mt-24 flex flex-col items-center gap-4">
                    <p>You are not login, Please</p>
                    <Link to="/sign-in" className="text-lg px-6 py-3 bg-brand-color font-semibold hover:opacity-80 transition">Login now</Link>
                </div>
            }
        </div>
    )
}

export default WatchLists