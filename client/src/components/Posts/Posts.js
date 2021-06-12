import React from 'react'
import {Grid,CircularProgress} from "@material-ui/core"
import {useSelector} from 'react-redux'

import Post from './Post/Post'
import useStyles from './styles'

function Posts({setCurrentId}) {
    const {posts,isLoading} = useSelector((state) => state.posts )
    const classes = useStyles();

    if(!isLoading && !posts?.length)  return 'No posts'
   // console.log(posts)
  return (isLoading ? <CircularProgress/> :(<Grid className={classes.container} container alignItems="stretch" spacing={3}>
{
    posts.map((post) => (
        <Grid key={post.id} xs={12} sm={12} md={6} lg={4} item>
            <Post post={post} setCurrentId={setCurrentId}/>
        </Grid>
    ))
}
       </Grid>
   )
  )
}

export default Posts
