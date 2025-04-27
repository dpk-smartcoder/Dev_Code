import React, { useEffect,useState } from "react";
import homePic from "../images/HomePic.png"
import Header from "../components/header";
import Footer from "../components/footer";

function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const userGoogleId = localStorage.getItem("usergoogleId");
    setIsAuthenticated(!!userGoogleId); // Check if user is authenticated
  }, []);

  async function upcoming(e) {
    e.preventDefault();
    if (isAuthenticated) {
      window.location.href = "/upcomingcontest";
    } else {
      window.location.href="/login";
    }
  }

  async function past(e) {
    e.preventDefault();
    if (isAuthenticated) {
      window.location.href = "/pastcontests";
    } else {
      window.location.href="/login";
    }
  }
  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-10 select-none">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Welcome to Dev Code</h1>
          <p className="text-lg text-gray-600 mb-6">
            Dev Code is a platform for holding programming contests. Participate
            in challenges, solve problems, and climb the leaderboard.
          </p>
          <div className="flex justify-center space-x-4 mb-8">
            <button onClick={upcoming} className="bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800" >
              Upcoming Contests
            </button>
            <button onClick={past} className="border border-black py-2 px-6 rounded-md hover:bg-gray-200" >
              Solve Past Problems
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
          <h2 className="text-3xl font-semibold mb-4">Would you like to test your skills?</h2>
          <p className="text-gray-600 mb-8">
            Check out the upcoming programming contests on Dev Code.
          </p>

          {/* Contest List */}
          <div className="flex space-x-8 mb-12">
            <div className="w-96 bg-gray-100 p-6 rounded-lg shadow hover:bg-slate-200">
              <h3 className="text-xl font-bold mb-2">See Upcoming Contest</h3>
              <button onClick={upcoming} className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800">
                Participate
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