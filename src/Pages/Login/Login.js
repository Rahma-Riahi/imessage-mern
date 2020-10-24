import React from 'react'
import GoogleLogin from 'react-google-login';
import './Login.css';
import {selectUser, login, logout} from '../../features/userSlice';
import {useDispatch, useSelector} from 'react-redux';
import { Redirect } from 'react-router-dom';
function Login(props) {
    const user = useSelector(selectUser);
     const dispatch = useDispatch();
  
    const responseGoogle = (response) => {
        console.log(response.profileObj);
        dispatch(
            login({
             uid: response.profileObj.googleId,
             photos: response.profileObj.imageUrl,
             email:response.profileObj.email,
             displayName : response.profileObj.name
            })
        );
        
        props.history.push('/imessage')
      }
    return (
        <div className='login'>
            <div className="login__logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/56/IMessage_logo_%28Apple_Inc.%29.png"
          alt=""
        />

        <h1> iMessage</h1>
      </div>
              <GoogleLogin
              className='login__button'
                clientId="453088597452-l7h2h12vnke09hsqstvgt7m3mj5puinp.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}

export default Login
