import types from '@emotion/styled';
import { Grid, Paper, TextField } from '@mui/material';
import React from 'react';
import ReactSelect from 'react-select';
import AppSelectInput from './AppSelectInput';
import RadioButtonGroup from './RadioButtonGroup';
import { useAppDispatch, useAppSelector } from '../store/storeConfig';
import { setPostParams } from '../../features/post/postSlice';
import { Tag } from '../models/tag';
import { RIGHT_NAV_NAME } from 'app/utils/utils';

const sortOptions = [
	{ value: 'title', label: RIGHT_NAV_NAME.alphabetSort },
	{ value: 'createdAt', label: RIGHT_NAV_NAME.timeSort },
	{ value: 'found', label: RIGHT_NAV_NAME.foundSort },
	{ value: 'notFound', label: RIGHT_NAV_NAME.notFoundYetSort },
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
