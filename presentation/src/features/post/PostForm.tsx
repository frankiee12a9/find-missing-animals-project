import { LoadingButton } from '@mui/lab';
import { Box, Paper, Typography, Grid, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import agent from '../../app/api/agent';
import AppDropzone from '../../app/components/AppDropzone';
import AppTextInput from '../../app/components/AppTextInput';
import { CreatePostDto, Post, PostDto } from '../../app/models/post';
import { useAppDispatch, useAppSelector } from '../../app/store/storeConfig';
// import { setPost } from './postSlice';
// import usePosts from './../../app/hooks/usePosts';
import { validationSchema } from './../../app/utils/postValidationSchema';
import AppSelectInput from '../../app/components/AppSelectInput';
import Postcode from '../../app/utils/Postcode';
import { setPost } from './postSlice';

interface Props {
  post?: Post | undefined;
  cancelEdit: () => void;
}

export default function PostForm({ post, cancelEdit }: Props) {
  // const [postToCreate, setPostToCreate] = useState<CreatePostDto | undefined>(
  //   undefined
  // );
  const dispatch = useAppDispatch();
  const {
    control,
    reset,
    handleSubmit,
    watch,
    formState: { errors, isDirty, isSubmitting },
  } = useForm({
    mode: 'all',
    resolver: yupResolver<any>(validationSchema),
  });

  const watchFiles = watch('files', null);

  useEffect(() => {
    console.log(watchFiles);
    if (post && !watchFiles && !isDirty) reset(post);
    // when component unmount
    return () => {
      if (watchFiles) {
        // Make sure to revoke the data uris to avoid memory leaks
        watchFiles.forEach((aFile: any) => URL.revokeObjectURL(aFile.preview));
      }
    };
  }, [reset, watchFiles, isDirty]);

  async function handleSubmitData(data: FieldValues) {
    console.log('formData', data);
    try {
      let updatePostDto: Post | undefined = undefined;
      let createPostDto: CreatePostDto | undefined = undefined;

      if (post) {
        updatePostDto = await agent.PostStore.updatePost(data);
      } else {
        createPostDto = {
          title: data?.title,
          content: data?.content,
          location: data?.postLocation,
          detailedLocation: data?.postLocation,
          Tag1: data?.tags[0]?.label,
          Tag2: data?.tags[1]?.label,
          Tag3: data?.tags[2]?.label,
          File: data?.files[0],
          File1: data?.files?.[1],
          File2: data?.files?.[2],
        };

        await agent.PostStore.createPost(createPostDto);
      }

      updatePostDto === undefined
        ? dispatch(setPost(createPostDto))
        : dispatch(setPost(updatePostDto));

      // dispatch(setPost(createPostDto));
      cancelEdit();
    } catch (error) {
      console.error(error);
    }
  }

  const submitDataError = (errors: any, event: any) => console.log(errors);

  const renderFilePreview = (files: any[]) => {
    return files.map((aFile) => (
      <Grid key={aFile} item xs={2}>
        <img
          src={aFile.preview}
          style={{ height: '179px', width: '130px' }}
          alt="preview"
        />
      </Grid>
    ));
  };

  return (
    <Box component={Paper} sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Post Details
      </Typography>
      <form onSubmit={handleSubmit(handleSubmitData, submitDataError)}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <AppTextInput control={control} name="title" label="Post Title" />
          </Grid>
          <Grid item xs={12}>
            <AppTextInput
              multiline={true}
              rows={4}
              control={control}
              name="content"
              label="description"
              placeholder="please enter a descriptive description..."
              resize="none"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppSelectInput control={control} name="tags" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Postcode control={control} name="postLocation" />
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
        <Box display="flex" justifyContent="space-between" sx={{ mt: 3 }}>
          <Button onClick={cancelEdit} variant="contained" color="inherit">
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
