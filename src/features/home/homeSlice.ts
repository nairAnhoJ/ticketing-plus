import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import config from "../../config/config";

// const storedToken = localStorage.getItem("token");
// const storedUser = localStorage.getItem("user");

export interface TicketCount {
    pending: number;
    in_progress: number;
    needs_feedback: number;
}

export interface TicketUpdates {
    message: string;
    create_by: string;
    create_at: string;
}

export interface TicketList{
    id: number;
    assigned_user: string;
    assigned_user_avatar: string | null;
    assigned_department: string;
    status: string;
    subject: string;
    description: string;
    created_at: string;
    requester_notif_count: number;
}

export interface SelectedTicket{
    id: number;
    ticket_number: string;
    ticket_category: string;
    assigned_user: string;
    assigned_user_avatar: string | null;
    assigned_department: string;
    status: string;
    subject: string;
    description: string;
    attachments: string[] | null;
    updates: TicketUpdates[] | null;
    created_at: string;
}

interface InitialState {
    ticketCount: TicketCount;
    ticketList: TicketList[] | null;
    selectedTicket: SelectedTicket;
    loading: boolean;
}

const initialState: InitialState = {
    ticketCount: {
        pending: 0,
        in_progress: 0,
        needs_feedback: 0
    },
    ticketList: [],
    selectedTicket: {
        id: 4,
        ticket_number: '',
        ticket_category: '',
        assigned_user: '',
        assigned_user_avatar: null,
        assigned_department: '',
        status: '',
        subject: '',
        description: '',
        attachments: null,
        updates: null,
        created_at: ''
    },
    loading: false
}



export const fetchMyRequests = createAsyncThunk('my-requests/fetch', async ({id, search = "", status}: {id: number, search: string, status: 'all' | 'pending' | 'in_progress'}) => {
    try {
        const res = await config.get(`/my-requests?id=${id}&search=${search}&status=${status}`);
        return res.data;
    } catch (error) {
        console.log(error)
    }
});



const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {

    },
    extraReducers(builder) { builder
        .addCase(fetchMyRequests.pending, (state) => {
            state.loading = true;
            state.ticketList = [];
            // state.errors = null;
        })
        .addCase(fetchMyRequests.fulfilled, (state, payload) => {
            console.log(payload.payload)
            state.loading = false;
            state.ticketList = payload.payload;
            // state.errors = null;
        })
    },
})

export default homeSlice.reducer;