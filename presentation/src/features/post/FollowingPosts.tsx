import { Box, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import Rightbar from '../../app/layout/Rightbar';
import { useAppDispatch, useAppSelector } from '../../app/store/storeConfig';
import PostCardList from './PostCardList';
import { fetchFollowingPostsAsync, postSelectors } from './postSlice';

export default function FollowingPosts() {
  const { postQueryParams } = useAppSelector((state) => state.posts);
  const posts = useAppSelector(postSelectors.selectAll);
  const { loadingPosts, pagination } = useAppSelector((state) => state.posts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // !loadingPosts &&
    dispatch(fetchFollowingPostsAsync());
  }, [loadingPosts, dispatch]);

  return (
    <Grid container columnSpacing={4}>
      <Grid item sm={9} xs={10}>
        {/* Note: working on Infinite Scrolling for posts */}
        {/* <InfiniteScroll
          pageStart={0}
          loadMore={handleGetNext}
          hasMore={
            !loadingNext &&
            !!pagination &&
            pagination?.currentPage < pagination?.totalpages
          }
          initialLoad={false}
        >
          <PostCardList loading={loading} posts={posts} />
        </InfiniteScroll> */}
        <PostCardList posts={posts} />
      </Grid>
      <Grid item sm={3}>
        <Rightbar />
      </Grid>
    </Grid>
  );
}
