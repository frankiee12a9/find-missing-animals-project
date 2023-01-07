import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { postSlice } from '../../features/post/postSlice';
import { tagSlice } from '../../features/tag/tagSlice';
import { authSlice } from '../../features/auth/authSlice';
import { userSlice } from 'features/users-chats/userSlice';

export const store = configureStore({
    reducer: {
        posts: postSlice.reducer,
        tags: tagSlice.reducer,
        auth: authSlice.reducer,
        users: userSlice.reducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
