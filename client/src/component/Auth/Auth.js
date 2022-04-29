import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


import { AUTH } from '../../constants/actionTypes';
import useStyle from './style'
import Input from './input'
import Icon from './Icon'
import { signup, signin , googlesignup, googlesignin} from '../../actions/auth';


const InitialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

const Auth = ({showalertsuccess , showalertdanger}) => {


  const classes = useStyle();
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [FormData, setFormData] = useState(InitialState);
  
  const handleShowPassword = () => setShowPassword(!showPassword);
  
  const switchMode = () => {
    setFormData(InitialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
  
    e.preventDefault();
    if(isSignup){
      if(FormData.password === FormData.confirmPassword){
      dispatch(signup(FormData, Navigate, showalertsuccess , showalertdanger))
      }
     else{
        showalertdanger("Password Doesn't Match")
     } 
    }else{
      dispatch(signin(FormData, Navigate,  showalertsuccess , showalertdanger))
     
    }
  };
  
  const handleChange = (e) => {
    setFormData({ ...FormData, [e.target.name]: e.target.value })
  }
  
  
  const googleSuccess = async (res) => {
    const result = await res?.profileObj;
    const token = await res?.tokenId;
 const googleData = ({email : result?.email , firstName : result?.givenName, lastName : result?.familyName})

     dispatch({ type: AUTH, data: { result, token } });
    if(isSignup){
      try {
        dispatch(googlesignup(googleData, Navigate, showalertsuccess , showalertdanger)) 
        // props.showalertsuccess("Success full Google signup")
      } catch (error) {
        console.log(error);
        // props.showalertdanger("Failed the Google Signup")
      }
    }
    else{
      try {
        dispatch(googlesignin(googleData, Navigate, showalertsuccess , showalertdanger));
        // props.showalertsuccess("Success full signin")
      } catch (error) {
        console.log(error);
        // props.showalertdanger("Failed the Google Signin")
      }

    }
    
  };

  const googleError = () => alert('Google Sign In was unsuccessful. Try again later');

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">{isSignup ? 'Sign up' : 'Sign in'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
              </>
            )}
            
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>

          <GoogleLogin
            clientId="1035790105407-ndv1h019hnbb91c49q4jgakb5q1ffe12.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Auth;