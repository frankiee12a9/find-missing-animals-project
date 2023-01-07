import agent from '../../app/api/agent';
import { RootState } from '../../app/store/storeConfig';
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { TagDto } from '../../app/models/tag';

interface TagState {
    tag: TagDto | null;
    tags: TagDto[] | [];
    loadingTagDetails: boolean;
    loadingTags: boolean;
    status: string;
}

const initialState = {
    tag: null,
    tags: [],
    status: 'idle',
    loadingTags: false,
} as TagState;

export const fetchTagByName = createAsyncThunk(
    'tag/fetchTagByNameStatus',
    async (tagName: string, thunkAPI) => {
        try {
            const result = await agent.TagStore.getTag(tagName);
            return result;
        } catch (err: any) {
            return thunkAPI.rejectWithValue({ error: err.data });
        }
    }
);

export const fetchAllTags = createAsyncThunk(
    'tag/fetchAllTagsStatus',
    async (_, thunkAPI) => {
        try {
            const result = await agent.TagStore.getAllTags();
            return result;
        } catch (err: any) {
            return thunkAPI.rejectWithValue({ error: err.data });
        }
    }
);

export const tagSlice = createSlice({
    name: 'tags',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTagByName.pending, (state, action) => {
            state.status = 'pendingFetchTag' + action.meta;
        });
        builder.addCase(fetchTagByName.fulfilled, (state, action) => {
            state.tag = { ...action.payload };
            state.loadingTagDetails = true;
            state.status = 'idle';
        });
        builder.addCase(fetchTagByName.rejected, (state, action) => {
            state.status = 'idle';
        });
        builder.addCase(fetchAllTags.pending, (state, action) => {
            state.status = 'pendingFetchAllTagsStatus' + action.meta;
        });
        builder.addCase(fetchAllTags.fulfilled, (state, action) => {
            state.tags = { ...action.payload };
            state.loadingTags = true;
            state.status = 'idle';
        });
        builder.addCase(fetchAllTags.rejected, (state, action) => {
            state.status = 'idle';
        });
    },
});

export const { } = tagSlice.actions;
