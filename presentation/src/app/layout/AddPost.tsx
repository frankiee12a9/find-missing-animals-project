import {
  Add,
  DateRange,
  Edit,
  EmojiEmotions,
  Image,
  PersonAdd,
  VideoCameraBack,
  DoneOutline,
} from '@mui/icons-material';
import { SyntheticEvent, useEffect, useState } from 'react';
import Postcode from '../utils/Postcode';
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Container,
  ExtendModalUnstyled,
  Fab,
  Grid,
  Modal,
  ModalTypeMap,
  Snackbar,
  Stack,
  styled,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/storeConfig';
import AppSelectInput from '../components/AppSelectInput';
import AppDropzone from '../components/AppDropzone';
import { yupResolver } from '@hookform/resolvers/yup';
import { FieldValues, useForm } from 'react-hook-form';
import { validationSchema } from '../utils/postValidationSchema';
import { setPost } from '../../features/post/postSlice';
import agent from '../api/agent';
import { Post } from '../models/post';
import { CreatePostDto } from './../models/post';
import { LoadingButton } from '@mui/lab';
import AppTextInput from '../components/AppTextInput';
import { Link } from 'react-router-dom';
import { PostLocation } from './../models/postLocation';

const StyledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const UserBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  marginBottom: '20px',
});

interface Props {
  createPostDto: Post;
}

export default function AddPost() {
  const [postToCreate, setPostToCreate] = useState<CreatePostDto | undefined>(
    undefined
  );
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const {
    control,
    reset,
    handleSubmit,
    watch,
    formState: { isDirty, isSubmitting },
  } = useForm({
    mode: 'all',
    resolver: yupResolver<any>(validationSchema),
  });

  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const handleClose = (event: SyntheticEvent, reason: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  const [openFileUpload, setOpenFileUpload] = useState(false);

  const watchFile = watch('file', null);

  useEffect(() => {
    if (postToCreate && !watchFile && !isDirty) reset(postToCreate);
    return () => {
      if (watchFile) URL.revokeObjectURL(watchFile.preview);
    };
  }, [reset, watchFile, isDirty]);

  async function handleSubmitData(data: FieldValues) {
    try {
      let response: Post;
      // const createPostDto = {
      //   tag1: data?.tags[0],
      //   tag2: data?.tags[1],
      //   tag3: data?.tags[2],
      //   title: data?.title,
      //   content: data?.content,
      //   postLocation: data?.postLocation,
      //   files: data?.files,
      // } as CreatePostDto;
      // console.log('formData', data);
      // console.log('createPostDto', createPostDto);
      if (postToCreate) {
        response = await agent.PostStore.updatePost(data);
        return;
      }
      // response = await agent.PostStore.createPost(data);
      // dispatch(setPost(response));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Tooltip
        onClick={(e) => setOpen(true)}
        title="Create new post"
        sx={{
          position: 'fixed',
          bottom: 20,
          left: { xs: 'calc(50% - 25px)', md: 30 },
        }}
      >
        <Fab color="primary" aria-label="add">
          <Edit />
        </Fab>
      </Tooltip>
      <StyledModal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          width={575}
          height={560}
          bgcolor={'background.default'}
          color={'text.primary'}
          p={3}
          borderRadius={5}
        >
          <form onSubmit={handleSubmit(handleSubmitData)}>
            <Grid container spacing={2}>
              {!openFileUpload ? (
                <>
                  <Grid item xs={12} sm={12}>
                    <Typography variant="h6" color="gray" textAlign="center">
                      Create post
                    </Typography>
                  </Grid>
                  {/* <Grid item xs={12} sm={12}>
                    <UserBox>
                      <Avatar
                        src={user?.image}
                        sx={{ width: 30, height: 30 }}
                      />
                      <Typography fontWeight={500} variant="h6">
                        {user?.displayName}
                      </Typography>
                    </UserBox>
                    <AppTextInput
                      rows={1}
                      control={control}
                      name="title"
                      label="Title"
                    />
                  </Grid> */}
                  <br />
                  <Grid item xs={12} sm={12}>
                    <AppTextInput
                      multiline={true}
                      rows={5}
                      control={control}
                      name="desc"
                      label="Description"
                      placeholder="Provide a descriptive description here..."
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Typography fontWeight={200} variant="body1">
                      Please provide at least 3 tags
                    </Typography>
                    <AppSelectInput name="tags" />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Stack direction="row" gap={1} mt={2} mb={3}>
                      <EmojiEmotions color="primary" />
                      <Image
                        color="primary"
                        onClick={() => setOpenFileUpload(true)}
                      />
                      <VideoCameraBack color="success" />
                      <PersonAdd color="error" />
                    </Stack>
                  </Grid>
                  <ButtonGroup
                    fullWidth
                    variant="contained"
                    aria-label="outlined primary button group"
                  >
                    <LoadingButton
                      loading={isSubmitting}
                      onSubmit={handleSubmit(handleSubmitData)}
                      // onClick={() => handleSubmit(handleSubmitData)}
                      onClick={handleSubmit(handleSubmitData)}
                      type="submit"
                      variant="contained"
                    >
                      Submit
                    </LoadingButton>
                    <Button sx={{ width: '100px' }}>
                      <DateRange />
                    </Button>
                  </ButtonGroup>
                </>
              ) : (
                <>
                  <Grid item xs={12} sm={12}>
                    <AppDropzone control={control} name="files" />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    {watchFile ? (
                      <img
                        src={watchFile.preview}
                        alt="preview"
                        style={{ maxHeight: 200 }}
                      />
                    ) : (
                      <img
                        // src={postToCreate?.files[0].url}
                        alt={'test'}
                        style={{ maxHeight: 200 }}
                      />
                    )}
                  </Grid>
                  <Button
                    variant="contained"
                    startIcon={<DoneOutline />}
                    onClick={() => setOpenFileUpload(false)}
                    style={{
                      position: 'relative',
                      bottom: '-233px',
                      right: '-8px',
                      margin: '30px',
                      marginLeft: 'initial',
                    }}
                  >
                    Done
                  </Button>
                </>
              )}
            </Grid>
            <LoadingButton
              loading={isSubmitting}
              type="submit"
              variant="contained"
              color="success"
            >
              Submit
            </LoadingButton>
          </form>
        </Box>
      </StyledModal>
    </>
  );
}
