import {makeStyles} from '@material-ui/core'

export default makeStyles(() => ({
   appBar:{
       borderRadius:15,
       margin:'30px 0',
       display:'flex',
       flexDirection:'row',
       justifyContent: 'center',
       alignItems: 'center',
       backgroundColor:'rgba(0,183,255,0.75)'
   },
   heading:{
       color:'white'
   },
   image:{
       marginLeft:'15px',
   }
}))