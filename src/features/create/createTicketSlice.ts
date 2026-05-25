import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import config from "../../config/config";

export interface InchargeDepartments {
    id: number;
    department_name: string;
    department_id: number;
}

export interface FormCategory {
    id: number;
    ticket_category_id: number;
    name: string;
    is_required: boolean;
}

export interface TicketCategory {
    id: number;
    name: string;
    description: string | null;
    sla_hours: number;
}

export interface InchargeUser {
    id: number;
    user_id: string;
    user_name: string;
    is_primary: number;
}

export interface LnError {
    path: string;
    message: string;
}

interface InitialState {
    loading: boolean;
    inchargeDepatments: InchargeDepartments[];
    formCategories: FormCategory[];
    ticketCategories: TicketCategory[];
    inchargeUsers: InchargeUser[];
    lnErrors: LnError[];
}

const initialState: InitialState = {
    loading: false,
    inchargeDepatments: [],
    formCategories: [],
    ticketCategories: [],
    inchargeUsers: [],
    lnErrors: [],
}

export const fetchInChargeDepartments = createAsyncThunk('create-ticket/incharge-departments', async () => {
    try {
        const res = await config.get(`/incharge-departments`);
        return res.data;
    } catch (error) {
        console.log(error)
    }
});

export const fetchTicketCategories = createAsyncThunk('create-ticket/ticket-categories', async (id: number) => {
    try {
        const res = await config.get(`/ticket-categories/${id}`);
        return res.data;
    } catch (error) {
        console.log(error)
    }
});

export const fetchInchargeUser = createAsyncThunk('create-ticket/incharge-user', async (id: number) => {
    try {
        const res = await config.get(`/incharge-users/${id}`);
        return res.data;
    } catch (error) {
        console.log(error)
    }
});

export const fetchFormCategory = createAsyncThunk('create-ticket/form-category', async () => {
    try {
        const res = await config.get(`/form-categories`);
        return res.data;
    } catch (error) {
        console.log(error)
    }
});

export const storeTicket = createAsyncThunk<any, any, { rejectValue: LnError[] }>('create-ticket/store-ticket', async (data: any, { rejectWithValue }) => {
    try {
        const res = await config.post(`/my-requests/store`, data, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return res.data;
    } catch (error: any) {
        console.log('nag-error')
        console.log(error)
        return rejectWithValue(
            error.response?.data || error.message
        );
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





        .addCase(fetchTicketCategories.pending, (state) => {
            state.loading = true;
            state.ticketCategories = [{
                id: 0,
                name: 'Select an option.',
                description: null,
                sla_hours: 0
            }]
            state.inchargeUsers = [];
        })
        .addCase(fetchTicketCategories.fulfilled, (state, payload) => {
            state.ticketCategories.push(...payload.payload);
            state.loading = false;
        })


        .addCase(fetchInchargeUser.pending, (state) => {
            state.loading = true;
            state.inchargeUsers = []
        })
        .addCase(fetchInchargeUser.fulfilled, (state, payload) => {
            state.inchargeUsers = payload.payload;
            state.loading = false;
        })

        
        .addCase(fetchFormCategory.fulfilled, (state, payload) => {
            state.formCategories = payload.payload;
            state.loading = false;
        })


        .addCase(storeTicket.rejected, (state, payload) => {
            state.lnErrors = payload.payload ?? []
        })
    },
})

export default createTicketSlice.reducer;