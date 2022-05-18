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
import { Post } from '../../app/models/post';
import { useAppSelector } from '../../app/store/storeConfig';
import { NavLink, Link } from 'react-router-dom';

interface Props {
  img: string;
  title: string;
  post: Post;
}

export default function PostCard({ img, title, post }: Props) {
  let today = new Date();
  let date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

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
          // subheader={post.createdAt}
          subheader={date}
        />
        <CardMedia
          component="img"
          height="20%"
          image={post?.photos.length > 0 ? post.photos[0].url : img}
          alt="Paella dish"
        />
        <CardContent>
          <CardContent component={NavLink} to={`/posts/${post.id}`}>
            <Typography gutterBottom variant="h5">
              {post.title}
            </Typography>
            <Typography variant="body2">{post.content}</Typography>
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
