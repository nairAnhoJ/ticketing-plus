import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../config/config";

const storedToken = localStorage.getItem("token");
const storedUser = localStorage.getItem("user");

// Interface
    interface LoginPayload {
        id_number: string;
        password: string;
    }

    interface LoginResponse {
        token: string | null;
        user: any | null;
    }

    interface AuthState {
        user: any | null;
        token: string | null;
        loading: boolean;
        errors: [{ path: string, msg: string }] | null;
    }
// Interface



// Initial State
    const initialState: AuthState = {
        user: storedUser || null,
        token: storedToken || null,
        loading: false,
        errors: null
    };

export const loginUser = createAsyncThunk<LoginResponse, LoginPayload, { rejectValue: [{ path: string, msg: string }] }>('auth/login', async(payload, thunkAPI) => {
    try {
        const response = await config.post('/auth/login', payload);
        let res : LoginResponse = {
            token: null,
            user: null
        }
        if(response.data.status === 200){
            const allowed_app = response.data.user.allowed_app?.split(';');
            if(allowed_app.includes('ticketing') || allowed_app.includes('all')){
                res = {
                    token: response.data.token,
                    user: response.data.user
                }
            } 
        }
        return res;
    } catch (err: any) {
        console.log(err)
        if(err.response?.status === 401 || err.response?.status === 400){
            return thunkAPI.rejectWithValue(err.response.data.errors);
        }else{
            return thunkAPI.rejectWithValue([{ path: "unknown", msg: "Server Error"}]);
        }
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(){
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/login";
        }
    },
    extraReducers(builder) {builder
        .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.errors = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            console.log(action.payload)
            state.loading = false;

            // redux store
            state.user = action.payload.user;
            state.token = action.payload.token;

            // local store
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            localStorage.setItem("token", action.payload.token ?? "");
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            if(action.payload){
                state.errors = action.payload;
            }else{
                state.errors = [{ path: "unknown", msg: "Unexpected error" }];
            }
        })
    },
})

export const { logout } = authSlice.actions;
export default authSlice.reducer;