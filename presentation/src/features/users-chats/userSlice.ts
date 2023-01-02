import agent from '../../app/api/agent';
import { RootState } from '../../app/store/storeConfig';
import { createAsyncThunk, createEntityAdapter, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { User, UserProfileDto, UserQueryParams } from '../../app/models/user';
import { userAxiosParams } from 'app/utils/axios';
import { Pagination } from 'app/models/pagination';


interface UserState {
    user: User | null
    userList: User[] | []
    loadingUsers: boolean
    status: string;
}

const initialState = {
    user: null,
    userList: [],
    status: 'idle',
    loadingUsers: false,
} as UserState;

export const fetchUserByNameAsync = createAsyncThunk(
    'user/fetchUserByNameStatus',
    async (userName: string, thunkAPI) => {
        try {
            const result = await agent.UserStore.getUser(userName);
            return result;
        } catch (err: any) {
            return thunkAPI.rejectWithValue({ error: err.data });
        }
    }
);

/**
 */
export const fetchUserListAsync = createAsyncThunk<
    UserProfileDto[],
    void,
    { state: RootState }
>('user/fetchUserListAsync', async (_, thunkAPI) => {
    const params = userAxiosParams(thunkAPI.getState().users.userQueryParams!);
    try {
        const result = await agent.UserStore.getUserList(params);
        // thunkAPI.dispatch(setPagination(result.pagination));
        return result.items;
    } catch (err: any) {
        return thunkAPI.rejectWithValue({ error: err.data });
    }
});

const initParams = () => {
    return {
        pageNumber: 1,
        pageSize: 15,
        orderBy: '',
        searchText: '',
        userName: '',
        displayName: ''
    };
};

const usersAdapter = createEntityAdapter<UserProfileDto>({
    selectId: (userProfile) => userProfile.username,
    sortComparer: (userX, userY) => userX.displayName.localeCompare(userY.displayName)
});

interface UserState {
    currentUser: UserProfileDto | null
    status: string
    loadingUsers: boolean
    userQueryParams: UserQueryParams | null;
    pagination: Pagination | null;
}

export const userSlice = createSlice({
    name: 'users',
    initialState: usersAdapter.getInitialState<UserState>({
        currentUser: null,
        loadingUsers: false,
        userList: [],
        status: 'idle',
        userQueryParams: initParams(),
        pagination: null,
        user: null
    }),
    reducers: {
        setUserParams: (state: any, action: any) => {
            state.loadingUsers = false;
            state.userQueryParams = {
                ...state.postQueryParams,
                ...action.payload,
                pageNumber: 1,
            };
            console.log('postParams', state.postQueryParams);
        },
        setPageNumber: (state: any, action: any) => {
            state.loadingPosts = false;
            console.log('action.payload', action.payload);
            state.postQueryParams = { ...state.postQueryParams, ...action.payload };
        },
        setPagination: (state: any, action: any) => {
            state.pagination = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserByNameAsync.pending, (state, action) => {
            state.status = 'fetchUserByNameAsync';
        });
        builder.addCase(fetchUserByNameAsync.fulfilled, (state, action) => {
            usersAdapter.upsertOne(state, action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchUserByNameAsync.rejected, (state, action) => {
            state.status = 'idle';
        });
        builder.addCase(fetchUserListAsync.pending, (state, action) => {
            state.status = 'pendingFetchUserListAsync';
        });
        builder.addCase(fetchUserListAsync.fulfilled, (state, action) => {
            console.log('fetchUserListAsync', action.payload)
            usersAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.loadingUsers = true;
        });
        builder.addCase(fetchUserListAsync.rejected, (state, action) => { state.status = 'idle'; });
    },
});

export const userSelectors = usersAdapter.getSelectors(
    (state: RootState) => state.users
);

export const {
    setPagination,
    setUserParams,
    setPageNumber,
} = userSlice.actions;