import React from 'react';
import './App.css';
import { GoogleLogin } from 'react-google-login';
import axios from "axios"

function App() {


  const responseGoogleSuccess = (response) => {
    console.log(response);
   axios({
     method: "POST",
     url:"/googleLogin",
     data: {tokenId: response.tokenId}
   }).then(response => {
     console.log(response)
   })
  }

  const responseGoogleError = (error) => {
    console.log(error);
  }
  return (
    <div className="App">
      Google authentication:
      <GoogleLogin
        clientId="906236579266-e1isgkemkp73tp9auo6jioj065gghqq9.apps.googleusercontent.com"
        buttonText="Login using google"
        onSuccess={responseGoogleSuccess}
        onFailure={responseGoogleError}
        cookiePolicy={'single_host_origin'}
      />

    </div>
  );
}

export default App;
