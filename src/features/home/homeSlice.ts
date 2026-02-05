import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import config from "../../config/config";

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
    requestor_notif_count: number;
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
    // search: string;
    // status: 'pending' | 'in_progress' | 'needs_feedback';
    ticketCount: TicketCount;
    ticketList: TicketList[] | null;
}

const initialState: InitialState = {
    // search: '',
    // status: 'pending',
    ticketCount: {
        pending: 0,
        in_progress: 0,
        needs_feedback: 0
    },
    ticketList: []
}

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {

    }
})

export default homeSlice.reducer;