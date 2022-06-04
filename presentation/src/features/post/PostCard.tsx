import React, { useEffect } from 'react';
import { Favorite, FavoriteBorder, MoreVert, Share } from '@mui/icons-material';
import {
  Avatar,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  IconButton,
  Typography,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SimpleImageSlider from 'react-simple-image-slider';
import { Post } from '../../app/models/post';
import { useAppSelector } from '../../app/store/storeConfig';
import { NavLink, Link } from 'react-router-dom';
import { dateTimeFormat } from '../../app/utils/utils';

interface Props {
  img: string;
  title: string;
  post: Post;
}

export default function PostCard({ img, title, post }: Props) {
  const handleSliceContent = (post: Post) => {
    let postContent = '';
    if (post.content.length > 100) {
      postContent = post.content.substring(0, 90);
    }
    return postContent !== '' ? postContent : post.content;
  };

  const handleSliceTitle = (post: Post) => {
    let postTitle = '';
    if (post.title.length > 30) {
      postTitle = post.title.substring(0, 30);
    }
    return postTitle !== '' ? postTitle : post.title;
  };

  const images = post?.photos.map((photo) => {
    return { url: photo.url };
  });

  return (
    <Card sx={{ margin: 2 }}>
      <CardActionArea>
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
          title={post.posterName ? post.posterName : 'Unknown'}
          subheader={`${dateTimeFormat(post.createdAt)}`}
        />
        <CardMedia component="div">
          <SimpleImageSlider
            width={400}
            height={500}
            images={images!}
            showBullets={true}
            showNavs={false}
          />
        </CardMedia>
        <CardContent style={{ height: '160px' }}>
          <CardContent component={NavLink} to={`/posts/${post.id}`}>
            <Typography gutterBottom variant="h5">
              {handleSliceTitle(post)}
            </Typography>
            <Typography variant="body2">
              {handleSliceContent(post)}...
            </Typography>
          </CardContent>
        </CardContent>
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
      </CardActionArea>
    </Card>
  );
}
