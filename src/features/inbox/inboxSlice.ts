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

export interface Feature {
    id: number;
    department_id: number;
    feature_key: string;
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
    is_on_hold: number;
    assigned_notif_count: number;
}

export interface SelectedTicket{
    id: number;
    ticket_number: string;
    ticket_category: string;
    ticket_category_id: number;

    requester: string;
    requester_first_name: string;
    requester_last_name: string;
    requester_avatar: string;
    requester_text_color: string;
    requester_bg_color: string;

    assigned_user_id: number;
    assigned_user: string;
    requester_department: string;

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
    
    requester_notif_count: number;
    assigned_notif_count: number;
}

interface InitialState {
    ticketCount: TicketCount;
    ticketList: Ticket[];
    selectedTicket: SelectedTicket | null;
    listLoading: boolean;
    selectLoading: boolean;
    features: Feature[];
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
    selectLoading: false,
    features: []
}



export const fetchInbox = createAsyncThunk('inbox/fetch-all', async ({department_id, search = "", status, assignee}: {department_id: number, search: string, status: 'all' | 'pending' | 'in_progress', assignee: number}) => {
    try {
        const res = await config.get(`/inbox?department_id=${department_id}&search=${search}&status=${status}&assignee=${assignee}`);
        return res.data;
    } catch (error) {
        console.log(error)
    }
});

export const fetchNewInbox = createAsyncThunk('inbox/fetch-new', async ({department_id, search = "", status, assignee}: {department_id: number, search: string, status: 'all' | 'pending' | 'in_progress', assignee: number}) => {
    try {
        const res = await config.get(`/inbox?department_id=${department_id}&search=${search}&status=${status}&assignee=${assignee}`);
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

export const fetchSelectedTicket = createAsyncThunk('inbox/fetch-by-id', async (id: number) => {
    try {
        const ticket = await config.get(`/inbox/${id}`);
        return ticket.data;
    } catch (error) {
        console.log(error)
    }
});

export const fetchSelectedTicketUpdate = createAsyncThunk('inbox/fetch-by-id-update', async (id: number) => {
    try {
        const ticket = await config.get(`/inbox/${id}`);
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

export const reassign = createAsyncThunk('inbox/reassign', async ({id, user_id}: {id: number, user_id: number}) => {
    try {
        const res = await config.patch(`/inbox/${id}/reassign`, {user_id});
        return res.data;
    } catch (error) {
        console.log(error)
    }
});

export const hold = createAsyncThunk('inbox/hold', async (id: number) => {
    try {
        const res = await config.patch(`/inbox/${id}/hold`);
        return res.data;
    } catch (error) {
        console.log(error)
    }
});

export const resume = createAsyncThunk('inbox/resume', async (id: number) => {
    try {
        const res = await config.patch(`/inbox/${id}/resume`);
        return res.data;
    } catch (error) {
        console.log(error)
    }
});

export const changeTicketStatus = createAsyncThunk('inbox/change-status', async ({id, type, user_id}: {id: number, type: 'start' | 'complete' | 'resume', user_id: number}) => {
    try {
        const res = await config.put(`/inbox/${id}/change-status`, {type, user_id});
        return res.data;
    } catch (error) {
        console.log(error)
    }
});

export const completeTicket = createAsyncThunk('inbox/complete-ticket', async (data: any, { rejectWithValue }) => {
    try {
        const res = await config.post(`/inbox/complete-ticket`, data);
        return res.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data || "Server Error");
    }
});

export const fetchDepartmentFeatures = createAsyncThunk('inbox/department-features', async () => {
    try {
        const features = await config.get(`/department-features`);
        return features.data;
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

        .addCase(fetchNewInbox.fulfilled, (state, payload) => {
            const incoming : Ticket[] = payload.payload; // new data
            const existing = state.ticketList; // current state

            incoming.forEach((incomingTicket) => {
                const existingTicket = existing.find(
                    t => t.id === incomingTicket.id
                );

                if (existingTicket) {
                    Object.assign(existingTicket, incomingTicket);
                } else {
                    existing.unshift(incomingTicket);
                }
            });
        })


        .addCase(fetchTicketCounts.fulfilled, (state, payload) => {
            state.ticketCount = payload.payload;
        })


        .addCase(fetchSelectedTicket.pending, (state) => {
            state.selectLoading = true;
            // state.errors = null;
        })
        .addCase(fetchSelectedTicket.fulfilled, (state, payload) => {
            state.selectLoading = false;
            state.selectedTicket = payload.payload;
            state.ticketList.find(t=>t.id === payload.payload.id)!.assigned_notif_count = 0;
            // state.errors = null;
        })

        .addCase(fetchSelectedTicketUpdate.fulfilled, (state, payload) => {
            const incomingUpdates : TicketUpdates[] = payload.payload.updates; // new data

            if(state.selectedTicket){
                const existingUpdates = state.selectedTicket!.updates; // current state
                if(existingUpdates){
                    const difference = incomingUpdates.filter(
                        inc => !existingUpdates.some(ex => ex.id === inc.id)
                    );

                    const updated = [...difference, ...existingUpdates];

                    state.selectedTicket!.updates = updated;
                }
            }
        })

        
        .addCase(sendUpdate.fulfilled, (state, payload) => {
            if(state.selectedTicket){
                state.selectedTicket.updates = payload.payload;
            }
        })

        
        .addCase(reassign.fulfilled, (state, payload) => {
            if(state.selectedTicket){
                state.selectedTicket.assigned_user_id = payload.payload?.user.id;
                state.selectedTicket.assigned_user = payload.payload?.user.name;
            }
        })

        
        .addCase(fetchDepartmentFeatures.fulfilled, (state, payload) => {
            state.features = payload.payload;
            // if(state.selectedTicket){
            //     state.selectedTicket.assigned_user_id = payload.payload?.user.id;
            //     state.selectedTicket.assigned_user = payload.payload?.user.name;
            // }
        })

        
        .addCase(hold.fulfilled, (state) => {
            if(state.selectedTicket){
                state.selectedTicket.is_on_hold = true;
            }
        })

        
        .addCase(changeTicketStatus.fulfilled, (state, payload) => {
            if(state.selectedTicket){
                state.selectedTicket.status = payload.payload;
            }
            if(payload.payload === 'in_progress'){
                state.ticketCount.pending--;
                state.ticketCount.in_progress++;
            }
        })

        
        .addCase(completeTicket.fulfilled, (state, payload) => {
            const ticket = state.ticketList.find((ticket) => ticket.id == payload.payload.id);
            if(ticket){
                ticket.status = payload.payload.status
            }
                
            if(state.selectedTicket){
                state.selectedTicket.status = payload.payload.status;
            }

            state.ticketCount.in_progress--;
            state.ticketCount.needs_feedback++;
        })
    },
})

export default inboxSlice.reducer;