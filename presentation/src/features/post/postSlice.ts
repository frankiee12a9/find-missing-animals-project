import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
    isAnyOf,
} from '@reduxjs/toolkit';
import { postAxiosParams } from 'app/utils/axios';
import agent from '../../app/api/agent';
import {
    Post,
    CreatePostDto,
    UpdatePostDto,
    PostQueryParams,
    LastViewedPost,
} from '../../app/models/post';
import { RootState } from '../../app/store/storeConfig';
import { Pagination } from './../../app/models/pagination';

interface PostState {
    currentPost: Post | null;
    lastViewPost: LastViewedPost | null;
    lastViewPosts: LastViewedPost[] | [];
    status: string;
    loadingPosts: boolean;
    loadingTags: boolean;
    tags: string[];
    postQueryParams: PostQueryParams | null;
    pagination: Pagination | null;
}

const postsAdapter = createEntityAdapter<Post>({
    selectId: (aPost) => aPost.id,
    sortComparer: (thisPost, thatPost) =>
        thisPost.title.localeCompare(thatPost.title),
});

export const fetchAllPostsAsync = createAsyncThunk<
    Post[],
    void,
    { state: RootState }
>('post/fetchAllPostsAsync', async (_, thunkAPI) => {
    const params = postAxiosParams(thunkAPI.getState().posts.postQueryParams!);
    try {
        const result = await agent.PostStore.getAllPosts(params);
        thunkAPI.dispatch(setPagination(result.pagination));
        return result.items;
    } catch (err: any) {
        return thunkAPI.rejectWithValue({ error: err.data });
    }
});

export const fetchFollowingPostsAsync = createAsyncThunk<
    Post[],
    void,
    { state: RootState }
>('post/fetchAllFollowingPostsAsync', async (_, thunkAPI) => {
    const params = postAxiosParams(thunkAPI.getState().posts.postQueryParams!);
    try {
        const result = await agent.PostStore.getAllFollowingPosts(params);
        thunkAPI.dispatch(setPagination(result.pagination));
        return result.items;
    } catch (err: any) {
        return thunkAPI.rejectWithValue({ error: err.data });
    }
});

export const fetchPostAsync = createAsyncThunk(
    'post/fetchPostAsync',
    async (postId: string, thunkAPI) => {
        try {
            const result = await agent.PostStore.getPost(postId);
            return result as Post;
        } catch (err: any) {
            return thunkAPI.rejectWithValue({ error: err.data });
        }
    }
);

export const createPostAsync = createAsyncThunk(
    'post/createPostAsync',
    async (createPostDto: CreatePostDto, thunkAPI) => {
        try {
            await agent.PostStore.createPost(createPostDto);
        } catch (err: any) {
            return thunkAPI.rejectWithValue({ error: err.data });
        }
    }
);

export const updatePostAsync = createAsyncThunk(
    'post/updatePostAsync',
    async (updatePostDto: UpdatePostDto, thunkAPI) => {
        try {
            await agent.PostStore.updatePost(updatePostDto);
        } catch (err: any) {
            return thunkAPI.rejectWithValue({ error: err.data });
        }
    }
);

export const followPostAsync = createAsyncThunk(
    'post/followPostAsync',
    async (postToFollow: Post, thunkAPI) => {
        try {
            const result = await agent.PostStore.followingPost(postToFollow);
            thunkAPI.dispatch(setPost(result));
            return result;
        } catch (err: any) {
            return thunkAPI.rejectWithValue({ error: err.data });
        }
    }
);

export const deletePostAsync = createAsyncThunk(
    'post/deletePostAsync',
    async (postId: string, thunkAPI) => {
        try {
            await agent.PostStore.deletePost(postId);
        } catch (err: any) {
            return thunkAPI.rejectWithValue({ error: err.data });
        }
    }
);

