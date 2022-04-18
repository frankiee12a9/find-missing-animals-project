import { LocalPrintshop } from "@material-ui/icons";
import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";
import {toast} from "react-toastify"
import agent from "../../app/api/agent"
import {User, LoginDto} from "../../app/models/user"
import {history} from "../../index" 

interface AuthState {
    user: User | null
}

const initialState = {
    user: null
} as AuthState


export const loginUser = createAsyncThunk<User, FieldValues>(
    "auth/loginUser",
    async (data, thunkAPI) => {
        try {
            const userDto = await agent.Auth.login(data)
            if (userDto.token) {
                localStorage.setItem("userToken", JSON.stringify(userDto.token))
            }
            return userDto
        } catch (err: any) {
            return thunkAPI.rejectWithValue({error: err.data})   
        }
    },
)

export const fetchCurrentUser = createAsyncThunk<User>(
    "auth/fetchCurrentUser",
    async (_, thunkAPI) => {
        thunkAPI.dispatch(setUser(JSON.stringify(localStorage.getItem("userToken"))))
        try {
            const userDto = await agent.Auth.currentUser()
            localStorage.setItem("userToken", JSON.stringify(userDto))
            return userDto
        } catch (err: any) {
            return thunkAPI.rejectWithValue({error: err.data})
        } 
    },
    {
        condition: () => {
            if (!localStorage.getItem("userToken")) return false
        }
    }
)

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null 
            localStorage.removeItem("userToken")
            history.push("/")
        },
        setUser: (state, action) => {
            // consider implementing this
            state.user = {...action.payload}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCurrentUser.rejected, (state) => {
            state.user = null 
            localStorage.removeItem("userToken")
            toast.error("Your session has expired! Please login again to use app")
            history.push("/")
        })
        builder.addMatcher(isAnyOf(loginUser.fulfilled, fetchCurrentUser.fulfilled), (state, action) => {
            state.user = {...action.payload}
        })
        builder.addMatcher(isAnyOf(loginUser.rejected), (state, action) => {
            throw action.payload
        })
    }
})


export const {logout, setUser} = authSlice.actions