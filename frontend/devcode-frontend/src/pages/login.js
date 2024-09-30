import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import pic from "../images/sideImg.png";

function Login() {
  return (
    <div>
      {/* Header Component */}
      <Header></Header>

      {/* Login Form */}
    
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-300 via-purple-400 to-purple-500">
        <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Left Side: Login Form */}
          <div className="p-6 md:w-1/2 max-w-sm mx-auto bg-white rounded-lg shadow-md text-center">
            <h2 className="text-3xl font-bold text-purple-600 mb-4">Login</h2>
            <p className="text-gray-600 mb-6">
              Don't have an account yet?{" "}
              <a href="#" className="text-purple-500 hover:underline">
                Sign Up
              </a>
            </p>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="you@example.com"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter 6 characters or more"
                />
              </div>
              <div className="flex items-center justify-between mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-purple-500"
                  />
                  <span className="ml-2 text-gray-700">Remember me</span>
                </label>
                <a href="#" className="text-purple-500 hover:underline">
                  Forgot Password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300"
              >
                Login
              </button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-gray-500">or login with</p>
              <div className="flex justify-center mt-4 space-x-4">
                <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center hover:bg-gray-100">
                  <img
                    src="https://img.icons8.com/color/24/000000/google-logo.png"
                    alt="Google"
                    className="mr-2"
                  />
                  Google
                </button>
                <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center hover:bg-gray-100">
                  <img
                    src="https://img.icons8.com/color/24/000000/facebook.png"
                    alt="Facebook"
                    className="mr-2"
                  />
                  Facebook
                </button>
              </div>
            </div>
          </div>

          {/* Right Side: Illustration */}
          <div className="hidden md:block md:w-1/2 p-6 bg-gradient-to-r from-purple-100 to-purple-300 flex items-center justify-center">
            <img
              src={pic}
              alt="Login Illustration"
              className="w-96 h-auto mt-20"
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