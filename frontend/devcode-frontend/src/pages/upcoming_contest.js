import React, { useState, useEffect } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import axios from "axios";

// Method to give a shortened name to a longer unique ID
function generateMeaningfulName(id) {
    const baseName = "Contest"; // Base name
    const numericSuffix = parseInt(id) % 100; // Generate a numeric suffix (last 2 digits)
    return `${baseName}${numericSuffix}`;
}

// Function to format the date and time
function formatDateTime(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with zero
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month and pad with zero
    const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year
    const hours = String(date.getHours()).padStart(2, '0'); // Get hours and pad with zero
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Get minutes and pad with zero

    return {
        date: `${day}/${month}/${year}`, // Return formatted date
        time: `${hours}:${minutes}` // Return formatted time
    };
}

function UpcomingContest() {
    const [uc, setUc] = useState([]);

    async function navigateToQuestion(p) {
        window.location.href = `/question/${p.qId}/${p._id}/${localStorage.getItem("usergoogleId")}`;
    }

    useEffect(() => {
        async function fetchUpcomingContests() {
            try {
                const response = await axios.get("http://localhost:8000/upcomingcontests");
                setUc(response.data);
            } catch (err) {
                alert("Some error occurred");
            }
        }
        fetchUpcomingContests();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Header />
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold text-center mb-8">Upcoming Contests</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {uc.map((u) => {
                        const meaningfulName = generateMeaningfulName(u._id); // Generate meaningful name
                        const { date, time } = formatDateTime(u.startTime); // Format start time

                        return (
                            <div
                                key={u._id}
                                onClick={() => { navigateToQuestion(u); }}
                                className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 cursor-pointer"
                            >
                                <div className="p-4">
                                    <h2 className="text-xl font-semibold text-gray-800">{meaningfulName}</h2>
                                    {/* <p className="text-gray-600">Contest ID: {u._id}</p> */}
                                    <p className="text-gray-600">Date: {date}</p>
                                    <p className="text-gray-600">Time: {time}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default UpcomingContest;