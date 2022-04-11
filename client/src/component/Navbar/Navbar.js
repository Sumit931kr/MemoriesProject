import React, { useState, useEffect } from 'react'
import { AppBar, Avatar, Toolbar, Typography, Button } from '@material-ui/core'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import UseStyle from './style'
import memroies from '../../image/memories.png'

const Navbar = () => {

  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const Logout = () => {
    dispatch({ type: 'LOGOUT', })

    Navigate('/auth');
    setUser(null);
  }


  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) Logout();
    }
    setUser(JSON.parse(localStorage.getItem('profile')));

  }, [location,Navigate])


  const classes = UseStyle()
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center"  >Memories</Typography>
        <img className={classes.image} src={memroies} alt="memories" height="60" />
      </div>
      <Toolbar className='{classes.toolbar'>
        {user ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={Logout}>Logout</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar