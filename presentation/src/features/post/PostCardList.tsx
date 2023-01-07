import { Grid } from '@mui/material';
import PostCard from './PostCard';
import { Post } from '../../app/models/post';
import PostCardSkeleton from './PostCardSkeleton';
import { useAppSelector } from '../../app/store/storeConfig';

interface Props {
	posts: Post[] | [];
}

export default function PostCardList({ posts }: Props) {
	const { loadingPosts } = useAppSelector((state) => state.posts);
	return (
		<Grid container columnSpacing={2}>
			{posts?.map((post) => (
				<Grid item xs={6} key={post.id}>
					{!loadingPosts ? (
						<PostCardSkeleton key={post.id} />
					) : (
						<PostCard
							key={post.id}
							post={post}
							img={''}
							title="Looking for my pets "
						/>
					)}
				</Grid>
			))}
		</Grid>
	);
}
