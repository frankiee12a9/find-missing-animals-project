import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  isAnyOf,
} from '@reduxjs/toolkit';
import agent from '../../app/api/agent';
import {
  Post,
  CreatePostDto,
  UpdatePostDto,
  PostQueryParams,
} from '../../app/models/post';
import { RootState } from '../../app/store/storeConfig';
import { Pagination } from './../../app/models/pagination';

// TODO:
interface PostState {
  post: Post | null;
  status: string;
  loadingPosts: boolean;
  loadingTags: boolean;
  tags: string[];
  postQueryParams: PostQueryParams | null;
  pagination: Pagination | null;
}

// const initialState = {
//   post: null,
//   status: 'idle',
//   loadingPosts: false,
// } as PostState;

// TODO: read more about createEntityAdapter

const postsAdapter = createEntityAdapter<Post>({
  selectId: (aPost) => aPost.id,
  sortComparer: (thisPost, thatPost) =>
    thisPost.title.localeCompare(thatPost.title),
});

const getAxiosParams = (postQueryParams: PostQueryParams) => {
  const params = new URLSearchParams();
  params.append('pageNumber', postQueryParams.pageNumber.toString());
  params.append('pageSize', postQueryParams.pageSize.toString());
  params.append('orderBy', postQueryParams.orderBy);

  if (postQueryParams.searchText)
    params.append('searchText', postQueryParams.searchText);
  if (postQueryParams.tags.length > 0)
    params.append('tags', postQueryParams.tags.toString());

  return params;
};

export const fetchAllPostsAsync = createAsyncThunk<
  Post[],
  void,
  { state: RootState }
>('post/fetchAllPostsAsync', async (_, thunkAPI) => {
  const params = getAxiosParams(thunkAPI.getState().posts.postQueryParams!);
  console.log('params', params.toString()); //  Note: use .toString() or .JSON.stringify() to check type of object
  try {
    const result = await agent.Post.getAllPosts(params);
    thunkAPI.dispatch(setMetaData(result.pagination));
    console.log('result.items', result.items);
    return result.items;
  } catch (err: any) {
    return thunkAPI.rejectWithValue({ error: err.data });
  }
});

export const fetchPostAsync = createAsyncThunk(
  'post/fetchPostAsync',
  async (postId: string, thunkAPI) => {
    try {
      const result = await agent.Post.getPost(postId);
      return result;
    } catch (err: any) {
      return thunkAPI.rejectWithValue({ error: err.data });
    }
  }
);

export const createPostAsync = createAsyncThunk(
  'post/createPostAsync',
  async (createPostDto: CreatePostDto, thunkAPI) => {
    try {
      return await agent.Post.createPost(createPostDto);
    } catch (err: any) {
      return thunkAPI.rejectWithValue({ error: err.data });
    }
  }
);

export const updatePostAsync = createAsyncThunk(
  'post/updatePostAsync',
  async (updatePostDto: UpdatePostDto, thunkAPI) => {
    try {
      return await agent.Post.updatePost(updatePostDto);
    } catch (err: any) {
      return thunkAPI.rejectWithValue({ error: err.data });
    }
  }
);

export const deletePostAsync = createAsyncThunk(
  'post/deletePostAsync',
  async (postId: string, thunkAPI) => {
    try {
      return await agent.Post.deletePost(postId);
    } catch (err: any) {
      return thunkAPI.rejectWithValue({ error: err.data });
    }
  }
);

const pagingInitParams = () => {
  return {
    pageNumber: 1,
    pageSize: 6,
    orderBy: 'name',
    isPoster: false,
    searchText: '',
    roadLocation: '',
    detailedLocation: '',
    location: '',
    tags: [],
    // Note: ??
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
    post: null,
    loadingPosts: false,
    loadingTags: false,
    tags: [],
    status: 'idle',
    postQueryParams: pagingInitParams(),
    pagination: null,
  }),
  reducers: {
    setPostParams: (state, action) => {
      state.loadingPosts = false;
      state.postQueryParams = {
        ...state.postQueryParams,
        ...action.payload,
        pageNumber: 1,
      };
      console.log('postParams', state.postQueryParams);
    },
    setPageNumber: (state, action) => {
      state.loadingPosts = false;
      state.postQueryParams = { ...state.postQueryParams, ...action.payload };
    },
    setMetaData: (state, action) => {
      state.pagination = action.payload;
    },
    setPost: (state, action) => {
      postsAdapter.upsertOne(state, action.payload);
      state.loadingPosts = false;
    },
    resetPostParams: (state, action) => {
      state.postQueryParams = pagingInitParams();
    },
    removePost: (state, action) => {
      postsAdapter.removeOne(state, action.payload);
      state.loadingPosts = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createPostAsync.pending, (state, action) => {
      state.status = 'pendingCreatePost' + action.meta.arg.post;
    });
    builder.addCase(createPostAsync.rejected, (state, action) => {
      // TODO:
    });
    builder.addCase(createPostAsync.fulfilled, (state, action) => {
      // TODO:
      state.post = action.payload;
    });
    // builder.addCase(deletePostAsync.pending, (state, action) => {
    //     state.status = "pendingRemovePost" + action.meta.arg
    // })
    // builder.addCase(deletePostAsync.fulfilled, (state, action) => {
    //     // hande fulfilled case
    // })
    builder.addCase(fetchPostAsync.pending, (state, action) => {
      state.status = 'pendingFetchPostAsync';
    });
    builder.addCase(fetchPostAsync.fulfilled, (state, action) => {
      postsAdapter.upsertOne(state, action.payload);
      state.status = 'idle';
    });
    builder.addCase(fetchPostAsync.rejected, (state, action) => {
      console.log(action);
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
      console.log(action);
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
  setMetaData,
  setPost,
  resetPostParams,
  removePost,
} = postSlice.actions;
