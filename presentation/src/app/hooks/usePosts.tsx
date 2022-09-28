import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../store/storeConfig';
import {
  postSelectors,
  fetchAllPostsAsync,
} from '../../features/post/postSlice';

export default function usePosts() {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(postSelectors.selectAll);
  const { loadingPosts, tags, pagination } = useAppSelector(
    (state) => state.posts
  );

  useEffect(() => {
    dispatch(fetchAllPostsAsync());
  }, [loadingPosts, dispatch]);

  return {
    posts,
    tags,
    loadingPosts,
    pagination,
  };
}
