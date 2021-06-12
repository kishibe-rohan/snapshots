import React,{useState,useEffect} from 'react'
import FileBase from 'react-file-base64'
import {Paper,TextField,Button,Typography} from '@material-ui/core'
import {useDispatch,useSelector} from 'react-redux'

import {createPost,updatePost} from '../../actions/posts'
import useStyles from './styles'

function Form({currentId,setCurrentId}) {
    const [postData,setPostData] = useState({
        title:'',description:'', tags:'',selectedFile:''
    })

    const dispatch = useDispatch();

const user = JSON.parse(localStorage.getItem('profile'))
const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));
const classes = useStyles();

useEffect(() => {
  if(post) setPostData(post);
},[post])

const resetForm = () => {
  setCurrentId(0);
  setPostData({ title: '', description: '', tags: '', selectedFile: '' });
}



 const handleSubmit = async (e) => {
   e.preventDefault();

   if(currentId === 0)
   {
    await dispatch(createPost({...postData,name:user?.result?.name}))
    resetForm();
   }

   else {
     await dispatch(updatePost(currentId,{...postData,name:user?.result?.name}))
     resetForm();
   }


 }

 
 

 if(!user?.result?.name)
 {
   return(
     <Paper className={classes.paper}>
       <Typography variant = "h6" align="center">
         Please Sign In To Showcase Your Art 
       </Typography>
     </Paper>
   )
 }

  return (
   <Paper className={classes.paper} elevation={6}>
       <form autoComplete = "off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
<Typography variant="h6">{currentId? 'Editing' : 'Creating'} Art..</Typography>
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
