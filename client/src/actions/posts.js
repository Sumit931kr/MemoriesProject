import * as api from '../api/index';
import { FETCH_ALL, DELETE, UPDATE, CREATE , LIKE} from '../constants/actionTypes';
// Action Creators

export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        dispatch({ type : FETCH_ALL, payload: data});
    } catch (error) {
        console.log(error);
    }
}



export const updatepost = (id, post) => async (dispatch) => {
    
    // const post = req.body;
    // const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        const {data} = await api.updatepost(id, post);

        dispatch({ type: UPDATE, payload: data })
    } catch (error) {
        console.log(error)
        
    }
}
 
export const createpost= (post) => async (dispatch) =>{
  
    try {
        const { data } = await api.createpost(post);
        dispatch({type: CREATE , payload : data })
    } catch (error) {
        console.log(error)
        
    }
}

export const deletepost = (id) => async (dispatch) => {
    try {
        await api.deletepost(id);

        dispatch({type : DELETE , payload : id })
    } catch (error) {
        console.log(error);
    } 
}

export const likePost = (id) => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('profile'));
  
    try {
      const { data } = await api.likePost(id, user?.token);
      dispatch({ type: LIKE, payload: data });
    } catch (error) {
      console.log(error);
    }
  };