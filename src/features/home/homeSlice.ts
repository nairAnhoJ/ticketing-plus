import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import config from "../../config/config";

const storedToken = localStorage.getItem("token");
const storedUser = localStorage.getItem("user");

export interface TicketCount {
    pending: number;
    in_progress: number;
    needs_feedback: number;
}

interface InitialState {
    ticketCount: TicketCount;
}

const initialState: InitialState = {
    ticketCount: {
        pending: 1,
        in_progress: 2,
        needs_feedback: 3
    }
}

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {

    }
})

export default homeSlice.reducer;