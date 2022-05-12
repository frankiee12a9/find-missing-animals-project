import React, { useState, useEffect } from 'react';
import Leftbar from './Leftbar';
import Feed from './Feed';
import Rightbar from './Rightbar';
import usePosts from '../hooks/usePosts';
import { useAppDispatch, useAppSelector } from '../store/storeConfig';
import { fetchAllTags } from '../../features/tags/tagSlice';
import { Tag } from '../models/tag';
import AddPost from './AddPost';
import { Grid, Stack } from '@mui/material';

export default function HomePage() {
  const [tags, setTags] = useState<Tag[]>([]);
  const dispatch = useAppDispatch();

  const { posts, loadingPosts, pagination } = usePosts();

  useEffect(() => {
    dispatch(fetchAllTags())
      .unwrap()
      .then((data) => {
        setTags(data);
      })
      .catch((err: any) => console.error('fetch tags failed', err));
  }, [dispatch]);

  return (
    <Grid container>
      <Grid item sm={2} xs={4}></Grid>
      <Grid item sm={7} xs={10}>
        {posts.length > 0 && <Feed posts={posts} />}
      </Grid>
      <Grid item sm={3}>
        {tags.length > 0 && <Rightbar tags={tags} />}
      </Grid>
      <AddPost />
    </Grid>
  );
}
