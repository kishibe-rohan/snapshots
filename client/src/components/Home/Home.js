import React,{useState,useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {Container,Grow,Grid} from '@material-ui/core'

import useStyles from './styles'

import {getPosts} from '../../actions/posts'
import Posts from '../Posts/Posts'
import Form from '../Form/Form'

const Home = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const[currId,setCurrId] = useState(null);

    useEffect(() => {
        dispatch(getPosts())
    },[currId,dispatch])

  return (
    <div>
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
    </div>
  )
}

export default Home
