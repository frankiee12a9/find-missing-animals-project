import React from 'react'
import {  Grid, makeStyles} from "@material-ui/core"
import Leftbar from "./Leftbar"
import Feed from "./Feed"
import Rightbar from "./Rightbar"


const useStyles = makeStyles(theme => ({
	right: {
		[theme.breakpoints.down("sm")]: {
			display: "none"
		}
	}
}))


export default function HomePage() {
	const classes = useStyles()
    return ( 
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
  )
}
