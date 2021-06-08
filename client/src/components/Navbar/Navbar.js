import React from 'react'
import {Link} from 'react-router-dom'
import {AppBar,Avatar,Typography,Toolbar,Button} from '@material-ui/core'
import useStyles from './styles'
import artlogo from '../../images/artlogo.png'

const Navbar = () => {
    const classes = useStyles();
    const user =null;
  return (
    <div>
       <AppBar position="static" color="inherit" className={classes.appBar}>
           <div className={classes.brandContainer}>
             <Typography component={Link} to="/" variant="h2" align="center" className={classes.heading}>Art <span className={classes.logo}>House</span></Typography>
             <img src = {artlogo} alt="ArtHouse" height= "120" className={classes.image} /> 
           </div>

           <Toolbar className={classes.toolbar}>
{user? (
<div className={classes.profile}>
 <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
 <Typography className={classes.userName} variant="h4">{user.result.name}</Typography>
 <Button variant = "contained" className={classes.logout} color="secondary">Log Out</Button>
</div>
):<Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button> }
           </Toolbar>
      </AppBar>
    </div>
  )
}

export default Navbar
