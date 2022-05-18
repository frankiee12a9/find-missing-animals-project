import { MoreVert, FavoriteBorder, Favorite, Share } from '@mui/icons-material';
import {
  Avatar,
  AvatarGroup,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  Divider,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/store/storeConfig';
import PostDetailsSidebar from './PostDetailsSidebar';
import { fetchPostAsync, postSelectors } from './postSlice';
import { OnChangeValue } from 'react-select';
import moment from 'moment';

// Note: Post/Comment section reference: https://codesandbox.io/s/2393m2k5rj?file=/src/index.js

export default function PostDetails() {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const currentPost = useAppSelector((state) =>
    postSelectors.selectById(state, id)
  );

  useEffect(() => {
    console.log('currentPost', currentPost);
    if (!currentPost) {
      dispatch(fetchPostAsync(id));
    }
  }, [id, dispatch]);

  const [photoDetail, setPhotoDetail] = useState(currentPost?.photos[0].url);
  const onChangePhoto = (e: SyntheticEvent, photoIndex: number) => {
    console.log('click photo');
    setPhotoDetail(currentPost?.photos[photoIndex].url);
  };

  return (
    <Grid container columnSpacing={4}>
      <Grid item sm={10} xs={10}>
        <Card sx={{ margin: 2 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
                R
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVert />
              </IconButton>
            }
            title={currentPost?.title}
            subheader={
              moment(currentPost?.createdAt).format()
              // currentPost?.createdAt ? currentPost?.createdAt : Date.now()
            }
          />

          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {currentPost?.content}
            </Typography>
            <br />
            <Typography variant="h6" color="Highlight">
              Post location
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {currentPost?.postLocation.location}
              <p>
                <a
                  href={`https://map.kakao.com/?urlX=${currentPost?.postLocation.longtitute}&urlY=${currentPost?.postLocation.latitude}&urlLevel=3&itemId=23891175&q=${currentPost?.postLocation.location}&srcid=23891175&map_type=TYPE_MAP`}
                >
                  View location details on Map
                </a>
              </p>
            </Typography>
          </CardContent>

          <CardMedia
            component="img"
            height="500px"
            // height="10%"
            // image={currentPost?.photos[0].url}
            image={photoDetail}
            alt="Paella dish"
          />
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <Checkbox
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite sx={{ color: 'red' }} />}
              />
            </IconButton>
            <IconButton aria-label="share">
              <Share />
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
      <Grid item sm={2}>
        <PostDetailsSidebar
          postPhotos={currentPost?.photos}
          onChangePhoto={onChangePhoto}
        />
      </Grid>
    </Grid>
  );
}
