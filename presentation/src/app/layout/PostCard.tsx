import React, {useEffect} from "react"
import {
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	makeStyles,
	Typography,
} from "@material-ui/core"
import {Post} from "../models/post"
import { useAppSelector } from '../store/storeConfig';


const useStyles = makeStyles(theme => ({
	card: {
		marginBottom: theme.spacing(5),
	},
	media: {
		height: 350,
		[theme.breakpoints.down("sm")]: {
			height: 550,
		},
	},
}))

interface Props {
	img: string
	title: string
	post: Post
}

export default function PostCard({ img, title, post}: Props) {
	const classes = useStyles()

	console.log("PostCard", post)
	return (
		<Card className={classes.card}>
			<CardActionArea>
				<CardMedia
					className={classes.media}
					image={post.photos.length > 0 ? post.photos[0]?.url: img}
					title="My Post"
				/>
				<CardContent>
					<Typography gutterBottom variant="h5">
						{post.title}
					</Typography>
					<Typography variant="body2">
						{post.content}
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<Button size="small" color="primary">
					공유
				</Button>
				<Button size="small" color="primary">
					더 읽기
				</Button>
			</CardActions>
		</Card>
	)
}

