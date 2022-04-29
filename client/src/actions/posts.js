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



export const updatepost = (id, post, showalertdanger, showalertsuccess) => async (dispatch) => {
    
    try {
        const {data} = await api.updatepost(id, post);

        dispatch({ type: UPDATE, payload: data })
        showalertsuccess("Post Updated Successfully")
    } catch (error) {
        console.log(error)
        showalertdanger("Post Didn't Updated")
    }
}
 
export const createpost= (post , showalertdanger, showalertsuccess) => async (dispatch) =>{
  
    try {
        const { data } = await api.createpost(post);
        dispatch({type: CREATE , payload : data })
        showalertsuccess("Post Created Successfully")
    } catch (error) {
        console.log(error)
        showalertdanger("Post Didn't Created")
    }
}

export const deletepost = (id ,showalertdanger , showalertsuccess) => async (dispatch) => {
    try {
        await api.deletepost(id);

        dispatch({type : DELETE , payload : id })
        showalertsuccess("Post Deleted !!")
    } catch (error) {
        console.log(error);
        showalertdanger("Post Can't be Deleted")
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