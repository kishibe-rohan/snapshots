import axios from 'axios'

const url = 'http://localhost:5000/posts';

export const fetchPosts = () => axios.get(url);

export const createPost = (newPost) => {
    return axios.post(url,newPost)
}

export const updatePost = (id,postData) => axios.patch(`${url}/${id}`, postData);


export const deletePost = (id) => {
    return axios.delete(`${url}/${id}`)
}

export const likePost = (id) => {
    return axios.patch(`${url}/${id}/likePost`);
}