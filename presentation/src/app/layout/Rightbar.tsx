import {
	Link,
	Avatar,
	Container,
	ImageList,
	ImageListItem,
	makeStyles,
	Typography,
	Divider,
} from "@material-ui/core"
import { AvatarGroup } from "@material-ui/lab"

const useStyles = makeStyles(theme => ({
	container: {
		paddingTop: theme.spacing(10),
		position: "sticky",
		top: 0,
	},
	title: {
		fontSize: 16,
		fontWeight: 500,
		color: "#555",
		// backgroundColor: "pink",
	},
	link: {
		marginRight: theme.spacing(2),
		color: "#555",
		fontSize: 16,
	},
}))

const Rightbar = () => {
	const classes = useStyles()
	return (
		<Container className={classes.container}>
			<Typography
				className={classes.title}
				style={{ color: "blue" }}
				gutterBottom>
				카테고리
			</Typography>
			<Link href="#" className={classes.link} variant="body2">
				강아지
			</Link>
			<Link href="#" className={classes.link} variant="body2">
				고양기
			</Link>
			<Link href="#" className={classes.link} variant="body2">
				치킨
			</Link>
			<Divider flexItem style={{ marginBottom: 5 }} />
			<Link href="#" className={classes.link} variant="body2">
				새
			</Link>
			<Link href="#" className={classes.link} variant="body2">
				토끼
			</Link>
			<br />
			<br />
			<Typography
				className={classes.title}
				style={{ color: "blue" }}
				gutterBottom>
				태그
			</Typography>
			<Link href="#" className={classes.link} variant="body2">
				희색
			</Link>
			<Link href="#" className={classes.link} variant="body2">
				하양색
			</Link>
			<Link href="#" className={classes.link} variant="body2">
				키가큼
			</Link>
			<Divider flexItem style={{ marginBottom: 5 }} />
			<Link href="#" className={classes.link} variant="body2">
				키가낮음
			</Link>
			<Link href="#" className={classes.link} variant="body2">
				뚱뚱함
			</Link>
			{/* <Typography className={classes.title} gutterBottom>
				Online Friends
			</Typography>
			<AvatarGroup max={6} style={{ marginBottom: 20 }}>
				<Avatar
					alt="Remy Sharp"
					src="https://material-ui.com/static/images/avatar/1.jpg"
				/>
				<Avatar
					alt="Travis Howard"
					src="https://material-ui.com/static/images/avatar/2.jpg"
				/>
			</AvatarGroup> */}
			<br />
			<br />
			<Typography
				className={classes.title}
				style={{ color: "blue" }}
				gutterBottom>
				이미지 목록
			</Typography>
			<ImageList rowHeight={100} style={{ marginBottom: 20 }} cols={2}>
				<ImageListItem>
					<img
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1ka4psm25tTsU8e4t4Sq1mBmd6jY5Qb-nsoxflwVUFv2BPA8Zf5oP2jOBffDIR4BkYAg&usqp=CAU"
						alt=""
					/>
				</ImageListItem>
				<ImageListItem>
					<img
						src="https://images.immediate.co.uk/production/volatile/sites/4/2018/08/iStock_13967830_XLARGE-90f249d.jpg?quality=90&resize=960%2C408"
						alt=""
					/>
				</ImageListItem>
				<ImageListItem>
					<img
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtN5UCoQjyh8wjgxdGiEwiiOKupIE9RdQKDRzqfWWkXeRikLSAdodNMEINZXSLYsOnmnY&usqp=CAU"
						alt=""
					/>
				</ImageListItem>
				<ImageListItem>
					<img
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2QYRBFgI_6StFVSq_FLkv4JTSY8ZgrwGoeyogM0VGeBclNuIC5D91-LK2i7RPod0Muo4&usqp=CAU"
						alt=""
					/>
				</ImageListItem>
				<ImageListItem>
					<img
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnMkN8ZiRqq2QdB4iK8Hou60xavvK0GpHKS_ISoZwP8REC2EQlZnqHmPPXshQpA-emTGU&usqp=CAU"
						alt=""
					/>
				</ImageListItem>
				<ImageListItem>
					<img
						src=""
						alt=""
					/>
				</ImageListItem>
			</ImageList>
			{/* <Typography className={classes.title} gutterBottom>
				Categories
			</Typography>
			<Link href="#" className={classes.link} variant="body2">
				Science
			</Link>
			<Link href="#" className={classes.link} variant="body2">
				Life
			</Link> */}
		</Container>
	)
}

export default Rightbar
