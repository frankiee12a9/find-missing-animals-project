import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../store/storeConfig';
import {
  postSelectors,
  fetchAllPostsAsync,
} from '../../features/post/postSlice';

export default function usePosts() {
  const posts = useAppSelector(postSelectors.selectAll);
  const { loadingPosts, tags, pagination } = useAppSelector(
    (state) => state.posts
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!loadingPosts) dispatch(fetchAllPostsAsync());
  }, [loadingPosts, dispatch]);

  return {
    posts,
    tags,
    loadingPosts,
    pagination,
  };
}
