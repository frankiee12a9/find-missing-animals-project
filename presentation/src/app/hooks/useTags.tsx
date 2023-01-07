import { useEffect, useState } from 'react';
import { fetchAllTags } from '../../features/tag/tagSlice';
import { Tag } from '../models/tag';
import { useAppDispatch, useAppSelector } from './../store/storeConfig';

export interface TagOption {
	value: string;
	label: string;
	isFixed?: boolean;
	isDisabled?: boolean;
}

export default function useTags() {
	const { tags, loadingTags } = useAppSelector((state) => state.tags);
	const dispatch = useAppDispatch();
	const [options, setOptions] = useState<TagOption[]>([]);
	const customTagOptions = [] as TagOption[];

	useEffect(() => {
		dispatch(fetchAllTags())
			.unwrap()
			.then((data: Tag[]) => {
				setOptions(
					[...data].map((aItem) => {
						return {
							value: aItem.id.toString(),
							label: aItem.tagName,
						};
					})
				);
			})
			.catch((err: any) => console.error(err));
	}, [dispatch, loadingTags]);

	return { tags, customTagOptions, options };
}
