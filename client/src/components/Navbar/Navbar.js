import React,{useState,useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {Link,useHistory,useLocation} from 'react-router-dom'
import decode from 'jwt-decode'
import {AppBar,Avatar,Typography,Toolbar,Button} from '@material-ui/core'
import useStyles from './styles'
import artlogo from '../../images/artlogo.png'

const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const Logout = () => {
         dispatch({type:'LOGOUT'});
         history.push('/auth');

         setUser(null);
    }

   // console.log(user)

   useEffect(() => {
       const token = user?.token;

       if(token)
       {
        const decodedToken = decode(token);
        if(decodedToken.exp * 1000 < new Date().getTime())
        Logout();
       }

       setUser(JSON.parse(localStorage.getItem('profile')));
   },[location])

  return (
    <div>
       <AppBar position="static" color="inherit" className={classes.appBar}>
           <div className={classes.brandContainer}>
           <img src = {artlogo} alt="ArtHouse" height= "100" className={classes.image} /> 
             <Typography component={Link} to="/" variant="h2" align="center" className={classes.heading}>Art <span className={classes.logo}>House</span></Typography>
            
           </div>

           <Toolbar className={classes.toolbar}>
{user? (
<div className={classes.profile}>
 <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
 <Typography className={classes.userName} variant="h4">{user.result.name}</Typography>
 <Button variant = "contained" className={classes.logout} color="secondary" onClick={Logout}>Log Out</Button>
</div>
):<Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button> }
           </Toolbar>
      </AppBar>
    </div>
  )
}

export default Navbar
