import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import axios from "axios";

function ContestRanking() {
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

    const [urank, seturank] = useState("-");
    const [ranks, setranks] = useState([]);

    async function fetchQuestion() {
        try {
            const r = await axios.post("http://localhost:8000/conteststandings", { cId });
            setranks(r.data);
            for (let i = 0; i < r.data.length; i++) {
                if (r.data[i].uId === uId) { seturank(`${i + 1}`); }
            }
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchQuestion();
    }, []);

    const { qId, cId, uId } = useParams();

    return (
        <div className="bg-gray-100 min-h-screen">
            <Header />
            <div className="container mx-auto px-4 py-8">
                <div className="text-center mb-6">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Contest Rankings</h1>
                    <h3 className="text-xl font-medium text-gray-600">Your Rank: <span className="text-blue-600 font-semibold">{urank}</span></h3>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6 transform transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <ul className="list-disc space-y-4">
                        {ranks.map((user, index) => {
                            const { date, time } = formatDateTime(user.t);
                            return (
                                <li key={index} className="flex items-center justify-between p-4 border-b border-gray-200 last:border-b-0">
                                    <div className="flex items-center space-x-4">
                                        <span className="text-lg font-medium text-gray-800">{index + 1}.</span>
                                        <div>
                                            <p className="text-base font-semibold text-gray-800">{user.userDetails.name}</p>
                                            <p className="text-sm text-gray-500">User  ID: {user.userDetails.email}</p>
                                        </div>
                                    </div>
                                    <p className="text-lg text-gray-500">{time}</p>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ContestRanking;