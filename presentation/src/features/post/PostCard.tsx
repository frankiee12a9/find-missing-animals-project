import React, { useEffect, useState } from 'react';
import { Favorite, FavoriteBorder, MoreVert, Share } from '@mui/icons-material';
import FaceIcon from '@mui/icons-material/Face';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import {
  Avatar,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  Chip,
  IconButton,
  Typography,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SimpleImageSlider from 'react-simple-image-slider';
import { Post } from '../../app/models/post';
import { useAppSelector } from '../../app/store/storeConfig';
import { NavLink, Link } from 'react-router-dom';
import { dateTimeFormat } from '../../app/utils/utils';
import PostShareDialog from './PostShareDialog';
import AppServiceTerms from 'app/components/AppServiceTerms';
import AppChipIcon from 'app/components/AppChipIcon';

interface Props {
  img: string;
  title: string;
  post: Post;
}

const styles = {
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9,
    marginTop: '30',
  },
};

export default function PostCard({ img, title, post }: Props) {
  const { user } = useAppSelector((state) => state.auth);

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

  // show app services terms to anonymous users
  const [appServiceTermsShow, setAppServiceTermsShow] = useState(false);
  const handleHideAppServiceTerms = () => {
    setAppServiceTermsShow(false);
  };

  const [openPostShare, setOpenPostShare] = useState(false);
  const handleOpenPostShare = () => {
    if (!user?.token) {
      setAppServiceTermsShow(true);
    }
    setOpenPostShare(true);
  };

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
              {handleSliceTitle(post)} {/* Note: post status */}
              {post.isFound ? (
                <Chip
                  style={{ backgroundColor: 'lime' }}
                  icon={<TagFacesIcon />}
                  label="Reunited"
                ></Chip>
              ) : (
                <Chip
                  sx={{ bgcolor: 'secondary' }}
                  icon={<FaceIcon />}
                  label="..."
                />
              )}
            </Typography>
            <Typography variant="body2">
              {handleSliceContent(post)}...
            </Typography>
          </CardContent>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="share" onClick={() => handleOpenPostShare()}>
            <Share />
          </IconButton>
          {user?.token && openPostShare && (
            <PostShareDialog
              currentUrl={`localhost:3000/posts/${post?.id}`}
              cancelShare={() => setOpenPostShare(false)}
              open={openPostShare}
            />
          )}
          {'  '}
          {post?.tags?.map((data) => (
            <Chip key={data.Id} label={data.tag1Name} size="small" />
          ))}
        </CardActions>
        {appServiceTermsShow && (
          <AppServiceTerms
            open={appServiceTermsShow}
            confirm={handleHideAppServiceTerms}
          />
        )}
      </CardActionArea>
    </Card>
  );
}
