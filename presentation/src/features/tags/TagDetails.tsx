import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { Grid } from '@mui/material';

import { useAppDispatch, useAppSelector } from './../../app/store/storeConfig';
import { fetchTagByName } from './tagSlice';
import Rightbar from '../../app/layout/Rightbar';
import PostCard from '../post/PostCard';

export default function TagDetails() {
  const { tag } = useAppSelector((state) => state.tags);
  const dispatch = useAppDispatch();
  const { tagName } = useParams<{ tagName: string }>();

  useEffect(() => {
    console.log(tag);
    dispatch(fetchTagByName(tagName));
    return () => {};
  }, [tagName]);

  return (
    <Grid container columnSpacing={3}>
      <Grid item sm={9} xs="auto">
        <Grid container columnSpacing={2}>
          {tag?.posts?.map((post) => (
            <Grid item xs={6} key={post.id}>
              <PostCard post={post} img={''} title="Looking for my pets " />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item sm={3}>
        <Rightbar />
      </Grid>
    </Grid>
  );
}
