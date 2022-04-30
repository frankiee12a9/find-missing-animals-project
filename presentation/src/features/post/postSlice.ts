import { createAsyncThunk, createEntityAdapter, createSlice, isAnyOf } from "@reduxjs/toolkit";
import agent from "../../app/api/agent"
import {Post, CreatePostDto, UpdatePostDto, PostQueryParams} from "../../app/models/post"
import { PaginatedData } from '../../app/models/pagination';
import {RootState} from "../../app/store/storeConfig"


// TODO:
interface PostState {
    post: Post | null 
    status: string 
    loadingPosts: boolean
    loadingTags: boolean
    postQueryParams: PostQueryParams | null
    paginatedData: PaginatedData | null 
}

const initialState = {
    post: null,
    status: "idle",
    loadingPosts: false
} as PostState 

// Note: take care of this
const postsAdapter = createEntityAdapter<Post>()

// TODO: 
const getAxiosParams = (postQueryParams: any) => {
    const params = new URLSearchParams()
    // config post query params here 
    return params
}

export const fetchAllPostAsync = createAsyncThunk(
    "post/fetchPostAsync",
    async (_, thunkAPI) => {
        try {
            return await agent.Post.getAllPosts()
        } catch (err: any) {
            return thunkAPI.rejectWithValue({error: err.data})
        }
    },
    // {
    //     condition: () => {
    //         // Note: consider this 
    //         // if (!getCookie(""))
    //     } 
    // }
)

export const fetchAPostAsync = createAsyncThunk(
    "post/fetchAPostAsync",
    async (postId: string, thunkAPI) => {
        try {
            return agent.Post.getAPost(postId)
        } catch (err: any) {
            return thunkAPI.rejectWithValue({error: err.data})
        } 
    }
)

export const createPostAsync = createAsyncThunk(
    "post/createPostAsync",
    async (createPostDto: CreatePostDto, thunkAPI) => {
        try {
            return await agent.Post.createAPost(createPostDto)
        } catch (err: any) {
            return thunkAPI.rejectWithValue({error: err.data})
        } 
    }
)

export const updatePostAsync = createAsyncThunk(
    "post/updatePostAsync",
    async (updatePostDto: UpdatePostDto, thunkAPI) => {
        try {
            return await agent.Post.updateAPost(updatePostDto)
        } catch (err: any) {
            return thunkAPI.rejectWithValue({error: err.data})
        }
    }
)

export const deletePostAsync = createAsyncThunk(
    "post/deletePostAsync",
    async (postId: string, thunkAPI) => {
        try {
            return await agent.Post.deleteAPost(postId)
        } catch (err: any) {
            return thunkAPI.rejectWithValue({error: err.data})
        }
    }
)

const pagingInitParams = () => {
    return {
        pageStartNumber: 1, 
        pageMaxSize: 6, 
        isPoster: false,
        roadLocation: "",
        detailedLocation: "",
        location: "", 
        paginatedData: null,
        tag1: "",
        tag2: "",
        tag3: "" ,
        tag4: "", 
        tag5: "" 
    }
}

export const postSlice = createSlice({
    name: "posts",
    initialState: postsAdapter.getInitialState<PostState>({
        post: null,
        loadingPosts: false, // pending for loading posts 
        loadingTags: false, // pending for loading tags
        status: "idle",
        postQueryParams: pagingInitParams(),
        paginatedData: null
    }),
    reducers: {
        // significant reducers 
        setPostParams: (state, action) => {
            state.loadingPosts = false
            state.postQueryParams = {...state.postQueryParams, ...action.payload, pageStartNumber: 1 } 
        },
        setPageSize: (state, action) => {
            state.loadingPosts = false
            state.postQueryParams = {...state.postQueryParams, ...action.payload}
        },
        setPaginatedData: (state, action) => {
            state.paginatedData = action.payload   
        },
        setPost: (state, action) => {
            postsAdapter.upsertOne(state, action.payload)
            state.loadingPosts = false
        },
        resetPostParams: (state, action) => {
            state.postQueryParams = pagingInitParams()
        },
        removePost: (state, action) => {
            postsAdapter.removeOne(state, action.payload)
            state.loadingPosts = false
        }
    },
    extraReducers: (builder => {
        builder.addCase(createPostAsync.pending, (state, action) => {
            state.status = "pendingCreatePost" + action.meta.arg.post
        })
        builder.addCase(createPostAsync.rejected, (state, action) => {
            // TODO:
        })
        builder.addCase(createPostAsync.fulfilled, (state, action) => {
            // TODO:
            state.post = action.payload
        })
        // builder.addCase(deletePostAsync.pending, (state, action) => {
        //     state.status = "pendingRemovePost" + action.meta.arg
        // }) 
        // builder.addCase(deletePostAsync.fulfilled, (state, action) => {
        //     // hande fulfilled case
        // })
        builder.addCase(fetchAPostAsync.pending, (state, action) => {
            state.status = "pendingFetchAPostAsync"   
        }) 
        builder.addCase(fetchAPostAsync.rejected, (state, action) => {
            console.log(action)
            state.status = "idle"
        })
        builder.addCase(fetchAPostAsync.fulfilled, (state, action) => {
            postsAdapter.upsertOne(state, action.payload)
            state.status = "idle"
        })
        builder.addCase(fetchAllPostAsync.pending, (state, action) => {
            state.status = "pendingFetchAllPostsAsync"
        })
        builder.addCase(fetchAllPostAsync.rejected, (state, action) => {
            console.log(action)
            state.status = "idle"
        })
        builder.addCase(fetchAllPostAsync.fulfilled, (state, action) => {
            postsAdapter.upsertOne(state, action.payload)
        })
    })
})

export const postSelectors = postsAdapter.getSelectors((state: RootState) => state.posts)
export const { setPostParams, setPageSize, setPaginatedData, setPost,
    resetPostParams, removePost } = postSlice.actions