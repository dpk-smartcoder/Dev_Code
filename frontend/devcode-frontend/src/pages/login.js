import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import pic from "../images/sideImg.png";
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import axios from "axios";

 function Login() {
  const onSuccess = async (response) => {
    // Handle successful login
    // Send user data to backend for storage
    await axios.post('http://localhost:8000/login',{
      response
    })
    .then((response) => {
      localStorage.setItem('usergoogleId',response.data);
      console.log(localStorage.getItem('usergoogleId'));
      window.location.href=("/");
      // Redirect or handle login success as needed
    })
    .catch((error) => {
       alert("error occured during logging in : "+error);
    });
  };

  const onFailure = (error) => {
    // Handle login failure
    alert('Login failed:'+ error);
  };
  return (
    <div>
      {/* Header Component */}
      <Header></Header>

      {/* Login Form */}
    
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-300 via-purple-400 to-purple-500">
        <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden mb-24 mt-20 p-4 hover:bg-slate-100">
          {/* Left Side: Login Form */}
          <div className="p-6 md:w-1/2 max-w-sm mx-auto bg-white rounded-lg justify-center mt-18 shadow-md text-center hover:bg-slate-50">
            
            <h2 className="text-3xl font-bold text-purple-600 mt-5">Login</h2>
            <p className="text-gray-600 mb-6 mt-5">Welcome back! Please login to your account.</p>
            <div className="mt-6 text-center">
              {/* <p className="text-gray-500">or login with</p> */}
              <div className="flex justify-center mt-6 space-x-4 mb-16">
<GoogleOAuthProvider clientId="945598768011-d5g5phun47i9s3dn24k3v6dc3s2idcre.apps.googleusercontent.com">
                <GoogleLogin
  onSuccess={onSuccess}
  onError={onFailure}
  ></GoogleLogin></GoogleOAuthProvider>
              </div>
            </div>
            <p className="text-gray-900">Unleash your creativity and showcase your skills! Every entry is a step closer to greatness—let your passion shine!</p>
          </div>

          {/* Right Side: Illustration */}
          <div className="hidden md:block md:w-1/2 p-6 bg-gradient-to-r from-purple-100 to-purple-300 flex items-center justify-center">
            <img
              src={pic}
              alt="Login Illustration"
              className="w-96 h-auto mb-10 mt-20"
            />
          </div>
        </div>
  
      </div>

      {/* Footer Component */}
      <Footer></Footer>
    </div>
  );
}

export default Login;