import types from '@emotion/styled';
import { Grid, Paper, TextField } from '@mui/material';
import React from 'react';
import ReactSelect from 'react-select';
import AppSelectInput from './AppSelectInput';
import RadioButtonGroup from './RadioButtonGroup';
import { useAppDispatch, useAppSelector } from '../store/storeConfig';
import { setPostParams } from '../../features/post/postSlice';
import { Tag } from '../models/tag';
import { tagSlice } from './../../features/tags/tagSlice';

const sortOptions = [
  { value: 'title', label: 'Alphabetical' },
  { value: 'CreatedAt', label: 'Timestamp' },
  { value: 'isFound', label: 'Found' },
  { value: 'notFound', label: 'Not Found Yet' },
];

interface Props {
  tags: Tag[];
}

export default function SearchFilters({ tags }: Props) {
  const { postQueryParams } = useAppSelector((state) => state.posts);
  const dispatch = useAppDispatch();

  return (
    <>
      <Paper sx={{ mb: 2 }}>
        <AppSelectInput tags={tags} />
      </Paper>
      <Paper sx={{ mb: 2, p: 2 }}>
        <RadioButtonGroup
          selectedValue={postQueryParams?.orderBy!}
          options={sortOptions}
          onChange={(event) =>
            dispatch(setPostParams({ orderBy: event.target.value }))
          }
        />
      </Paper>
      {/* <Paper sx={{ mb: 2, p: 2 }}>
        <CheckboxButtons
          items={brands}
          checked={productParams.brands}
          onChange={(items: string[]) =>
            dispatch(setProductParams({ brands: items }))
          }
        />
      </Paper> */}
      {/* <Paper sx={{ mb: 2, p: 2 }}>
        <CheckboxButtons
          items={types}
          checked={productParams.types}
          onChange={(items: string[]) =>
            dispatch(setProductParams({ types: items }))
          }
        />
      </Paper> */}
    </>
  );
}
