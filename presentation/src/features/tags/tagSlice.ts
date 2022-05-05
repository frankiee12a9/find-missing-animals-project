import agent from '../../app/api/agent';
import { RootState } from '../../app/store/storeConfig';
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { TagDto, Tag } from '../../app/models/tag';

interface TagState {
  tagDto: TagDto | null;
  tagDtos: TagDto[] | [];
  status: string;
}

const initialState = {
  tagDto: null,
  tagDtos: [],
  status: 'idle',
} as TagState;

export const fetchTagById = createAsyncThunk(
  'tag/fetchTagByIdStatus',
  async (tagId: string, thunkAPI) => {
    try {
      const result = await agent.Tag.getTag(tagId);
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
      const result = await agent.Tag.getAllTags();
      return result;
    } catch (err: any) {
      return thunkAPI.rejectWithValue({ error: err.data });
    }
  }
);

export const tagSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    // significant reducers
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTagById.pending, (state, action) => {
      state.status = 'pendingFetchTag' + action.meta;
    });
    builder.addCase(fetchTagById.fulfilled, (state, action) => {
      state.tagDto = action.payload;
    });
    builder.addCase(fetchTagById.rejected, (state, action) => {
      console.log(action.payload);
      state.status = 'idle';
    });

    // fetchAllTags builders
  },
});

export const {} = tagSlice.actions;
