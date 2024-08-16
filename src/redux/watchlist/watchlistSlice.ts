import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

interface fetchWatchlistProps {
    movies: IMovie[] | null;
}

interface RejectValue {
    errorMessage: string;
}

export const fetchWatchlist = createAsyncThunk<fetchWatchlistProps, void, { rejectValue: RejectValue }>(
    "watchlist/fetchWatchlist",
    async (_, { rejectWithValue }) => {
        console.log("vilas")
        try {
            const res = await axios.get("http://localhost:8000/api/v1/user/get-watchlists", { withCredentials: true });
            const data = await res.data.data;
            console.log(data);
            return { movies: data };
        } catch (error) {
            const errorMessage = axios.isAxiosError(error) && error.response?.data?.message
                ? error.response.data.message
                : "An unknown error occurred";
            return rejectWithValue(errorMessage);
        }
    }
)

export const addToWatchlist = createAsyncThunk<IMovie, string, { rejectValue: RejectValue }>(
    "watchlist/addToWatchlist",
    async (movieId, { rejectWithValue }) => {
        try {
            const res = await axios.post("http://localhost:8000/api/v1/user/add-to-watchlist", {movieId}, {withCredentials: true});
            const data = await res.data.data;
            return data;
        } catch (error) {
            let errorMessage = "Un-expected error";
            if(axios.isAxiosError(error)){
                const res = error.response;
                if(res){
                    if(res.status === 402 ) errorMessage = "Un-authorized request!";
                    else if(res.status === 400) errorMessage = "Movie not found";
                    else if(res.status === 401) errorMessage = "Something went wrong! please try to login again";
                    else if(res.status === 405) errorMessage = "Already in watch list";
                }
                else{
                    errorMessage = "Server error";
                }
            }
            console.log(error);
            return rejectWithValue({errorMessage});
        }
    }
)

export const removeFromWatchlist = createAsyncThunk<void, string, { rejectValue: RejectValue }>(
    "watchlist/removeFromWatchlist",
    async(movieId, {rejectWithValue})=>{
        try {
            const res = await axios.post("http://localhost:8000/api/v1/user/remove-from-watchlist", {movieId}, {withCredentials: true});
            const data = res.data.data;
            return data;
        } catch (error) {
            let errorMessage = "Un-expected error";
            if(axios.isAxiosError(error)){
                const res = error.response;
                if(res){
                    if(res.status === 402 ) errorMessage = "Un-authorized request!";
                    else if(res.status === 400) errorMessage = "Movie not found";
                    else if(res.status === 401) errorMessage = "Something went wrong! please try to login again";
                }
                else{
                    errorMessage = "Server error";
                }
            }
            console.log(error);
            return rejectWithValue({errorMessage});
        }
    }
)

const initialState: watchlistState = {
    movies: null,
    isLoading: false,
    isError: false
}

const watchlistSlice = createSlice({
    name: "watchlist",
    initialState,
    reducers: {
        resetStore: (state)=>state = initialState
    },
    extraReducers: (builder) => {
        builder.addCase(fetchWatchlist.pending, (state, action) => {
            console.log("Pending", action.payload)
            state.isLoading = true;
        })

        builder.addCase(fetchWatchlist.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            console.log("Fulfilled", action.payload);
            state.movies = action.payload.movies;
        })

        builder.addCase(fetchWatchlist.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            console.log("Rejected", action.payload);
            toast.error("Please login again!");
        })

        builder.addCase(addToWatchlist.fulfilled, (state, action)=>{
            state.movies?.push(action.payload);
            toast.success("Added to watchlist");
        })

        builder.addCase(addToWatchlist.rejected, (state, action)=>{
            if(action.payload?.errorMessage){
                toast.error(action.payload?.errorMessage);
            }
            else{
                toast.error("Un-expected error");
            }
            console.log(action.payload);
        })

    }
})

export const {resetStore} = watchlistSlice.actions;
export default watchlistSlice.reducer;