import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../store/storeConfig';
import {
    fetchUserListAsync, userSelectors
} from '../../features/users-chats/userSlice';

export default function usePosts() {
    const dispatch = useAppDispatch();
    const users = useAppSelector(userSelectors.selectAll);
    const { loadingUsers, pagination } = useAppSelector(
        (state) => state.users
    );

    useEffect(() => {
        dispatch(fetchUserListAsync());
    }, [loadingUsers, dispatch]);

    return {
        users,
        loadingUsers,
        pagination,
    };
}