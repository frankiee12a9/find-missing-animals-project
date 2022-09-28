import React, { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Grid, Box, Paper, Typography, Button } from '@mui/material';
import agent from 'app/api/agent';
import AppDropzone from 'app/components/AppDropzone';
import AppTextInput from 'app/components/AppTextInput';
import { useAppDispatch, useAppSelector } from 'app/store/storeConfig';
import Postcode from 'app/utils/Postcode';
import { editPostValidationSchema } from 'app/utils/postValidationSchema';
import { useForm, FieldValues } from 'react-hook-form';
import { fetchPostAsync, postSelectors } from './postSlice';
import { useHistory, useParams } from 'react-router';
import { toast } from 'react-toastify';

export default function PostFormEdit() {
  const dispatch = useAppDispatch();

  const { id } = useParams<{ id: string }>();

  const {
    control,
    reset,
    handleSubmit,
    watch,
    formState: { errors, isDirty, isSubmitting },
  } = useForm({
    mode: 'all',
    resolver: yupResolver<any>(editPostValidationSchema),
  });

  const watchFiles = watch('photos', null);

  const currentPost = useAppSelector((state) =>
    postSelectors.selectById(state, id)
  );

  const cancelEdit = () => history.push(`/posts/${currentPost!.id}`);

  useEffect(() => {
    if (!currentPost) {
      dispatch(fetchPostAsync(id));
    }
  }, [dispatch, id, currentPost]);

  useEffect(() => {
    if (currentPost && !watchFiles && !isDirty) reset(currentPost);
    // when component unmount
    return () => {
      if (watchFiles) {
        // Make sure to revoke the data uris to avoid memory leaks
        watchFiles.forEach((aFile: any) => URL.revokeObjectURL(aFile.preview));
      }
    };
  }, [reset, watchFiles, isDirty]);

  const history = useHistory();

  async function handleSubmitData(data: FieldValues) {
    try {
      const editPostDto = {
        id: id,
        title: data?.title,
        content: data?.content,
        location: data?.location,
        detailedLocation: data?.detailedLocation,
        File: data?.photos?.[0],
        File1: data?.photos?.[1],
        File2: data?.photos?.[2],
      };

      await agent.PostStore.updatePost(editPostDto).then(() => {
        history.push(`/posts/${id}`);
        toast.done('Post updated successfully');
      });
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
          src={aFile.preview ? aFile.preview : aFile.url}
          // src={aFile.url}
          style={{ height: '179px', width: '130px' }}
          alt="preview"
        />
      </Grid>
    ));
  };

  useEffect(() => {
    console.log('currentPost', currentPost);
  }, [currentPost]);

  return (
    <Box component={Paper} sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Edit Post Details
      </Typography>
      <form onSubmit={handleSubmit(handleSubmitData, submitDataError)}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <AppTextInput
              control={control}
              defaultValue={currentPost?.title}
              name="title"
              label="Post Title"
            />
          </Grid>
          <Grid item xs={12}>
            <AppTextInput
              multiline={true}
              defaultValue={currentPost?.content}
              rows={5}
              control={control}
              name="content"
              label="description"
              placeholder="please enter a descriptive description..."
              resize="yes"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Postcode
              defaultValue={currentPost?.postLocation.location}
              control={control}
              name="location"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput
              defaultValue={currentPost?.postLocation.detailedLocation}
              control={control}
              name="detailedLocation"
              label="Detailed location"
            />
          </Grid>
          <Grid container item xs={12} spacing={9}>
            <Grid item xs={6}>
              <AppDropzone control={control} name="photos" />
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
