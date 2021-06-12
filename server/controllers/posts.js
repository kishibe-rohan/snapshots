import PostMessage from '../models/postModels.js'
import mongoose from 'mongoose'

export const getPosts = async (req,res) => {
    const {page} = req.query;

   try{
       const LIMIT = 6;       //number of posts per page
       const startIndex = (Number(page) - 1) * LIMIT;       //index of first post of a page
       const totalPosts = await PostMessage.countDocuments();
       const posts = await PostMessage.find().sort({_id:-1}).limit(LIMIT).skip(startIndex);
    //console.log(postMessages);
    res.json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(totalPosts / LIMIT)});
   }catch(error)
   {
       res.status(404).json({message:error.message})
   }
 }

 export const getPostsBySearch = async (req,res) => {

    const {tags} = req.query;
     try{
        const posts = await PostMessage.find({tags:{$in:tags.split(',')}})
        res.json({data:posts})
     }
     catch{
        res.status(404).json({ message: error.message });
     }
 }

 export const getPost = async(req,res) => {
     const {id} = req.params;
     try{
         const post = await PostMessage.findById(id);
         res.status(200).json(post);

     }catch(error)
     {
         res.status(404).json({message:error.message})
     }
 }

 export const createPost = async (req, res) => {
    const post = req.body;

    const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


export const updatePost = async(req,res) => {
    const {id} = req.params;
    const { title, description, creator, selectedFile, tags } = req.body;

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).send('Post not found!')
    }

    const updatedPost = { creator, title, description, tags, selectedFile, _id: id };

    
    await PostMessage.findByIdAndUpdate(id,updatedPost,{new:true})

    res.json(updatedPost)
}

export const deletePost = async(req,res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).send('Post not found!')
    }

    await PostMessage.findByIdAndRemove(id);

    res.json({message:'Post deleted successfully'})

}

export const likePost = async(req,res) => {
    const {id} = req.params;


    if(!req.userId)
    return res.json({message:'User not authenticated'})

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).send('Post not found!')
    }

    const post = await PostMessage.findById(id)

    const alreadyLiked = post.likes.findIndex((id) => id === String(req.userId))

    if(alreadyLiked === -1)
    {
        post.likes.push(req.userId)
    }else
    {
        post.likes = post.likes.filter((id) => id !== String(req.userId))
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id,post,{new:true})

    res.status(200).json(updatedPost)
}