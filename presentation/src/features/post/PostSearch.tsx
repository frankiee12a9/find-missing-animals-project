import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store/storeConfig';
import { useDispatch } from 'react-redux';
import { debounce, TextField } from '@mui/material';
import { setPostParams } from './postSlice';

export default function PostSearch() {
  const { postQueryParams } = useAppSelector((state) => state.posts);
  const [searchText, setSearchText] = useState(postQueryParams?.searchText);
  const dispatch = useAppDispatch();

  const debouncedSearch = debounce((event: any) => {
    dispatch(setPostParams({ searchText: event.target.value }));
  });

  return (
    <TextField
      label="Search Posts"
      variant="outlined"
      fullWidth
      value={searchText || ''}
      onChange={(event: any) => {
        setSearchText(event.target.value);
        debouncedSearch(event);
      }}
    />
  );
}
