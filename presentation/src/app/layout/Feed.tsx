import React, {useEffect } from "react"
import { Container, makeStyles } from "@material-ui/core"
import AddPost from "./AddPost"
import PostCard from "./PostCard"
import {Post} from "../models/post"
import {Tag} from "../models/tag"

const useStyles = makeStyles(theme => ({
	container: { paddingTop: theme.spacing(10) },
}))

interface Props {
	posts: any
}

export default function Feed({posts}: Props) {
	const classes = useStyles()

	useEffect(() => {
		console.log("posts", posts)
	}, [posts])

	return (
		<Container className={classes.container}>
			{posts[0]?.map((aPost: any) => (
				<PostCard
					title="Looking for my cat"
					img="https://images.ctfassets.net/440y9b545yd9/6TlvhhsHD1nGTi0X6h5PuQ/255303775853beb51f6ac79cea782790/ExoticShorthairTop10Cat850.jpg"
					post={aPost}
				/>			
			))}
			{/* <PostCard
				title="Looking for my cat"
				img="https://images.ctfassets.net/440y9b545yd9/6TlvhhsHD1nGTi0X6h5PuQ/255303775853beb51f6ac79cea782790/ExoticShorthairTop10Cat850.jpg"
			/>
			<PostCard
				title="Simply Recipes Less Stress. More Joy"
				img="http://naturaldogtreats.org/wp-content/uploads/2021/10/3180-Pug_green_grass-732x549-thumbnail-732x549-1.jpg"
			/>
			<PostCard
				title="What To Do In London"
				img="https://images.pexels.com/photos/7245535/pexels-photo-7245535.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
			/>
			<PostCard
				title="Recipes That Will Make You Crave More"
				img="https://images.pexels.com/photos/7245477/pexels-photo-7245477.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
			/>
			<PostCard
				title="Shortcut Travel Guide to Manhattan"
				img="https://images.pexels.com/photos/7078467/pexels-photo-7078467.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
			/>
			<PostCard
				title="Killer Actions to Boost Your Self-Confidence"
				img="https://images.pexels.com/photos/7833646/pexels-photo-7833646.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
			/> */}
		</Container>
	)
}

