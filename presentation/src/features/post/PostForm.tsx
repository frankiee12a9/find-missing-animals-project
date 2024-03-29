import { LoadingButton } from '@mui/lab';
import { Box, Paper, Typography, Grid, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { v4 as uuid } from 'uuid';
import { useHistory, useParams } from 'react-router';
import { toast } from 'react-toastify';

import agent from '../../app/api/agent';
import AppDropzone from '../../app/components/AppDropzone';
import AppTextInput from '../../app/components/AppTextInput';
import { CreatePostDto, Post, PostDto } from '../../app/models/post';
import { useAppDispatch, useAppSelector } from '../../app/store/storeConfig';
import { createPostValidationSchema } from './../../app/utils/postValidationSchema';
import AppSelectInput from '../../app/components/AppSelectInput';
import Postcode from '../../app/utils/Postcode';
import { fetchPostAsync, setPost } from './postSlice';
import { MID_NAV_NAME } from 'app/utils/utils';

interface Props {
	post?: Post | undefined;
	// cancelEdit: () => void;
}

export default function PostForm({ post }: Props) {
	const dispatch = useAppDispatch();
	const {
		control,
		reset,
		handleSubmit,
		watch,
		formState: { errors, isDirty, isSubmitting },
	} = useForm({
		mode: 'all',
		resolver: yupResolver<any>(createPostValidationSchema),
	});
	const { user } = useAppSelector((state) => state.auth);
	const watchFiles = watch('files', null);
	const history = useHistory();

	useEffect(() => {
		if (post && !watchFiles && !isDirty) reset(post);
		// when component unmount
		return () => {
			if (watchFiles) {
				// Make sure to revoke the data uris to avoid memory leaks
				watchFiles.forEach((aFile: any) =>
					URL.revokeObjectURL(aFile.preview)
				);
			}
		};
	}, [reset, watchFiles, isDirty]);

	const cancelEdit = () => history.push(`/posts`);

	async function handleSubmitData(data: FieldValues) {
		try {
			const createPostDto = {
				id: uuid(),
				title: data?.title,
				content: data?.content,
				location: data?.location,
				detailedLocation: data?.detailedLocation,
				Tag1: data?.tags[0]?.label,
				Tag2: data?.tags[1]?.label,
				Tag3: data?.tags[2]?.label,
				File: data?.files[0],
				File1: data?.files?.[1],
				File2: data?.files?.[2],
			} as CreatePostDto;

			await agent.PostStore.createPost(createPostDto).then(() => {
				history.push(`/posts/${createPostDto.id}`);
				// toast.success('Post has been created successfully');
				toast.success(MID_NAV_NAME.createdPostStatusOK);
			});

			const postDto = {
				id: createPostDto.id,
				title: createPostDto.title,
				content: createPostDto.content,
				photos: [
					createPostDto.File,
					createPostDto.File1,
					createPostDto.File2,
				].filter((data) => data),
				posterName: user?.username,
				postLocation: {
					location: createPostDto.location,
					detailedLocation: createPostDto.detailedLocation,
				},
			} as Post;

			dispatch(setPost(postDto));
			console.log('postDto', postDto);
		} catch (error) {
			console.error(error);
		}
	}

	const submitDataError = (errors: any, event: any) =>
		console.error('Errors:', errors);

	const renderFilePreview = (files: any[]) => {
		return files.map((aFile) => (
			<Grid key={aFile} item xs={2}>
				<img
					src={aFile.preview}
					style={{ height: '179px', width: '154px' }}
					alt="preview"
				/>
			</Grid>
		));
	};

	return (
		<Box component={Paper} sx={{ p: 4 }}>
			<Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
				{/* Post Details */}
				{MID_NAV_NAME.createPostTitle}
			</Typography>
			<form onSubmit={handleSubmit(handleSubmitData, submitDataError)}>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={12}>
						<AppTextInput
							control={control}
							name="title"
							label="글 제목 입력입니다"
						/>
					</Grid>
					<Grid item xs={12}>
						<AppTextInput
							multiline={true}
							rows={4}
							control={control}
							name="content"
							// label="description"
							label="글에 대한 상세한 설명 입력입니다"
							placeholder="please enter a descriptive description..."
							resize="none"
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Postcode control={control} name="location" />
					</Grid>
					<Grid item xs={12} sm={6}>
						<AppTextInput
							control={control}
							name="detailedLocation"
							label="상세 주소 입력입니다"
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<AppSelectInput control={control} name="tags" />
					</Grid>
					<Grid container item xs={12} spacing={9}>
						<Grid item xs={6}>
							<AppDropzone control={control} name="files" />
						</Grid>
						{watchFiles?.length > 0 ? (
							renderFilePreview(watchFiles)
						) : (
							<Grid></Grid>
						)}
					</Grid>
				</Grid>
				<Box
					display="flex"
					justifyContent="space-between"
					sx={{ mt: 3 }}
				>
					<Button
						onClick={cancelEdit}
						variant="contained"
						color="inherit"
					>
						Cancel
					</Button>
					<LoadingButton
						loading={isSubmitting}
						type="submit"
						variant="contained"
						color="success"
					>
						Submit
					</LoadingButton>
				</Box>
			</form>
		</Box>
	);
}
