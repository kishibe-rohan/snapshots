import React,{useState,useEffect} from 'react'
import FileBase from 'react-file-base64'
import {Paper,TextField,Button,Typography} from '@material-ui/core'
import {useDispatch,useSelector} from 'react-redux'

import {createPost,updatePost} from '../../actions/posts'
import useStyles from './styles'

function Form({currentId,setCurrentId}) {
    const [postData,setPostData] = useState({
        creator:'',title:'',description:'', tags:'',selectedFile:''
    })

    const dispatch = useDispatch();

const post = useSelector((state) => currentId? state.posts.find((p) => p._id === currentId):null)
 const classes = useStyles();

 useEffect(() => {
   if(post) setPostData(post);
 },[post])

 const handleSubmit = (e) => {
   e.preventDefault();

   if(currentId)
   {
    dispatch(updatePost(currentId,postData))
    
   }

   else dispatch(createPost(postData))

   resetForm();
 }

 const resetForm = () => {
    setCurrentId(null);
    setPostData({ creator: '', title: '', description: '', tags: '', selectedFile: '' });
 }

  return (
   <Paper className={classes.paper}>
       <form autoComplete = "off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
<Typography variant="h6">{currentId? 'Editing' : 'Creating'} Art..</Typography>
<TextField name="creator" variant = "outlined" label="Artist" fullWidth value = {postData.creator} onChange = {(e) => setPostData({...postData,creator:e.target.value})}/>
<TextField name="title" variant = "outlined" label="Title" fullWidth value = {postData.title} onChange = {(e) => setPostData({...postData,title:e.target.value})}/>
<TextField name="description" variant = "outlined" label="Description" fullWidth value = {postData.description} onChange = {(e) => setPostData({...postData,description:e.target.value})}/>
<TextField name="tags" variant = "outlined" label="Tags" fullWidth value = {postData.tags} onChange = {(e) => setPostData({...postData,tags:e.target.value.split(',')})}/>
<div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
<Button className={classes.buttonSubmit} variant="contained" size="large" color="primary" type="submit" fullWidth>Share Your Art</Button>
<Button className={classes.buttonClear} variant="contained" size="small" onClick={resetForm} fullWidth>Reset Form</Button>
 </form>
 </Paper>
  )
}

export default Form
