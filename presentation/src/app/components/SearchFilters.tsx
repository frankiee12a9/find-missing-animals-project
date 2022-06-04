import types from '@emotion/styled';
import { Grid, Paper, TextField } from '@mui/material';
import React from 'react';
import ReactSelect from 'react-select';
import AppSelectInput from './AppSelectInput';
import RadioButtonGroup from './RadioButtonGroup';
import { useAppDispatch, useAppSelector } from '../store/storeConfig';
import { setPostParams } from '../../features/post/postSlice';
import { Tag } from '../models/tag';

const sortOptions = [
  { value: 'title', label: 'Alphabetical' },
  { value: 'createdAt', label: 'Timestamp' },
  { value: 'found', label: 'Found' },
  { value: 'notFound', label: 'Not Found Yet' },
];

export default function SearchFilters() {
  const { postQueryParams } = useAppSelector((state) => state.posts);
  const dispatch = useAppDispatch();
  return (
    <Paper sx={{ mb: 2, p: 2 }}>
      <RadioButtonGroup
        selectedValue={postQueryParams?.orderBy!}
        options={sortOptions}
        onChange={(event) =>
          dispatch(setPostParams({ orderBy: event.target.value }))
        }
      />
    </Paper>
  );
}
