import React from "react";
import homePic from "../images/HomePic.png"
import Header from "../components/header";
import Footer from "../components/footer";

function Home() {
  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-10">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Welcome to Dev Code</h1>
          <p className="text-lg text-gray-600 mb-6">
            Dev Code is a platform for holding programming contests. Participate
            in challenges, solve problems, and climb the leaderboard.
          </p>
          <div className="flex justify-center space-x-4 mb-8">
            <button className="bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800">
              View Contests
            </button>
            <button className="border border-black py-2 px-6 rounded-md hover:bg-gray-200">
              Solve Problems
            </button>
          </div>
          <img
            className="mx-auto rounded-lg w-1/2"
            src={homePic}
            alt="Programming Contest"
          />
        </div>

        {/* Upcoming Contests Section */}
        <div>
          <h2 className="text-3xl font-semibold mb-4">Upcoming Contests</h2>
          <p className="text-gray-600 mb-8">
            Check out the upcoming programming contests on Dev Code.
          </p>

          {/* Contest List */}
          <div className="flex space-x-8 mb-12">
            <div className="w-1/2 bg-gray-100 p-6 rounded-lg shadow hover:bg-slate-200">
              <h3 className="text-xl font-bold mb-2">1. First Contest</h3>
              <p className="text-gray-600 mb-1">Started 20 hours ago</p>
              <p className="text-gray-600 mb-4">Duration: 40 minutes</p>
              <button className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800">
                Participate
              </button>
            </div>

            <div className="w-1/2 bg-gray-100 p-6 rounded-lg shadow hover:bg-slate-200">
              <h3 className="text-xl font-bold mb-2">2. Second Test Contest</h3>
              <p className="text-gray-600 mb-1">Starts in 15 hours</p>
              <p className="text-gray-600 mb-4">Duration: 40 minutes</p>
              <button className="bg-gray-200 text-black py-2 px-4 rounded-md hover:bg-gray-300">
                View Contest
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;