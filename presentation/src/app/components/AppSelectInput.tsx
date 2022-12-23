import React, { useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { ActionMeta, OnChangeValue } from 'react-select';
import { useAppDispatch } from '../store/storeConfig';
import { useAppSelector } from './../store/storeConfig';
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

interface Props extends UseControllerProps {
	control?: Control<FieldValues, any>;
}

export default function AppSelectInput(props: Props) {
	const dispatch = useAppDispatch();
	const { fieldState, field } = useController({ ...props, defaultValue: '' });
	const { tags } = useAppSelector((state) => state.tags);
	const { options } = useTags();

	useEffect(() => {}, [dispatch, tags]);

	const handleChange = (
		newValue: OnChangeValue<TagOption, true>,
		actionMeta: ActionMeta<TagOption>
	) => {
		// console.log(newValue);
		field.onChange(newValue);
	};

	return (
		<FormControl
			style={{ paddingBottom: '19px', margin: '2px' }}
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
