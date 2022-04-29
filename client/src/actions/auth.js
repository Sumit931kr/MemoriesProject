import * as api from '../api/index';
import { AUTH } from '../constants/actionTypes';

export const signup = (FormData, Navigate , showalertsuccess , showalertdanger ) => async (dispatch) =>{
    try {
        const { data  } = await api.signup(FormData);

        dispatch({ type :AUTH, data})  
        Navigate('/')
        showalertsuccess("Signup is Successfull")
    } catch (error) {
        console.log(error);
        showalertdanger("User Already Exits");
    }
}

export const signin = (FormData, Navigate , showalertsuccess , showalertdanger ) => async(dispatch) =>{
    try {
        const { data  } = await api.signin(FormData);
        dispatch({ type :AUTH, data})
        Navigate('/');
        showalertsuccess("Signup is Successfull")
    } catch (error) {
        console.log(error);
        showalertdanger("Invalid Details")
    }
}

export const googlesignup = (googleData, Navigate , showalertsuccess , showalertdanger ) => async(dispatch) =>{
    try {
        await api.signupgoogle(googleData);
        Navigate('/');
        showalertsuccess("Signup is Successfull")
    } catch (error) {
        console.log(error);
        showalertdanger("Invalid Details")
    }
}

export const googlesignin = (googleData, Navigate , showalertsuccess , showalertdanger ) => async (dispatch) =>{
    try {
        await api.signingoogle(googleData);  
        Navigate('/');
        showalertsuccess("Signup is Successfull")
    } catch (error) {
        console.log(error);
        showalertdanger("Invalid Details")
    }
}


