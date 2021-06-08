import React,{useState} from 'react'
import {useDispatch} from 'react-redux'
import moment from 'moment'
import {Card,CardActions,CardContent,CardMedia,Button,Typography} from "@material-ui/core"
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import DeleteIcon from '@material-ui/icons/Delete';
import BrushIcon from '@material-ui/icons/Brush';

import useStyles from './styles'
import {deletePost,likePost} from '../../../actions/posts'

function Post({post,setCurrentId}) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [raise,setRaise] = useState(false);

    const addShadow = () => {setRaise(true)};
    const removeShadow = () => {setRaise(false)};
    
  return (
   <Card className={classes.card} onMouseOver={addShadow} onMouseOut={removeShadow} raised={raise} >
       <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
       <div className={classes.overlay}>
           <Typography variant = "body2">by {post.creator} </Typography>
           <Typography variant = "body2">{moment(post.createdAt).fromNow()}</Typography>
       </div>

       <div className={classes.overlay2}>
           <Button style={{color:'white'}} size="small" onClick = {() => setCurrentId(post._id)}>
               <BrushIcon fontSize="default"></BrushIcon>
           </Button>
       </div>

       <div className={classes.details}>
       <Typography variant = "body2" color="textSecondary">
           {post.tags.map((tag) => `#${tag}  `)}
        </Typography>
        </div>

        <Typography className={classes.title} variant = "h5" gutterBottom>{post.title}</Typography>

        
        <CardContent>
        <Typography variant = "body2" color="textSecondary" gutterBottom>
           {post.description}
        </Typography>
        </CardContent>

        <CardActions className={classes.classActions}>
            <Button size="small" color="primary" onClick={() => dispatch(likePost(post._id))}>
                <InsertEmoticonIcon fontSize="small" />
                &nbsp;  {post.likeCount} &nbsp; 
            </Button>

            <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
                <DeleteIcon fontSize="small" />
                  Delete
            </Button>
        </CardActions>
      
   </Card>
  )
}

export default Post
