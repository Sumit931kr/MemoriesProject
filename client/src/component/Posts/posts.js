import React from 'react'
import { useSelector } from 'react-redux'
import { Grid, CircularProgress } from '@material-ui/core'
import Post from './post/post.js'

import UseStyle from './styles'

const Posts = ( {setcurrentId ,showalertdanger , showalertsuccess}) => {
    const posts = useSelector((state) => state.posts);
    const classes = UseStyle()

    return (
        !posts.length ? <CircularProgress /> : 
            <Grid className={classes.container} container alignItems="stretch" spacing={3} >
                {posts.map((post) => (
                        <Grid key={post._id} item xs={12} sm={6}>
                            <Post post={post}  setcurrentId={setcurrentId} showalertdanger ={showalertdanger} showalertsuccess={showalertsuccess} />
                        </Grid>
                ))}
            </Grid>
        
    )
}

export default Posts