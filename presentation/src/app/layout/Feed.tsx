import React, { useEffect, useState } from 'react';
import { Container, makeStyles } from '@material-ui/core';
import { Box, Skeleton, Stack } from '@mui/material';
// import AddPost from './AddPost';
import PostCard from './PostCard';
import { Post } from '../models/post';
import { Tag } from '../models/tag';

const useStyles = makeStyles((theme) => ({
  container: { paddingTop: theme.spacing(10) },
}));

interface Props {
  posts: Post[] | [];
}

export default function Feed({ posts }: Props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('posts', posts);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [posts]);

  return (
    <Box flex={4} p={{ xs: 0, md: 2 }}>
      {loading ? (
        <Stack spacing={1}>
          <Skeleton variant="text" height={100} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="rectangular" height={300} />
        </Stack>
      ) : (
        <>
          {posts.length > 0 &&
            posts.map((aPost: Post) => (
              <PostCard
                key={aPost.id}
                title="Looking for my cat"
                img="https://images.ctfassets.net/440y9b545yd9/6TlvhhsHD1nGTi0X6h5PuQ/255303775853beb51f6ac79cea782790/ExoticShorthairTop10Cat850.jpg"
                post={aPost}
              />
            ))}
        </>
      )}
    </Box>
  );
}
