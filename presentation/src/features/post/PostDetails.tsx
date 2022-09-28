import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import {
  MoreVert,
  FavoriteBorder,
  Favorite,
  NotificationAdd,
  Share,
  Delete,
} from '@mui/icons-material';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/store/storeConfig';
import PostDetailsSidebar from './PostDetailsSidebar';
import {
  fetchPostAsync,
  followPostAsync,
  postSelectors,
  setLastViewPosts,
} from './postSlice';
import { dateTimeFormat, isFollowingThisPost } from '../../app/utils/utils';
import { toast } from 'react-toastify';
import SimpleImageSlider from 'react-simple-image-slider';
import PostSettingOptions from './PostSettingOptions';
import { Post } from 'app/models/post';
import PostShareDialog from './PostShareDialog';
import AppServiceTerms from 'app/components/AppServiceTerms';
import PostDetailsComment from './PostDetailsComment';

export default function PostDetails() {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { user } = useAppSelector((state) => state.auth);

  const currentPost = useAppSelector((state) =>
    postSelectors.selectById(state, id)
  );

  const getPhotosFromCurrentPost = (post: Post) => {
    const images = post?.photos.map((photo) => {
      return { url: photo.url };
    });
    return images || [{ url: '' }];
  };

  useEffect(() => {
    // if (!currentPost) {
    //   dispatch(fetchPostAsync(id));
    // }

    dispatch(fetchPostAsync(id));

    getPhotosFromCurrentPost(currentPost!);

    // handle fetch viewed posts history
    if (currentPost) {
      const { id, title, content, photos } = currentPost;
      const currentViewedPost = {
        id,
        title,
        content,
        photos,
        timestamp: Date.now(),
      };

      // get current total viewed posts
      const totalViewedPosts = JSON.parse(
        window.localStorage.getItem('lastViewedPosts') || '[]'
      );

      // destructuring current total viewed posts with newly viewed post
      currentViewedPost &&
        window.localStorage.setItem(
          'lastViewedPosts',
          JSON.stringify([currentViewedPost, ...Array.from(totalViewedPosts)])
        );

      let lastViewedPosts = JSON.parse(
        window.localStorage.getItem('lastViewedPosts')! || '[]'
      );

      // slice viewed posts if  it's length is greater than 3
      if (Array.isArray(lastViewedPosts) && lastViewedPosts.length > 3)
        lastViewedPosts = lastViewedPosts.shift();

      lastViewedPosts && dispatch(setLastViewPosts(lastViewedPosts));
    }
  }, [id, dispatch, currentPost, currentPost?.photos]);

  const [isFollowing, setIsFollowing] = useState(
    isFollowingThisPost(user!, currentPost!)
  );
  const handleFollowPost = () => {
    if (!user?.token) {
      setAppServiceTermsShow(true);
      return;
    }

    dispatch(followPostAsync(currentPost!)).then(() => {
      if (isFollowingThisPost(user!, currentPost!)) {
        setIsFollowing(false);
        toast.success('Un-followed this post successfully');
      } else {
        setIsFollowing(true);
        toast.info('Started following this post');
      }
    });
  };

  // just use to logging post is followed or not
  useEffect(() => {
    // console.log(isFollowing);
  }, [isFollowing]);

  // open post share dialog
  const [openPostShare, setOpenPostShare] = useState(false);
  const handleOpenPostShare = () => {
    if (!user?.token) {
      setAppServiceTermsShow(true);
    }
    setOpenPostShare(true);
  };

  // show app services terms to anonymous users
  const [appServiceTermsShow, setAppServiceTermsShow] = useState(false);
  const handleHideAppServiceTerms = () => {
    setAppServiceTermsShow(false);
  };

  const [isCloseComment, setIsCloseComment] = useState(false);
  const handleCloseComment = () => {
    if (isCloseComment) {
      setIsCloseComment(false);
      toast.success('Opened comment section successfully');
    } else {
      setIsCloseComment(true);
      toast.success('Closed comment section successfully');
    }
  };

  return (
    <Grid container columnSpacing={4}>
      <Grid item sm={10} xs={10}>
        <Card sx={{ margin: 2 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
                {currentPost?.posterName?.[0].toUpperCase()}
              </Avatar>
            }
            action={
              user?.username === currentPost?.posterName ? (
                <PostSettingOptions
                  currentPost={currentPost}
                  handleCloseComment={handleCloseComment}
                />
              ) : (
                <></>
              )
            }
            title={currentPost?.title}
            subheader={`posted by ${currentPost?.posterName} | ${dateTimeFormat(
              currentPost?.createdAt!
            )}`}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {currentPost?.content}
            </Typography>
            <br />
            <Typography variant="body1" color="Highlight">
              Post location
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {currentPost?.postLocation.location} (
              <Link
                style={{ color: 'primary' }}
                href={`https://map.kakao.com/?q=${currentPost?.postLocation.location}`}
                underline="hover"
              >
                {'View location details on Map'}
              </Link>
              )
            </Typography>
          </CardContent>
          <CardMedia component="div">
            <SimpleImageSlider
              width={896}
              height={504}
              images={getPhotosFromCurrentPost(currentPost!)}
              showBullets={true}
              showNavs={true}
            />
          </CardMedia>
          <CardActions disableSpacing>
            <Tooltip title="Share">
              <IconButton
                aria-label="share"
                onClick={() => handleOpenPostShare()}
              >
                <Share />
              </IconButton>
            </Tooltip>
            {user?.token && openPostShare && (
              <PostShareDialog
                currentUrl={`localhost:3000/posts/${currentPost?.id}`}
                cancelShare={() => setOpenPostShare(false)}
                open={openPostShare}
              />
            )}
            <Tooltip title={isFollowing ? `Unfollowing` : `Following`}>
              <IconButton
                onClick={() => handleFollowPost()}
                aria-label="following"
              >
                <NotificationAdd />
              </IconButton>
            </Tooltip>
            {appServiceTermsShow && (
              <AppServiceTerms
                open={appServiceTermsShow}
                confirm={handleHideAppServiceTerms}
              />
            )}
          </CardActions>
        </Card>
      </Grid>
      <Grid item sm={2}>
        <PostDetailsSidebar />
      </Grid>
      <PostDetailsComment post={currentPost!} isCloseComment={isCloseComment} />
    </Grid>
  );
}
