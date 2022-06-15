import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from '@microsoft/signalr';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import agent from 'app/api/agent';
import { CommentDto, PostComment } from 'app/models/comment';

interface CommentState {
  comment: PostComment | null;
  commentList: PostComment[] | [];
  hubConnection: HubConnection | null;
  status: string;
}

const initialState = {
  comment: null,
  commentList: [],
  hubConnection: null,
  status: 'idle',
} as CommentState;

export const addCommentAsync = createAsyncThunk(
  'tag/AddCommentAsyncStatus',
  async (commentDto: CommentDto, thunkAPI) => {
    try {
      const hubConnection: HubConnection | null = null;
      const result = hubConnection?.invoke('SendComment', commentDto);
      return result;
    } catch (err: any) {
      return thunkAPI.rejectWithValue({ error: err.data });
    }
  }
);

export const test =

export const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    createHubConnection: (state: any, action: any) => {

    },
    stopHubConnection: () => {},
    clearComments: () => {},
  },
});

export const { createHubConnection, stopHubConnection, clearComments } =
  commentSlice.actions;
