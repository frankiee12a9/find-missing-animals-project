import React, { Component, useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { ActionMeta, OnChangeValue } from 'react-select';
import { ColourOption, colourOptions } from '../utils/fake-data';
import { useAppDispatch } from '../store/storeConfig';
import { Tag } from '../models/tag';
import { setPostParams } from '../../features/post/postSlice';
import { useAppSelector } from './../store/storeConfig';
import { fetchAllTags } from '../../features/tags/tagSlice';
import useTags from '../hooks/useTags';
import {
  Control,
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import { FormControl, FormHelperText } from '@mui/material';

export interface TagOption {
  value: string;
  label: string;
  isFixed?: boolean;
  isDisabled?: boolean;
}

export const _colourOptions: readonly ColourOption[] = [
  { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
  { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
  { value: 'purple', label: 'Purple', color: '#5243AA' },
  { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
  { value: 'orange', label: 'Orange', color: '#FF8B00' },
  { value: 'yellow', label: 'Yellow', color: '#FFC400' },
  { value: 'green', label: 'Green', color: '#36B37E' },
  { value: 'forest', label: 'Forest', color: '#00875A' },
  { value: 'slate', label: 'Slate', color: '#253858' },
  { value: 'silver', label: 'Silver', color: '#666666' },
];

interface Props extends UseControllerProps {
  // handleGetPostLocation: (postLocationData: string) => void;
  control?: Control<FieldValues, any>;
}

export default function AppSelectInput(props: Props) {
  const dispatch = useAppDispatch();
  const { fieldState, field } = useController({ ...props, defaultValue: '' });
  const { tags } = useAppSelector((state) => state.tags);
  const { options } = useTags();

  useEffect(() => {
    // console.log(tags);
    // console.log(customTagOptions);
    // console.log(options);
  }, [dispatch, tags]);

  const handleChange = (
    newValue: OnChangeValue<TagOption, true>,
    actionMeta: ActionMeta<TagOption>
  ) => {
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    field.onChange(newValue);
  };

  return (
    <FormControl
      // style={{ padding: '10px' }}
      fullWidth
      error={!!fieldState.error}
    >
      <CreatableSelect
        name={props.name}
        isMulti
        onChange={handleChange}
        options={options}
      ></CreatableSelect>
      <FormHelperText>{fieldState.error?.message}</FormHelperText>
    </FormControl>
  );
}
