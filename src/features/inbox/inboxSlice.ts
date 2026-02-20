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
    assigned_department: string;
    requester: string;
    requester_first_name: string;
    requester_last_name: string;
    requester_avatar: string;
    requester_text_color: string;
    requester_bg_color: string;
    status: string;
    subject: string;
    description: string;
    created_at: string;
    assigned_notif_count: number;
}

export interface SelectedTicket{
    id: number;
    ticket_number: string;
    ticket_category: string;

    requester: string;
    requester_first_name: string;
    requester_last_name: string;
    requester_avatar: string;
    requester_text_color: string;
    requester_bg_color: string;

    assigned_user: string;
    requester_department: string;

    status: string;
    subject: string;
    description: string;
    attachments: Attachment[] | null;
    updates: TicketUpdates[] | null;
    created_by: number;
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



export const fetchInbox = createAsyncThunk('inbox/fetch-all', async ({department_id, search = "", status}: {department_id: number, search: string, status: 'all' | 'pending' | 'in_progress'}) => {
    try {
        const res = await config.get(`/inbox?department_id=${department_id}&search=${search}&status=${status}`);
        console.log(res.data)
        return res.data;
    } catch (error) {
        console.log(error)
    }
});

export const fetchTicketCounts = createAsyncThunk('inbox/ticket-counts', async (id: number) => {
    try {
        const res = await config.get(`/inbox/ticket-counts/${id}`);
        return res.data;
    } catch (error) {
        console.log(error)
    }
});

export const fetchSelectedRequest = createAsyncThunk('inbox/fetch-by-id', async (id: number) => {
    try {
        const ticket = await config.get(`/inbox/${id}`);
        console.log(ticket.data)
        return ticket.data;
    } catch (error) {
        console.log(error)
    }
});

export const sendUpdate = createAsyncThunk('inbox/send-update', async ({id, user_id, message}: {id: number, user_id: number, message: string}) => {
    try {
        const res = await config.post(`/inbox/${id}/send-update`, {user_id, message});
        return res.data;
    } catch (error) {
        console.log(error)
    }
});

export const changeTicketStatus = createAsyncThunk('inbox/change-status', async ({id, type, user_id}: {id: number, type: 'start' | 'complete', user_id: number}) => {
    try {
        const res = await config.put(`/inbox/${id}/change-status`, {type, user_id});
        return res.data;
    } catch (error) {
        console.log(error)
    }
});




const inboxSlice = createSlice({
    name: 'inbox',
    initialState,
    reducers: {

    },
    extraReducers(builder) { builder 
        .addCase(fetchInbox.pending, (state) => {
            state.selectedTicket = null;
            state.listLoading = true;
            state.ticketList = [];
            // state.errors = null;
        })
        .addCase(fetchInbox.fulfilled, (state, payload) => {
            state.listLoading = false;
            state.ticketList = payload.payload ?? [];
            // state.errors = null;
        })

        
        .addCase(fetchTicketCounts.fulfilled, (state, payload) => {
            state.ticketCount = payload.payload;
        })



        .addCase(fetchSelectedRequest.pending, (state) => {
            state.selectLoading = true;
            // state.errors = null;
        })
        .addCase(fetchSelectedRequest.fulfilled, (state, payload) => {
            state.selectLoading = false;
            state.selectedTicket = payload.payload;
            state.ticketList.find(t=>t.id === payload.payload.id)!.assigned_notif_count = 0;
            // state.errors = null;
        })

        
        .addCase(sendUpdate.fulfilled, (state, payload) => {
            if(state.selectedTicket){
                state.selectedTicket.updates = payload.payload;
            }
        })

        
        .addCase(changeTicketStatus.fulfilled, (state, payload) => {
            if(state.selectedTicket){
                state.selectedTicket.status = payload.payload;
            }
        })
    },
})

export default inboxSlice.reducer;