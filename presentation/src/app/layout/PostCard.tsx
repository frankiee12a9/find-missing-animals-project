import React, { useEffect } from 'react';
// import {
//   Button,
//   Card,
//   CardHeader,
//   Avatar,
//   CardActionArea,
//   CardActions,
//   CardContent,
//   CardMedia,
//   makeStyles,
//   Typography,
// } from '@material-ui/core';
import {
  Favorite,
  FavoriteBorder,
  MoreVert,
  Share,
  Pets,
} from '@mui/icons-material';
// import { Favorite, FavoriteBorder, MoreVert, Share } from '@material-ui/icons';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  IconButton,
  Typography,
  makeStyles,
} from '@mui/material';
import { Post } from '../models/post';
import { useAppSelector } from '../store/storeConfig';
import { NavLink } from 'react-router-dom';

// const useStyles = makeStyles((theme) => ({
//   card: {
//     marginBottom: theme.spacing(5),
//   },
//   media: {
//     height: 350,
//     [theme.breakpoints.down('sm')]: {
//       height: 550,
//     },
//   },
// }));

interface Props {
  img: string;
  title: string;
  post: Post;
}

export default function PostCard({ img, title, post }: Props) {
  //   const classes = useStyles();

  return (
    <Card sx={{ margin: 5 }}>
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
        subheader={post.createdAt}
      />
      <CardMedia
        component="img"
        height="20%"
        image={post.photos.length > 0 ? post.photos[0].url : img}
        alt="Paella dish"
      />
      <CardContent>
        <CardContent>
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
    </Card>

    // Note: will be replaced soon
    // <Card className={classes.card}>
    //   <CardActionArea>
    //     <CardMedia
    //       className={classes.media}
    //       image={post.photos.length > 0 ? post.photos[0]?.url : img}
    //       title="My Post"
    //     />
    //     <CardContent component={NavLink} to={`posts/${post.id}`}>
    //       <Typography gutterBottom variant="h5">
    //         {post.title}
    //       </Typography>
    //       <Typography variant="body2">{post.content}</Typography>
    //     </CardContent>
    //   </CardActionArea>
    //   <CardActions>
    //     <Button size="small" color="primary">
    //       공유
    //     </Button>
    //     <Button size="small" color="primary">
    //       더 읽기
    //     </Button>
    //   </CardActions>
    // </Card>
  );
}
