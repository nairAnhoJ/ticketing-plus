import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import config from "../../config/config";
import type { LnData } from "../create/_components/LnForm";

// const storedToken = localStorage.getItem("token");
// const storedUser = localStorage.getItem("user");

export interface TicketCount {
    pending: number;
    in_progress: number;
    needs_feedback: number;
}

export interface TicketUpdates {
    id: number;
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
    assigned_user_first_name: string;
    assigned_user_last_name: string;
    assigned_user_avatar: string | null;
    assigned_user_bg_color: string;
    assigned_user_text_color: string;
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
    ticket_category_id: number;
    ticket_category: string;
    assigned_user: string;
    assigned_user_first_name: string;
    assigned_user_last_name: string;
    assigned_user_avatar: string | null;
    assigned_user_bg_color: string;
    assigned_user_text_color: string;
    assigned_department: string;
    status: string;
    subject: string;
    description: string;
    reqAttachments: Attachment[] | null;
    resAttachments: Attachment[] | null;
    updates: TicketUpdates[] | null;
    created_by: number;
    created_at: string;
    started_at: string;
    resolution: string;
    completed_by: string;
    completed_at: string;
    is_on_hold: boolean;
    on_hold_duration: string;
}

interface InitialState {
    ticketCount: TicketCount;
    ticketList: Ticket[];
    selectedTicket: SelectedTicket | null;
    lnTicket: LnData | null;
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
    lnTicket: null,
    listLoading: false,
    selectLoading: false
}



export const fetchMyRequests = createAsyncThunk('my-requests/fetch', async ({id, search = "", status}: {id: number, search: string, status: 'all' | 'pending' | 'in_progress' | 'needs_feedback'}) => {
    try {
        const res = await config.get(`/my-requests?id=${id}&search=${search}&status=${status}`);
        return res.data;
    } catch (error) {
        console.log(error)
    }
});

export const fetchNewRequests = createAsyncThunk('my-requests/fetch-new', async ({id, search = "", status}: {id: number, search: string, status: 'all' | 'pending' | 'in_progress' | 'needs_feedback'}) => {
    try {
        const res = await config.get(`/my-requests?id=${id}&search=${search}&status=${status}`);
        return res.data;
    } catch (error) {
        console.log(error)
    }
});

export const fetchTicketCounts = createAsyncThunk('my-requests/ticket-counts', async (id: number) => {
    try {
        const res = await config.get(`/my-requests/ticket-counts/${id}`);
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

export const fetchLNTicket = createAsyncThunk('ln-tickets/fetch', async (id: number) => {
    try {
        const res = await config.get(`/ln-tickets/${id}`);
        return res.data;
    } catch (error) {
        console.log(error)
    }
});

export const fetchNewMessages = createAsyncThunk('my-requests/fetch-new-messages', async (id: number) => {
    try {
        const ticket = await config.get(`/my-requests/${id}/updates`);
        return ticket.data;
    } catch (error) {
        console.log(error)
    }
});

export const sendUpdate = createAsyncThunk('my-requests/send-update', async ({id, user_id, message}: {id: number, user_id: number, message: string}) => {
    try {
        const res = await config.post(`/my-requests/${id}/send-update`, {user_id, message});
        return res.data;
    } catch (error) {
        console.log(error)
    }
});

export const cancelTicket = createAsyncThunk('my-requests/cancel-ticket', async ({id, user_id}: {id: number, user_id: number}) => {
    try {
        const res = await config.put(`/my-requests/${id}/cancel-ticket`, {user_id});
        return res.data;
    } catch (error) {
        console.log(error)
    }
});

export const submitFeedback = createAsyncThunk('my-requests/submit-feedback', async (data: { ticket_id: number | undefined, rating: number; comment: string; }) => {
    try {
        const res = await config.post(`/my-requests/submit-feedback`, data);
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

        
        .addCase(fetchNewRequests.fulfilled, (state, payload) => {
            const incoming: Ticket[] = payload.payload;
            const existing = state.ticketList;

            const updatedList = [...existing];

            incoming.forEach(inItem => {
                const index = updatedList.findIndex(
                    exItem => exItem.id === inItem.id
                );

                if (index !== -1) {
                    // exists → check notif count
                    if (updatedList[index].requester_notif_count !== inItem.requester_notif_count){
                        updatedList[index] = {
                            ...updatedList[index],
                            ...inItem,
                        };
                    }
                }
            });

            state.ticketList = updatedList;
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
            state.ticketList.find(t=>t.id === payload.payload.id)!.requester_notif_count = 0;
            // state.errors = null;
        })

        .addCase(fetchLNTicket.fulfilled, (state, payload) => {
            state.lnTicket = payload.payload;
        })
        
                
        .addCase(fetchNewMessages.fulfilled, (state, payload) => {
            const incoming : TicketUpdates[] = payload.payload.updates; // new data
            const existing = state.selectedTicket!.updates; // current state

            if(existing){
                const difference = incoming.filter(
                    inc => !existing.some(ex => ex.id === inc.id)
                );

                const updated = [...difference, ...existing];

                state.selectedTicket!.updates = updated;
            }
        })

        
        .addCase(sendUpdate.fulfilled, (state, payload) => {
            if(state.selectedTicket){
                state.selectedTicket.updates = payload.payload;
            }
        })

        
        .addCase(cancelTicket.fulfilled, (state, payload) => {
            if(state.selectedTicket){
                state.selectedTicket.status = payload.payload;
            }
        })

        
        .addCase(submitFeedback.fulfilled, (state, payload) => {
            const ticket = state.ticketList.find((ticket) => ticket.id == payload.payload.id);
            if(ticket){
                ticket.status = payload.payload.status
            }

            if(state.selectedTicket){
                state.selectedTicket.status = payload.payload.status;
            }

            state.ticketCount.needs_feedback--;
        })
    },
})

export default homeSlice.reducer;