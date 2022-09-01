import { Grid } from '@mui/material';
import usePosts from 'app/hooks/usePosts';
import Rightbar from 'app/layout/Rightbar';
import { PagingParams } from 'app/models/pagination';
import { useAppDispatch } from 'app/store/storeConfig';
import React, { useState, useEffect } from 'react';
import PostCardList from './PostCardList';
import { setPageNumber, fetchAllPostsAsync } from './postSlice';

export default function Posts() {
  const dispatch = useAppDispatch();
  const { posts, loadingPosts, pagination } = usePosts();

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [posts]);

  const [loadingNext, setLoadingNext] = useState(false);
  const handleGetNext = () => {
    console.log('getNext');
    setLoadingNext(true);
    dispatch(setPageNumber(new PagingParams(pagination!.currentPage + 1)));
    // dispatch(setPageNumber(pagination!.currentPage + 1));
    dispatch(fetchAllPostsAsync()).then(() => setLoadingNext(false));
  };

  return (
    <Grid container spacing={2}>
      {/* <Grid item sm={2} xs={4}></Grid> */}
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
