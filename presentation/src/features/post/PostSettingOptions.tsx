import { IconButton, Menu, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { Post } from 'app/models/post';
import { useAppDispatch, useAppSelector } from 'app/store/storeConfig';
import { deletePostAsync } from './postSlice';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import { POST_TEXT } from 'app/utils/utils';

interface Props {
	currentPost: Post | undefined;
	handleCloseComment: () => void;
}

export default function PostSettingOptions({
	currentPost,
	handleCloseComment,
}: Props) {
	const dispatch = useAppDispatch();
	const history = useHistory();
	const { user } = useAppSelector((state) => state.auth);

	const [editPostMode, setEditPostMode] = useState(false);
	const [postToEdit, setPostToEdit] = useState<Post | undefined>(undefined);
	const handleEditPost = (post: Post) => {
		setPostToEdit(post);
		setEditPostMode(true);
	};

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const cancelEdit = () => {
		if (postToEdit) setPostToEdit(undefined);
		setEditPostMode(false);
	};

	return (
		<div style={{}}>
			<IconButton
				aria-label="more"
				id="long-button"
				aria-controls={open ? 'long-menu' : undefined}
				aria-expanded={open ? 'true' : undefined}
				aria-haspopup="true"
				onClick={handleClick}
			>
				<MoreVertIcon />
			</IconButton>
			<Menu
				id="long-menu"
				MenuListProps={{
					'aria-labelledby': 'long-button',
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				PaperProps={{
					style: {
						maxHeight: 20 * 4.5,
						width: '173px',
					},
				}}
			>
				<MenuItem
					onClick={() =>
						history.push(`/posts/${currentPost?.id}/edit`)
					}
					disableRipple
				>
					<EditIcon />
					{/* Edit */}
					{POST_TEXT.editPost}
				</MenuItem>
				<MenuItem
					onClick={() =>
						dispatch(deletePostAsync(currentPost?.id!))
							.then(() => {
								history.push('/posts');
								toast.success('Post was deleted successfully');
							})
							.catch((err: any) => console.error(err))
					}
				>
					<DeleteIcon />
					{/* Delete */}
					{POST_TEXT.deletePost}
				</MenuItem>
				<MenuItem onClick={() => handleCloseComment()}>
					<DeleteIcon />
					{/* Close comment */}
					{POST_TEXT.closeComment}
				</MenuItem>
			</Menu>
		</div>
	);
}
