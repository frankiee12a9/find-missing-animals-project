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
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import SearchFilters from '../components/SearchFilters';
import AppDatePicker from '../components/AppDatePicker';
import AddPost from './AddPost';
import { useAppDispatch, useAppSelector } from '../store/storeConfig';
import { fetchAllTags } from '../../features/tags/tagSlice';

export default function Rightbar() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  // const { postQueryParams } = useAppSelector((state) => state.posts);

  const [tags, setTags] = useState<Tag[]>([]);
  useEffect(() => {
    dispatch(fetchAllTags())
      .unwrap()
      .then((data: Tag[]) => {
        setTags(data);
      })
      .catch((err: any) => console.error(err));
  }, [dispatch]);

  return (
    <Box flex={2} p={2} sx={{ display: { xs: 'none', sm: 'block' } }}>
      <Box
        // position="fixed"
        width={300}
      >
        <Typography variant="h6">Tags</Typography>
        <Paper style={{ maxWidth: 300 }} sx={{ mb: 2, p: 2 }}>
          <Stack
            divider={<Divider orientation="vertical" flexItem />}
            // maxWidth={200}
            style={{ width: '100%' }}
            direction="row"
            spacing={1}
          >
            {tags.map((aTag) => (
              <Chip
                href="#"
                aria-label="clickable"
                title={`Click to view ${aTag.tagName}'s posts`}
                key={aTag.id}
                component={Link}
                to={`/tags/${aTag.tagName}`}
                label={aTag.tagName}
              />
            ))}
          </Stack>
        </Paper>
        <br />
        <Typography variant="h6">Filters Search</Typography>
        <SearchFilters />
        <Typography variant="h6">Timestamp Search</Typography>
        <AppDatePicker />
        {user?.token && <AddPost />}
      </Box>
    </Box>
  );
}
