import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import config from "../../config/config";

export interface InchargeDepartments {
    id: number;
    department_name: string;
    department_id: number;
}

interface InitialState {
    loading: boolean;
    inchargeDepatments: InchargeDepartments[];
}

const initialState: InitialState = {
    loading: false,
    inchargeDepatments: []
}

export const fetchInChargeDepartments = createAsyncThunk('create-ticket/incharge-departments', async () => {
    try {
        const res = await config.get(`/incharge-departments`);
        console.log(res.data)
        return res.data;
    } catch (error) {
        console.log(error)
    }
});

const createTicketSlice = createSlice({
    name: 'create',
    initialState,
    reducers: {
        
    },
    extraReducers(builder) { builder
        .addCase(fetchInChargeDepartments.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchInChargeDepartments.fulfilled, (state, payload) => {
            state.inchargeDepatments = payload.payload;
            state.loading = false;
        })
    },
})

export default createTicketSlice.reducer;