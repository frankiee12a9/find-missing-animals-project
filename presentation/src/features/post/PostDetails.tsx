import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { NotificationAdd, Share, Delete } from '@mui/icons-material';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

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
      return photo.url;
    });
    console.log('getPhotosFromCurrentPost', images);
    return (
      images || [
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwebcolours.ca%2F2020%2F08%2F14%2Fcomment-redimensionner-une-image-automatiquement-dans-une-div-sans-espace-vide%2F&psig=AOvVaw3LHvLThwXtageIlJwB6ICb&ust=1666489363626000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCPi_8Oba8voCFQAAAAAdAAAAABAE',
      ]
    );
  };

  useEffect(() => {
    // if (!currentPost) {
    //   dispatch(fetchPostAsync(id));
    // }

    if (!currentPost) {
      dispatch(fetchPostAsync(id)).then((res) => {
        console.log('res', res);
        getPhotosFromCurrentPost(currentPost!);
      });
    } else {
      console.log('currentPost', currentPost);
      getPhotosFromCurrentPost(currentPost!);
    }

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

    return () => {};
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
        toast.success('Unfollowed this post successfully');
      } else {
        setIsFollowing(true);
        toast.info('Start following this post');
      }
    });
  };

  // just use to logging post is followed or not
  useEffect(() => {}, [isFollowing]);

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
            {/* ref={this.slideRef} {...properties} */}
            <Slide>
              {getPhotosFromCurrentPost(currentPost!).map((each, index) => (
                <div key={index} className="each-slide">
                  <img className="lazy" src={each} alt="sample" />
                </div>
              ))}
            </Slide>
            {/* <SimpleImageSlider
              width={896}
              height={504}
              images={getPhotosFromCurrentPost(currentPost!)}
              showBullets={true}
              // showNavs={true}
              showNavs={true}
            /> */}
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
