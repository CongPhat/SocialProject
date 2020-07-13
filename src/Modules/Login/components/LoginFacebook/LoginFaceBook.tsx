import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import {ACTION_LOGIN} from '@Store/Reducer/Login/Login.Action';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import {Token} from '@Config/variable';
import FacebookLogin from 'react-facebook-login';


const thumbFacebook = require('@assets/images/facebook.png').default;
console.log(thumbFacebook);


interface Props {

}

const LoginFaceBook: React.FC<Props> = ({history}: RouteComponentProps) => {
  const [user, setUser] = useState<string>('');
  const dispath = useDispatch();
  const responseFacebook = (response: any) => {
    console.log(response);
  }
  const componentClicked = () => {
    console.log('click')
  }

  useEffect(() => {
    (function() {
      var e = document.createElement('script');
      e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
      e.async = true;
      document.getElementById('fb-root').appendChild(e);
    }())

    console.log(window);


    window.fbAsyncInit = function() {
      window.FB.init({
        appId  : '304779517227376',
        status : true, // check login status
        cookie : true, // enable cookies to allow the server to access the session
        xfbml  : true,  // parse XFBML
        version : 'v4.0'
      });
      window.FB.getLoginStatus(function(response: any) {
        console.log(response);
      });
    };
  }, [])

  const handleLoginFacebook = () => {
    FB.login(function(res: Object){
      console.log(res);
    });
  }

  const handleLogoutFacebook = () => {
    FB.logout(function(res: Object){
      console.log(res);
    });
  }

  return (
    // <FacebookLogin
    //   appId="304779517227376"
    //   autoLoad={true}
    //   fields="name,picture"
    //   onClick={componentClicked}
    //   callback={responseFacebook} />
    <div>
      <div id="fb-root"></div>
      <button onClick={handleLoginFacebook}>
        <img src={thumbFacebook} alt=""/>
      </button>
      <button onClick={handleLogoutFacebook}>
        <img src={thumbFacebook} alt=""/>
      </button>
    </div>
  )
}

export default withRouter(LoginFaceBook)
