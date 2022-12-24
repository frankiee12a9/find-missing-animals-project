import { useEffect, useState } from 'react';
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

import { useAppDispatch, useAppSelector } from '../../app/store/storeConfig';
import PostDetailsSidebar from './PostDetailsSidebar';
import {
	fetchPostAsync,
	followPostAsync,
	postSelectors,
	setLastViewPosts,
} from './postSlice';
import {
	dateTimeFormat,
	isFollowingThisPost,
	kakaoMapUrl,
	localHostIP,
	MID_NAV_NAME,
	POST_TEXT,
} from '../../app/utils/utils';
import { toast } from 'react-toastify';

import PostSettingOptions from './PostSettingOptions';
import { Post } from 'app/models/post';
import PostShareDialog from './PostShareDialog';
import AppServiceTerms from 'app/components/AppServiceTerms';
import PostDetailsComment from './PostDetailsComment';
import { defaultImgList } from 'app/utils/constant';

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
		return images || defaultImgList;
	};

	useEffect(
		() => {
			// if (!currentPost) {
			// 	dispatch(fetchPostAsync(id)).then((res) => {
			// 		getPhotosFromCurrentPost(currentPost!);
			// 	});
			// } else {
			// 	getPhotosFromCurrentPost(currentPost!);
			// }
			dispatch(fetchPostAsync(id)).then((res) => {
				getPhotosFromCurrentPost(currentPost!);
			});

			// handle fetching viewed posts history
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
						JSON.stringify([
							currentViewedPost,
							...Array.from(totalViewedPosts),
						])
					);

				let lastViewedPosts = JSON.parse(
					window.localStorage.getItem('lastViewedPosts')! || '[]'
				);

				// slice viewed posts if  it's length is greater than 3
				if (
					Array.isArray(lastViewedPosts) &&
					lastViewedPosts.length > 3
				)
					lastViewedPosts = lastViewedPosts.shift();

				lastViewedPosts && dispatch(setLastViewPosts(lastViewedPosts));
			}

			return () => {};
		},
		// [id, dispatch, currentPost]
		[id, dispatch]
	);

	const [isFollowing, setIsFollowing] = useState(
		isFollowingThisPost(user!, currentPost!)
	);
	const handleFollowPost = () => {
		if (!user?.token) {
			setAppServiceTermsShow(true);
			// return;
		} else {
			dispatch(followPostAsync(currentPost!)).then(() => {
				if (isFollowingThisPost(user!, currentPost!)) {
					setIsFollowing(false);
					// toast.success('Unfollowed this post successfully');
					toast.success('이제 글 언플로잉합니다');
				} else {
					setIsFollowing(true);
					// toast.info('Start following this post');
					toast.info('이제 글 플로잉 시작합니당 😊');
					// toast.info('Start following this post');
				}
			});
		}
	};

	// just use to logging post is followed or not
	useEffect(() => {}, [isFollowing]);
	// open post shared dialog
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
			// toast.success('Opened comment section successfully');
			toast.success(POST_TEXT.openCommentOKMsg);
		} else {
			setIsCloseComment(true);
			// toast.success('Closed comment section successfully');
			toast.success(POST_TEXT.closeCommentOKMsg);
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
						subheader={`posted by ${
							currentPost?.posterName
						} | ${dateTimeFormat(currentPost?.createdAt!)}`}
					/>
					<CardContent>
						<Typography variant="body2" color="text.secondary">
							{currentPost?.content}
						</Typography>
						<br />
						<Typography variant="body1" color="Highlight">
							{/* Post location */}
							{MID_NAV_NAME.postLocation}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							{currentPost?.postLocation.location} (
							<Link
								style={{ color: 'primary' }}
								href={`${kakaoMapUrl}${currentPost?.postLocation.location}`}
								underline="hover"
							>
								{/* {'View location details on Map'} */}
								{MID_NAV_NAME.viewLocation}
							</Link>
							)
						</Typography>
					</CardContent>
					<CardMedia component="div">
						<Slide>
							{getPhotosFromCurrentPost(currentPost!).map(
								(each, index) => (
									<div key={index} className="each-slide">
										<img
											className="lazy"
											src={each}
											alt="sample"
										/>
									</div>
								)
							)}
						</Slide>
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
								currentUrl={`${localHostIP}${currentPost?.id}`}
								cancelShare={() => setOpenPostShare(false)}
								open={openPostShare}
							/>
						)}
						<Tooltip
							title={isFollowing ? `Unfollowing` : `Following`}
						>
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
			{/* {user?.token && (
				<PostDetailsComment
					post={currentPost!}
					isCloseComment={isCloseComment}
				/>
			)} */}
			<PostDetailsComment
				post={currentPost!}
				isCloseComment={isCloseComment}
			/>
		</Grid>
	);
}
