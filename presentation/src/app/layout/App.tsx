import React from "react"
import "./styles/App.scss"
import Add from "./AddPost"
import Feed from "./Feed"
import Leftbar from "./Leftbar"
import Navbar from "./Navbar"
import Rightbar from "./Rightbar"
import { Grid, makeStyles } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
	right: {
		[theme.breakpoints.down("sm")]: {
			display: "none",
		},
	},
}))

function App() {
	const classes = useStyles()
	return (
		<div>
			<Navbar />
			<Grid container>
				<Grid item sm={2} xs={4}>
					<Leftbar />
				</Grid>
				<Grid item sm={7} xs={10}>
					<Feed />
				</Grid>
				<Grid item sm={3} className={classes.right}>
					<Rightbar />
				</Grid>
			</Grid>
			<Add />
		</div>
	)
}

export default App
