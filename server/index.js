//Import dependencies and packages
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js'

//set up server
const app = express();

app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
app.use(cors());

//connect to MongoDB
const CONNECTION_URL = ''   //your mongo conenction URL goes here
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true}).then(() => {
app.listen(PORT,() => console.log(`Server running on PORT ${PORT}`))
}).catch((error) => {
   console.log(error.message)
})

mongoose.set('useFindAndModify',false);

//set up routes
app.use('/posts',postRoutes);
