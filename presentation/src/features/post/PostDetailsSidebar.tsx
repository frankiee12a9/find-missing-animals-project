import { ViewDay } from '@mui/icons-material';
import {
  Box,
  Typography,
  ImageList,
  ImageListItem,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
} from '@mui/material';
import React, { SyntheticEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Photo } from '../../app/models/photo';
import { LastViewedPost } from '../../app/models/post';
import { useAppSelector } from '../../app/store/storeConfig';
import ViewedPostList from './ViewedPostList';
import { uniqueViewPostsByKey } from './../../app/utils/utils';

// interface Props {
//   postPhotos: Photo[] | undefined;
//   onChangePhoto(e: SyntheticEvent, photoIndex: number): void  void;
// }

export default function PostDetailsSidebar() {
  const { lastViewPosts } = useAppSelector((state) => state.posts);
  const _lastViewedPosts = Array.from(
    JSON.parse(window.localStorage.getItem('lastViewedPosts') || '[]')
  );

  const uniqueLastViewedPosts = uniqueViewPostsByKey(
    'id',
    _lastViewedPosts as LastViewedPost[]
  );

  useEffect(() => {
    // console.log(_lastViewedPosts);
  }, []);

  return (
    <Box flex={2} p={2} sx={{ display: { xs: 'none', sm: 'block' } }}>
      <Box position="fixed" style={{ width: 350, marginTop: '-19px' }}>
        <Typography variant="h6" fontWeight={100} mt={2}>
          Latest viewed posts
        </Typography>
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        >
          <ViewedPostList viewedPosts={uniqueLastViewedPosts} />
        </List>
      </Box>
    </Box>
  );
}
