import React,{useState} from 'react'
import moment from 'moment'
import {Card,CardActions,CardContent,CardMedia,Button,Typography} from "@material-ui/core"
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import useStyles from './styles'

function Post({post,setCurrentId}) {
    const classes = useStyles();
    const [raise,setRaise] = useState(false);

    const addShadow = () => {setRaise(true)};
    const removeShadow = () => {setRaise(false)};
    
  return (
   <Card className={classes.card} onMouseOver={addShadow} onMouseOut={removeShadow} raised={raise} >
       <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
       <div className={classes.overlay}>
           <Typography variant = "h5">{post.title}</Typography>
           <Typography variant = "body2">by {post.creator} </Typography>
           <Typography variant = "body2">{moment(post.createdAt).fromNow()}</Typography>
       </div>

       <div className={classes.overlay2}>
           <Button style={{color:'white'}} size="small" onClick = {() => setCurrentId(post._id)}>
               <MoreHorizIcon fontSize = "default"></MoreHorizIcon>
           </Button>
       </div>

       <div className={classes.details}>
       <Typography variant = "body2" color="textSecondary">
           {post.tags.map((tag) => `# ${tag}`)}
        </Typography>
        </div>

        <CardContent>
        <Typography variant = "h5" className={classes.title} gutterBottom>
           {post.description}
        </Typography>
        </CardContent>

        <CardActions className={classes.classActions}>
            <Button size="small" color="primary" onClick={() => {}}>
                <InsertEmoticonIcon fontSize="small" />
                {post.likeCount}
            </Button>

            <Button size="small" color="primary" onClick={() => {}}>
                <DeleteIcon fontSize="small" />
                  Delete
            </Button>
        </CardActions>
      
   </Card>
  )
}

export default Post
