import { Grid } from '@mui/material';
import React from 'react';
export default function PostDetails() {
  return (
    <Grid container>
      <Grid item sm={2} xs={4}></Grid>
      <Grid item xs={8} style={{ border: '1px solid' }}>
        Post Details
      </Grid>
    </Grid>
  );
}
