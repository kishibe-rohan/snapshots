import React,{useState,useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {Container,Grow,Grid,Paper,AppBar,TextField,Button} from '@material-ui/core'
import {useHistory,useLocation} from 'react-router-dom'
import ChipInput from 'material-ui-chip-input';
import useStyles from './styles'

import {getPosts,getPostsBySearch} from '../../actions/posts'
import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import Pagination from '../Pagination/Pagination'


function useQuery()
{
   return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const[currId,setCurrId] = useState(0);
    const history = useHistory();
    const query = useQuery();
    const page = query.get('page') || 1;
   

    const [searchTags,setSearchTags] = useState([]);

    const handleAdd = (tag) => setSearchTags([...searchTags,tag])


    const handleDelete = (deleteTag) => setSearchTags(searchTags.filter((tag) => tag !== deleteTag))

    const searchPost = () => {
      if(searchTags)
      {
        dispatch(getPostsBySearch({tags:searchTags.join(',')}));
        history.push(`/posts/search?tags=${searchTags.join(',')}`);
      }else
      {
        history.push('/')
      }
    }

  return (
    <div>
       <Grow in>
          <Container maxWidth="xl">
              <Grid className={classes.mainContainer} container justify="space-between" alignItems="stretch" spacing={3}>
                  <Grid item xs={12} sm={6} md={9}>
                  <Posts setCurrentId={setCurrId}/>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <AppBar className={classes.appBarSearch} position="static" color="inherit">
                      <ChipInput style={{margin:'10px 0'}} value={searchTags} onAdd={(tag) => handleAdd(tag)} onDelete={(tag) => handleDelete(tag)} label="Search Tags.." variant="outlined"/>
                      <Button onClick= {searchPost} color="primary" variant="contained">
                        Search
                      </Button>
                    </AppBar>
                  <Form currentId={currId} setCurrentId={setCurrId}/>
                  {(!searchTags.length) && (
                     <Paper elevation={6}>
                     <Pagination className={classes.pagination} page={page}/>
                    </Paper>
                 
                  )
                  }
                  </Grid>
              </Grid>
          </Container>
      </Grow>
    </div>
  )
}

export default Home
