import agent from "../../app/api/agent"
import {RootState} from "../../app/store/storeConfig"
import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import {TagDto, Tag} from "../../app/models/tag"

interface TagState {
    tagDto: TagDto | null
    tagDtos: TagDto[] | []
    status: string 
}

const initialState = {
    tagDto: null,
    tagDtos: [],
    status: "idle"
} as TagState 

export const fetchATagById = createAsyncThunk(
    "tag/fetchATagByIdStatus", 
    async (tagId: string, thunkAPI) => {
        try {
            const result = await agent.Tag.getATag(tagId)
            console.log("getATag", result)
            return result 
        } catch (err: any) {
            return thunkAPI.rejectWithValue({error: err.data})
        }
    }
)

export const fetchAllTags = createAsyncThunk(
    "tag/fetchAllTagsStatus",
    async (_, thunkAPI) => {
        try {
            const result = await agent.Tag.getAllTags() 
            console.log("getAllTags", result)
            return result 
        } catch (err: any) {
            return thunkAPI.rejectWithValue({error: err.data})
        } 
    }
)

export const tagSlice = createSlice({
    name: "tags", 
    initialState,
    reducers: {
        // signiicant reducers
    },
    extraReducers: (builder => {
        builder.addCase(fetchATagById.pending,  (state, action) => {
            state.status = "pendingFetchATag" + action.meta
        }) 
        builder.addCase(fetchATagById.rejected, (state, action) => {
            console.log(action.payload)
            state.status = "idle"
        }) 
        builder.addCase(fetchATagById.fulfilled, (state, action) => {
            state.tagDto = action.payload
        })
        // fetchAllTags
    })
})


export const { } = tagSlice.actions


