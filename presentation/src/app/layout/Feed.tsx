import React, { useEffect, useState } from 'react';
import { Box, Grid, Skeleton, Stack } from '@mui/material';
import PostCard from '../../features/post/PostCard';
import { Post } from '../models/post';
import { Tag } from '../models/tag';
import PostCardList from '../../features/post/PostCardList';

interface Props {
  posts: Post[] | [];
}

export default function Feed({ posts }: Props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('posts', posts);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [posts]);

  return (
    <Grid container columnSpacing={3}>
      {/* <Grid></Grid> */}
      <Grid item xs={12}>
        <PostCardList loading={loading} posts={posts} />
      </Grid>
    </Grid>
  );
}
