import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Tag } from '../models/tag';
import { Box, Chip, Paper, Stack, styled, Typography } from '@mui/material';
import SearchFilters from '../components/SearchFilters';
import AppDatePicker from '../components/AppDatePicker';
import AddPost from './AddPost';
import { useAppDispatch, useAppSelector } from '../store/storeConfig';
import { fetchAllTags } from '../../features/tags/tagSlice';
import AppChipIcon from 'app/components/AppChipIcon';

export default function Rightbar() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const [tags, setTags] = useState<Tag[]>([]);
  useEffect(() => {
    dispatch(fetchAllTags())
      .unwrap()
      .then((data: Tag[]) => {
        setTags(data);
      })
      .catch((err: any) => console.error(err));
  }, [dispatch]);

  const handleDelete = (tagToDelete: Tag) => () => {
    setTags((tags) => tags.filter((tag) => tag.id !== tagToDelete.id));
  };

  return (
    <Box
      flex={2}
      p={2}
      style={{ marginTop: '-19px', marginLeft: '13px' }}
      sx={{ display: { xs: 'none', sm: 'block' } }}
    >
      <Box width={300}>
        <Typography variant="h6">Tags</Typography>
        <Paper
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            listStyle: 'none',
            p: 0.5,
            m: 0,
          }}
          component="ul"
        >
          {tags.map((data) => (
            <AppChipIcon
              data={data}
              handleDelete={handleDelete}
              key={data.id}
            />
          ))}
        </Paper>
        <br />
        <Typography variant="h6">Filters Search</Typography>
        <SearchFilters />
        <Typography variant="h6">Timestamp Search</Typography>
        <AppDatePicker />
      </Box>
    </Box>
  );
}
