import React, { useEffect, useRef, useState } from 'react';
import {
  Paper,
  Grid,
  Avatar,
  Divider,
  TextareaAutosize,
  Button,
} from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from 'app/store/storeConfig';
import AppTextInput from 'app/components/AppTextInput';
import { FieldValues, useForm } from 'react-hook-form';
import { commentValidationSchema } from 'app/utils/postValidationSchema';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import { PostComment } from 'app/models/comment';
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from '@microsoft/signalr';
import moment from 'moment';

interface Props {
  postId: string;
}

export default function PostDetailsComment({ postId }: Props) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [comments, setComments] = useState<PostComment[]>([]);
  const hubConnection = useRef<HubConnection | null>(null);

  useEffect(() => {
    // enable Socket only for authenticated users
    if (user?.token) {
      // connection initialization
      hubConnection.current = new HubConnectionBuilder()
        .withUrl(process.env.REACT_APP_CHAT_URL + '?postId=' + postId, {
          accessTokenFactory: () => user.token,
        })
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build();

      // start listening to connection
      hubConnection.current
        ?.start()
        .then(() => console.log('hubConnection started'))
        .catch((err: any) =>
          console.error('Error establishing hubConnection', err)
        );

      // load all comments(in current post) from server (1)
      hubConnection.current?.on('LoadComments', (comments: PostComment[]) => {
        comments.forEach((comment: PostComment) => {
          comment.timestamp = new Date(comment.timestamp);
        });

        console.log('comments loaded', comments);
        setComments(comments);
      });

      // receive loaded comments
      hubConnection.current?.on('ReceiveComment', (comment: PostComment) => {
        console.log('aComment', comment);
        comment.timestamp = new Date(comment.timestamp);
        setComments((currComments) => [comment, ...currComments]);
      });
    }

    console.log('_hubConnection', hubConnection.current);

    // unmount the hubConnection
    return () => {
      hubConnection.current
        ?.stop()
        .then(() => console.log('stopHubConnection'))
        .catch((err: any) => console.error('Error stopping connection: ', err));

      // temporarily unmount the clear all currently connected comments
      setComments([]);
    };
  }, [postId, dispatch]);

  const {
    control,
    reset,
    handleSubmit,
    watch,
    formState: { errors, isDirty, isSubmitting },
  } = useForm({
    mode: 'all',
    resolver: yupResolver<any>(commentValidationSchema),
  });

  // submit form data
  const handleSubmitData = async (data: FieldValues) => {
    const values = { postId: postId, body: data?.body };
    console.log(values);
    try {
      await hubConnection.current
        ?.invoke('SendComment', values)
        .then(() => console.log('SendComment success'))
        .catch((err: any) => console.error(err));
    } catch (err: any) {
      console.error(err);
    }
  };

  // logs form submit errors if occur
  const submitDataError = (errors: any, event: any) =>
    console.error('Errors:', errors);

  useEffect(() => {
    console.log('comments', comments);
  }, [comments]);

  return (
    <>
      <form onSubmit={handleSubmit(handleSubmitData, submitDataError)}>
        <Grid
          item
          xs={12}
          sm={12}
          style={{
            width: '919px',
            marginLeft: '50px',
            marginBottom: '20px',
            border: '1px solid',
          }}
        >
          <AppTextInput
            multiline={true}
            rows={4}
            control={control}
            name="body"
            label=""
            placeholder="Share your thought here..."
            resize="none"
          />
        </Grid>
        <Button
          variant="contained"
          type="submit"
          color="primary"
          style={{ left: '896px', top: '-10px' }}
        >
          Send
        </Button>
      </form>
      <Paper
        style={{
          padding: '40px 20px',
          width: '919px',
          marginLeft: '50px',
          marginTop: '20px',
          backgroundColor: '#FFE',
        }}
      >
        {comments.map((aComment) => (
          <>
            <Grid container key={aComment.id} wrap="nowrap" spacing={2}>
              <Grid item>
                <Avatar alt="Remy Sharp" src={aComment.imageUrl} />
              </Grid>
              <Grid justifyContent="left" item xs zeroMinWidth>
                <h4 style={{ margin: 0, textAlign: 'left' }}>
                  {aComment.displayName}
                </h4>
                <p style={{ textAlign: 'left' }}>{aComment.body}</p>
                <p style={{ textAlign: 'left', color: 'gray' }}>
                  {moment(aComment?.timestamp.toISOString()).fromNow()}
                </p>
              </Grid>
            </Grid>
            <Divider variant="fullWidth" style={{ margin: '30px 0' }} />
          </>
        ))}
      </Paper>
    </>
  );
}
