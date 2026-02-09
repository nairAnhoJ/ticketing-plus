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
    user_id: number;
    created_by: string;
    created_at: string;
}

export interface Attachment {
    id: number;
    file_path: string;
    type: string;
}

export interface Ticket{
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
    attachments: Attachment[] | null;
    updates: TicketUpdates[] | null;
    created_at: string;
}

interface InitialState {
    ticketCount: TicketCount;
    ticketList: Ticket[];
    selectedTicket: SelectedTicket | null;
    listLoading: boolean;
    selectLoading: boolean;
}

const initialState: InitialState = {
    ticketCount: {
        pending: 0,
        in_progress: 0,
        needs_feedback: 0
    },
    ticketList: [],
    selectedTicket: null,
    listLoading: false,
    selectLoading: false
}



export const fetchMyRequests = createAsyncThunk('my-requests/fetch', async ({id, search = "", status}: {id: number, search: string, status: 'all' | 'pending' | 'in_progress'}) => {
    try {
        const res = await config.get(`/my-requests?id=${id}&search=${search}&status=${status}`);
        return res.data;
    } catch (error) {
        console.log(error)
    }
});

export const fetchSelectedRequest = createAsyncThunk('my-requests/fetch-by-id', async (id: number) => {
    try {
        const ticket = await config.get(`/my-requests/${id}`);
        return ticket.data;
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
            state.selectedTicket = null;
            state.listLoading = true;
            state.ticketList = [];
            // state.errors = null;
        })
        .addCase(fetchMyRequests.fulfilled, (state, payload) => {
            state.listLoading = false;
            state.ticketList = payload.payload ?? [];
            // state.errors = null;
        })
        .addCase(fetchSelectedRequest.pending, (state) => {
            state.selectLoading = true;
            // state.errors = null;
        })
        .addCase(fetchSelectedRequest.fulfilled, (state, payload) => {
            console.log(payload.payload)
            state.selectLoading = false;
            state.selectedTicket = payload.payload;
            // state.errors = null;
        })
    },
})

export default homeSlice.reducer;