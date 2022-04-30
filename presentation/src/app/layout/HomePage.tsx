import React, {useState, useEffect} from 'react'
import {  Grid, makeStyles} from "@material-ui/core"
import Leftbar from "./Leftbar"
import Feed from "./Feed"
import Rightbar from "./Rightbar"
import usePosts from '../hooks/usePosts'
import { useAppDispatch, useAppSelector } from '../store/storeConfig'
import { fetchAllTags } from '../../features/tags/tagSlice';
import {Tag} from "../models/tag"

const useStyles = makeStyles(theme => ({
    right: {
        [theme.breakpoints.down("sm")]: {
            display: "none"
        }
    }
}))


export default function HomePage() {
    const classes = useStyles()
    const [tags, setTags] = useState<Tag[]>([])
    const dispatch = useAppDispatch()

    // TODO: init posts and tags store
    const {posts, loadingPosts, paginatedData} = usePosts()

    useEffect(() => {
        dispatch(fetchAllTags())
            .unwrap()
            .then((data) => {
                console.log("tags", data)
                setTags(data)
                console.log("tags", tags)
            })
            .catch((err: any) => console.log("fetch tags failed", err))
    }, [])

    return ( 
        <Grid container>
            <Grid item sm={2} xs={4}>
            <Leftbar />
        </Grid>
        <Grid item sm={7} xs={10}>
            {posts.length > 0 && <Feed posts={posts} /> }
        </Grid>
        <Grid item sm={3} className={classes.right}>
            {tags.length > 0 &&  <Rightbar tags={tags} />}
        </Grid>
    </Grid>
  )
}
