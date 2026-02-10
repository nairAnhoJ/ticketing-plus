import { configureStore } from "@reduxjs/toolkit";

import authReducer from '../features/auth/authSlice'
import homeReducer from '../features/home/homeSlice'
import createTicketReducer from '../features/create/createTicketSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        home: homeReducer,
        createTicket: createTicketReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch