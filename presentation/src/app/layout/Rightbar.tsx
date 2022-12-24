import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Tag } from '../models/tag';
import { Box, Chip, Paper, Stack, styled, Typography } from '@mui/material';
import SearchFilters from '../components/SearchFilters';
import AppDatePicker from '../components/AppDatePicker';
import { useAppDispatch, useAppSelector } from '../store/storeConfig';
import { fetchAllTags } from '../../features/tag/tagSlice';
import AppChipIcon from 'app/components/AppChipIcon';
import { RIGHT_NAV_NAME } from 'app/utils/utils';

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
				<Typography variant="h6">
					{/* Tags */}
					{RIGHT_NAV_NAME.tags}
				</Typography>
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
				<Typography variant="h6">
					{/* Filters Search */}
					{RIGHT_NAV_NAME.filterSearch}
				</Typography>
				<SearchFilters />
				<Typography variant="h6">
					{/* Timestamp Search */}
					{RIGHT_NAV_NAME.timeStampSearch}
				</Typography>
				<AppDatePicker />
			</Box>
		</Box>
	);
}
