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
import { Comment, PostComment } from 'app/models/comment';
import {
	HubConnection,
	HubConnectionBuilder,
	LogLevel,
} from '@microsoft/signalr';
import moment from 'moment';
import { toast } from 'react-toastify';
import Pagination from 'app/components/Pagination';
import { Post } from 'app/models/post';
import { MID_NAV_NAME } from 'app/utils/utils';

interface Props {
	post: Post;
	isCloseComment: boolean;
}

export default function PostDetailsComment({ post, isCloseComment }: Props) {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state) => state.auth);
	const [comments, setComments] = useState<PostComment[]>([]);
	const [notifications, setNotifications] = useState<any[]>([]);
	const hubConnection = useRef<HubConnection | null>(null);

	useEffect(() => {
		// enable Socket only for authenticated users
		if (user?.token) {
			// connection initialization
			hubConnection.current = new HubConnectionBuilder()
				.withUrl(
					process.env.REACT_APP_CHAT_URL + '?postId=' + post?.id,
					{
						accessTokenFactory: () => user.token,
					}
				)
				.withAutomaticReconnect()
				.configureLogging(LogLevel.Information)
				.build();

			// start listening to connection
			hubConnection.current
				?.start()
				.then(() => console.log('hub connection started...'))
				.catch((err: any) =>
					console.error('Error establishing hubConnection', err)
				);

			// load all comments(in current post) from server (1)
			hubConnection.current?.on(
				'LoadComments',
				(comments: PostComment[]) => {
					comments.forEach((aComment: PostComment) => {
						aComment.timestamp = new Date(aComment.timestamp);
					});
					console.log('LoadComments', comments);
					setComments(comments.reverse());
				}
			);

			// receive loaded comments
			hubConnection.current?.on(
				'ReceiveComment',
				(comment: PostComment) => {
					setComments((currComments) => [comment, ...currComments]);
				}
			);

			// receive loaded notifications
			hubConnection.current?.on(
				'ReceiveNotification',
				(response: PostComment) => {
					setNotifications((currNotifications) => [
						response,
						...currNotifications,
					]);
				}
			);

			// load all notifications(in current post) from server
			hubConnection.current?.on(
				'LoadNotifications',
				(response: PostComment[]) => {
					response.forEach((aComment: PostComment) => {
						aComment.timestamp = new Date(aComment.timestamp);
					});
					setNotifications(response.reverse());
				}
			);
		}

		// unmount the hubConnection
		return () => {
			hubConnection.current
				?.stop()
				.then(() => console.log('stopHubConnection'))
				.catch((err: any) =>
					console.error('Error stopping connection: ', err)
				);

			// temporarily clear all currently connected comments
			setComments([]);
		};
	}, [post?.id, dispatch]);

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

	const handleSubmitData = async (data: FieldValues) => {
		const values: Comment = {
			postId: post.id,
			body: data?.body,
			userToken: user?.token,
		};
		try {
			await hubConnection.current
				?.invoke('SendComment', values)
				.then(() => {
					console.log('SendComment success');
					reset();
				})
				.catch((err: any) => console.error(err));
		} catch (err: any) {
			console.error(err);
		}
	};

	// logs form submit errors if occur
	const submitDataError = (errors: any, event: any) => {
		console.error(errors);
		toast.error(errors);
	};

	// pagination
	const [limit, setLimit] = useState(5);
	const [page, setPage] = useState(1);
	const offset = (page - 1) * limit;

	return (
		<>
			{!isCloseComment && (
				<form
					onSubmit={handleSubmit(handleSubmitData, submitDataError)}
				>
					{user?.token && (
						<>
							<Grid
								item
								xs={12}
								sm={12}
								style={{
									width: '919px',
									marginLeft: '50px',
									marginBottom: '20px',
									border: '1px',
								}}
							>
								<AppTextInput
									multiline={true}
									rows={4}
									// reset form field after submit
									onClick={() =>
										reset({
											body: '',
										})
									}
									control={control}
									name="body"
									label=""
									// placeholder="Share your thought here..."
									placeholder={
										MID_NAV_NAME.yourThoughtsOnPost
									}
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
						</>
					)}
				</form>
			)}
			<Paper
				style={{
					padding: '40px 20px',
					width: '919px',
					marginLeft: '50px',
					marginTop: '20px',
					backgroundColor: '#FFE',
				}}
			>
				{comments.slice(offset, offset + limit).map((aComment) => (
					<div key={aComment.id}>
						<Grid container wrap="nowrap" spacing={2}>
							<Grid item>
								<Avatar alt="" src={aComment.imageUrl} />
							</Grid>
							<Grid justifyContent="left" item xs zeroMinWidth>
								<h4
									style={{
										margin: 1,
										textAlign: 'left',
										fontWeight: 'bold',
										fontSize: 18,
									}}
								>
									{aComment.displayName}
								</h4>
								<p style={{ textAlign: 'left' }}>
									{aComment.body}
								</p>
								<p
									style={{
										textAlign: 'left',
										color: 'gray',
										fontSize: 'small',
									}}
								>
									{moment(
										new Date(aComment?.timestamp)
									).fromNow()}
								</p>
							</Grid>
						</Grid>
						<Divider
							variant="fullWidth"
							style={{ margin: '30px 0' }}
						/>
					</div>
				))}
				<footer>
					<Pagination
						totalItems={comments.length}
						limit={limit}
						page={page}
						setPage={setPage}
					/>
				</footer>
			</Paper>
		</>
	);
}
