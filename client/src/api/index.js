import axios from 'axios';

const API = axios.create({ baseURL : 'http://localhost:5000' })

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization  = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
   
  return req;
})

export const fetchPosts = () => API.get('/posts');
export const createpost = (newPost) => API.post('/posts', newPost);
export const updatepost = (id, updatedpost) => API.patch(`/posts/${id}`, updatedpost );
export const deletepost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`)

export const signup = (FormData) => API.post('/users/signup', FormData);
export const signin = (FormData) => API.post('/users/signin', FormData);

