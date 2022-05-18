import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Tag } from '../models/tag';
import {
  Avatar,
  AvatarGroup,
  Box,
  Chip,
  Divider,
  ImageList,
  ImageListItem,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import SearchFilters from '../components/SearchFilters';
import AppDatePicker from '../components/AppDatePicker';
import AddPost from './AddPost';
import { useAppDispatch, useAppSelector } from '../store/storeConfig';
import usePosts from './../hooks/usePosts';
import { fetchAllTags } from '../../features/tags/tagSlice';

export default function Rightbar() {
  const { postQueryParams } = useAppSelector((state) => state.posts);
  const dispatch = useAppDispatch();
  const {} = usePosts();

  const [tags, setTags] = useState<Tag[]>([]);
  useEffect(() => {
    dispatch(fetchAllTags())
      .unwrap()
      .then((data) => {
        setTags(data);
      })
      .catch((err: any) => console.error('fetch tags failed', err));
  }, [dispatch]);

  return (
    <Box flex={2} p={2} sx={{ display: { xs: 'none', sm: 'block' } }}>
      <Box position="fixed" width={300}>
        <Typography variant="h6">Tags</Typography>
        <List
          sx={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper' }}
        >
          <ListItem>
            {tags.map((aTag) => (
              <Chip
                title={`Click to view ${aTag.tagName}'s posts`}
                key={aTag.id}
                component={Link}
                to={`/tags/${aTag.tagName}`}
                label={aTag.tagName}
              />
            ))}
          </ListItem>
        </List>

        <Typography variant="h6">Filters Search</Typography>
        <SearchFilters tags={tags!} />

        <Typography variant="h6">Timestamp Search</Typography>
        <AppDatePicker />

        <AddPost />
      </Box>
    </Box>
  );
}
