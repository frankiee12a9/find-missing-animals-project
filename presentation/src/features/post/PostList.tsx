import { Grid } from '@mui/material';
import React from 'react';
import { bool } from 'yup';
import PostCard from '../../app/layout/PostCard';
import { Post } from '../../app/models/post';
import PostCardSkeleton from './PostCardSkeleton';

interface Props {
  posts: Post[] | [];
  loading: boolean;
}

export default function PostList({ posts, loading }: Props) {
  return (
    <Grid container spacing={3}>
      {posts.map((post) => (
        <Grid item xs={6} key={post.id}>
          {loading ? (
            <PostCardSkeleton />
          ) : (
            <PostCard post={post} img={''} title="Looking for my pets " />
          )}
        </Grid>
      ))}
    </Grid>
  );
}
