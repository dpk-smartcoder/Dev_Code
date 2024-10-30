import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import pic from "../images/sideImg.png";
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import axios from "axios";

 function Login() {
  const onSuccess = async (response) => {
    await axios.post('http://localhost:8000/login',{
      response
    })
    .then((response) => {
      localStorage.setItem('usergoogleId',response.data);
      console.log(localStorage.getItem('usergoogleId'));
      window.location.href=("/");
    })
    .catch((error) => {
       alert("error occured during logging in : "+error);
    });
  };

  const onFailure = (error) => {
    alert('Login failed:'+ error);
  };
  return (
    <div>
      <Header></Header>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-300 via-purple-400 to-purple-500">
        <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden mb-24 mt-20 p-12 hover:bg-slate-100">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-gray-50">
            <h2 className="text-3xl font-bold text-purple-600 mt-5">Login</h2>
            <p className="text-gray-600 mb-6 mt-5">Welcome back! Please login to your account.</p>
            <div className="mt-6 text-center">
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
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-md ml-8 w-full transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-gray-100">
            <img
              src={pic}
              alt="Login Illustration"
              className="w-96 h-auto mb-10 mt-20"
            />
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Login;