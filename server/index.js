//Import dependencies and packages
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js'

//set up server
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
app.use(cors());

//connect to MongoDB
mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true}).then(() => {
app.listen(port,() => console.log(`Server running on Port: ${port}`))
}).catch((error) => {
   console.log(error.message)
})

mongoose.set('useFindAndModify',false);

//set up routes
app.use('/posts',postRoutes);
