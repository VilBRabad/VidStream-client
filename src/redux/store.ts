import {configureStore} from "@reduxjs/toolkit"
import watchlistReducer from "./watchlist/watchlistSlice";

export const store = configureStore({
    reducer: {
        watchlist: watchlistReducer
    }
})

export type AppDispatch = typeof store.dispatch;