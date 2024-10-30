import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import aboutPic from "../images/AboutPic.png";

function About() {
    return (
        <div>
            <Header />
            <div className="bg-gray-50 min-h-screen flex flex-col items-center p-6 select-none">
                {/* Main Content Section */}
                <div className="flex max-w-6xl w-full space-x-8 mt-16 mb-12">
                    {/* Left Card for Text Content */}
                    <div className="flex-1 p-8 bg-white rounded-lg shadow-lg hover:bg-slate-50">
                        <h2 className="text-orange-600 font-bold text-sm">How It Started</h2>
                        <h1 className="text-4xl font-extrabold text-gray-900 mt-2">
                            Our Dream is <br /> Global Learning Transformation
                        </h1>
                        <p className="text-gray-700 mt-6">
                            Welcome to Dev Code, your ultimate destination for CSS enthusiasts and coding wizards alike. We are a dynamic platform dedicated to hosting thrilling CSS contests that challenge your creativity, sharpen your skills, and connect you with a vibrant community of like-minded developers.

                            At Dev Code, we believe in fostering innovation and excellence in web design. <br/> <br /> <br />Our contests are meticulously crafted to push the boundaries of what's possible with CSS, providing a stage for both beginners and experts to showcase their talents. Whether you're looking to learn, compete, or simply get inspired, Dev Code is the place to be.

                            Join us on this exciting journey and take your CSS prowess to new heights. Let's code, create, and conquer together!
                        </p>
                    </div>

                    {/* Right Card for Image and Contributors Section */}
                    <div className="flex flex-col items-center">
                        {/* Contributor Image */}
                        <div className="w-72 h-72 bg-gray-200 overflow-hidden hover:scale-105 transition-transform duration-300 shadow-lg mb-4">
                            <img src={aboutPic} alt="About" className="w-full h-full object-cover" />
                        </div>

                        {/* Contributors Section */}
                        <div className="flex space-x-4">
                            <div className="p-5 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition-all duration-300 text-center">
                                <h3 className="text-xl font-bold text-gray-900">Ashish</h3>
                                <p className="text-gray-500">Contributor</p>
                            </div>
                            <div className="p-5 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition-all duration-300 text-center">
                                <h3 className="text-xl font-bold text-gray-900">Deepak</h3>
                                <p className="text-gray-500">Contributor</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default About;