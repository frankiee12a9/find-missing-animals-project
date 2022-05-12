import types from '@emotion/styled';
import { Grid, Paper, TextField } from '@mui/material';
import React from 'react';
import ReactSelect from 'react-select';
import AppSelectInput from '../components/AppSelectInput';
import RadioButtonGroup from '../components/RadioButtonGroup';
import { useAppDispatch } from '../store/storeConfig';

const sortOptions = [
  { value: 'name', label: 'Alphabetical' },
  { value: 'Timestamp', label: 'Posted date' },
  // { value: 'price', label: 'Price - Low to high' },
];

export default function SearchFilters() {
  const dispatch = useAppDispatch();

  const onChange = () => {};
  return (
    <>
      <Paper sx={{ mb: 2 }}>{/* <ProductSearch /> */}</Paper>
      <Paper sx={{ mb: 2 }}>
        <AppSelectInput />
      </Paper>
      <Paper sx={{ mb: 2, p: 2 }}>
        <RadioButtonGroup
          selectedValue={'Selected value'}
          options={sortOptions}
          onChange={(e) => onChange}
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
