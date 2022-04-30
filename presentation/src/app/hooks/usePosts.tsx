import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../store/storeConfig';
import { postSelectors, fetchAllPostAsync} from '../../features/post/postSlice';


export default function usePosts() {
    const posts = useAppSelector(postSelectors.selectAll)
    const {loadingPosts, paginatedData } = useAppSelector(state => state.posts)  
    const dispatch = useAppDispatch()
    
    useEffect(() => {
        if (!loadingPosts) dispatch(fetchAllPostAsync())
    },[loadingPosts, dispatch])

    return {
        posts,
        loadingPosts,
        paginatedData
    }
}
