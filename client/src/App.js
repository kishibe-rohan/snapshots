import React,{useState,useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {Container,AppBar,Typography,Grow,Grid} from '@material-ui/core'

import {getPosts} from './actions/posts'
import artlogo from './images/artlogo.png'
import Posts from './components/Posts/Posts'
import Form from './components/Form/Form'
import useStyles from './styles'

function App() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const[currId,setCurrId] = useState(null);

    useEffect(() => {
        dispatch(getPosts())
    },[currId,dispatch])

  return (
    <Container maxWidth="lg">
      <AppBar position="static" color="inherit" className={classes.appBar}>
      <img src = {artlogo} alt="ArtHouse" height= "120" className={classes.image} />
          <Typography variant="h2" align="center" className={classes.heading}>Art <span className={classes.logo}>House</span></Typography>
         
      </AppBar>
      <Grow in>
          <Container>
              <Grid className={classes.mainContainer} container justify="space-between" alignItems="stretch" spacing={3}>
                  <Grid item xs={12} sm={7}>
                  <Posts setCurrentId={setCurrId}/>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                  <Form currentId={currId} setCurrentId={setCurrId}/>
                  </Grid>
              </Grid>
          </Container>
      </Grow>
    </Container>
  )
}

export default App
