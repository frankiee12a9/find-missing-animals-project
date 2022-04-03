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
}

const Post = ({ img, title }: Props) => {
	const classes = useStyles()
	return (
		<Card className={classes.card}>
			<CardActionArea>
				<CardMedia
					className={classes.media}
					image={img}
					title="My Post"
				/>
				<CardContent>
					<Typography gutterBottom variant="h5">
						{title}
					</Typography>
					<Typography variant="body2">
						Putting here a very descriptive content about lost pet!!
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
export default Post