const initParams = () => {
    return {
        pageNumber: 1,
        pageSize: 10,
        orderBy: 'title',
        fromDate: '',
        toDate: '',
        isPoster: false,
        searchText: '',
        follower: '',
        roadLocation: '',
        detailedLocation: '',
        location: '',
        tags: [],
        tag1: '',
        tag2: '',
        tag3: '',
        tag4: '',
        tag5: '',
    };
};

export const postSlice = createSlice({
    name: 'posts',
    initialState: postsAdapter.getInitialState<PostState>({
        currentPost: null,
        lastViewPost: null,
        lastViewPosts: [],
        loadingPosts: false,
        loadingTags: false,
        tags: [],
        status: 'idle',
        // PostQueryParams
        postQueryParams: initParams(),
        pagination: null,
    }),
    reducers: {
        setPostParams: (state: any, action: any) => {
            state.loadingPosts = false;
            state.postQueryParams = {
                ...state.postQueryParams,
                ...action.payload,
                pageNumber: 1,
            };
            console.log('postParams', state.postQueryParams);
        },
        setPageNumber: (state: any, action: any) => {
            state.loadingPosts = false;
            // console.log('action.payload', action.payload);
            state.postQueryParams = { ...state.postQueryParams, ...action.payload };
        },
        setPagination: (state: any, action: any) => {
            state.pagination = action.payload;
        },
        setPost: (state: any, action: any) => {
            console.log('action.payload', action.payload);
            postsAdapter.upsertOne(state, action.payload);
            state.loadingPosts = false;
        },
        setLastViewedPost: (state: PostState, action: any) => {
            state.lastViewPost = { ...action.payload };
        },
        setLastViewPosts: (state: any, action: any) => {
            state.lastViewedPosts = { ...action.payload };
        },
        resetPostParams: (state: any, action: any) => {
            state.postQueryParams = initParams();
        },
        removePost: (state: any, action: any) => {
            postsAdapter.removeOne(state, action.payload);
            state.loadingPosts = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createPostAsync.pending, (state, action) => {
            state.status = 'pendingCreatePost' + action.meta.arg.content;
        });
        builder.addCase(createPostAsync.rejected, (state, action) => {
            // TODO:
        });
        builder.addCase(fetchPostAsync.pending, (state, action) => {
            state.status = 'pendingFetchPostAsync';
        });
        builder.addCase(fetchPostAsync.fulfilled, (state, action) => {
            postsAdapter.upsertOne(state, action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchPostAsync.rejected, (state, action) => {
            state.status = 'idle';
        });
        builder.addCase(fetchAllPostsAsync.pending, (state, action) => {
            state.status = 'pendingFetchAllPostsAsync';
        });
        builder.addCase(fetchAllPostsAsync.fulfilled, (state, action) => {
            postsAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.loadingPosts = true;
        });
        builder.addCase(fetchAllPostsAsync.rejected, (state, action) => {
            state.status = 'idle';
        });
        builder.addCase(fetchFollowingPostsAsync.pending, (state, action) => {
            state.status = 'pendingFetchAllFollowingPostsAsync';
        });
        builder.addCase(fetchFollowingPostsAsync.fulfilled, (state, action) => {
            postsAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.loadingPosts = true;
        });
        builder.addCase(fetchFollowingPostsAsync.rejected, (state, action) => {
            state.status = 'idle';
        });
        builder.addCase(followPostAsync.pending, (state, action) => {
            state.status = 'followingPostsAsync';
        });
        builder.addCase(followPostAsync.fulfilled, (state, action) => {
            state.status = 'idle';
        });
        builder.addCase(followPostAsync.rejected, (state, action) => {
            state.status = 'idle';
        });
    },
});

export const postSelectors = postsAdapter.getSelectors(
    (state: RootState) => state.posts
);

export const {
    setPostParams,
    setPageNumber,
    setPagination,
    setPost,
    setLastViewedPost,
    setLastViewPosts,
    resetPostParams,
    removePost,
} = postSlice.actions;
