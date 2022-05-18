import React, { useState, useEffect } from 'react';
import Rightbar from '../layout/Rightbar';
import usePosts from '../hooks/usePosts';
import { useAppDispatch, useAppSelector } from '../store/storeConfig';
import { fetchAllTags } from '../../features/tags/tagSlice';
import { Tag } from '../models/tag';
import { Grid } from '@mui/material';
import PostCardList from '../../features/post/PostCardList';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { posts, loadingPosts, pagination } = usePosts();

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [posts]);

  return (
    <Grid container>
      <Grid item sm={2} xs={4}></Grid>
      <Grid item sm={7} xs={10}>
        <PostCardList loading={loading} posts={posts} />
      </Grid>
      <Grid item sm={3}>
        <Rightbar />
      </Grid>
    </Grid>
  );
}
