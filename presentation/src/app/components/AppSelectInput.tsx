import React, { Component, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { ActionMeta, OnChangeValue } from 'react-select';
import { ColourOption, colourOptions } from '../utils/fake-data';
import { useAppDispatch } from '../store/storeConfig';
import { Tag } from '../models/tag';
import { setPostParams } from '../../features/post/postSlice';

interface Props {
  tags: Tag[];
}

export interface tagFilter {
  readonly id: string;
  readonly tagName: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
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

export default function AppSelectInput({ tags }: Props) {
  // const [tags, setTags] = useState<Tag[]>([]);

  const dispatch = useAppDispatch();
  // const handleChange = (
  //   newValue: OnChangeValue<ColourOption, true>,
  //   actionMeta: ActionMeta<ColourOption>
  // ) => {
  //   console.log(newValue);
  //   // console.log(`action: ${actionMeta.action}`);
  //   dispatch(setPostParams({ tags: newValue }));
  //   console.groupEnd();
  // };

  const handleChange = (
    newValue: OnChangeValue<Tag, true>,
    ActionMeta: ActionMeta<Tag>
  ) => {
    console.log(newValue);
    const tagNames = newValue.filter((value) => value.tagName);
    dispatch(setPostParams({ tags: tagNames }));
  };

  return (
    <CreatableSelect
      isMulti
      onChange={handleChange}
      // options={tags.map((tag) => tag.tagName)}
      options={tags}
    />
  );
}
