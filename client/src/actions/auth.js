import * as api from '../api/index';
import { AUTH } from '../constants/actionTypes';

export const signup = (FormData, Navigate) => async (dispatch) =>{
    try {
        const { data  } = await api.signup(FormData);

        dispatch({ type :AUTH, data})
        
        Navigate('/')
    } catch (error) {
        console.log(error);
    }
}

export const signin = (FormData, Navigate) => async(dispatch) =>{
    try {
        const { data  } = await api.signin(FormData);

        dispatch({ type :AUTH, data})
        Navigate('/')
    } catch (error) {
        console.log(error);
    }
}

export const googlesignup = (googleData, Navigate) => async(dispatch) =>{
    try {
        await api.signupgoogle(googleData);
        Navigate('/')
    } catch (error) {
        console.log(error);
    }
}

export const googlesignin = (googleData, Navigate ) => async (dispatch) =>{
    try {
        await api.signingoogle(googleData);  
        Navigate('/');
    } catch (error) {
        console.log(error);
    }
}


