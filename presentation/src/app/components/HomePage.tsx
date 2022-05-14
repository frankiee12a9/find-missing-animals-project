import React, { useState, useEffect } from 'react';
import Leftbar from '../layout/Leftbar';
import Feed from '../layout/Feed';
import Rightbar from '../layout/Rightbar';
import usePosts from '../hooks/usePosts';
import { useAppDispatch, useAppSelector } from '../store/storeConfig';
import { fetchAllTags } from '../../features/tags/tagSlice';
import { Tag } from '../models/tag';
import AddPost from '../layout/AddPost';
import { Grid, Stack } from '@mui/material';
import PostCardList from '../../features/post/PostCardList';

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
        {/* {posts.length > 0 && <Feed posts={posts} />} */}
        <PostCardList loading={loading} posts={posts} />
      </Grid>
      <Grid item sm={3}>
        {/* {tags.length > 0 && <Rightbar tags={tags} />} */}
        <Rightbar tags={tags} />
      </Grid>
    </Grid>
  );
}
