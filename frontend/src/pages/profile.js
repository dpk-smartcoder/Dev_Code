import React, { useEffect, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import axios from "axios";

function Profile() {
    const [user, setUser ] = useState(null);

    async function get() {
        var u = localStorage.getItem('usergoogleId');
        if (u) {
            const r = await axios.post("http://localhost:8000/getuserdetails", { u });
            setUser (r.data);
        }
    }

    function logout() {
        localStorage.removeItem('usergoogleId');
        window.location.href = '/';
    }

    useEffect(() => {
        get();
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-grow flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-gray-100">
                    <h1 className="text-2xl font-bold mb-4 text-center">User  Profile</h1>
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold">Name:</h2>
                        <p className="text-gray-700">{user === null ? "Unknown" : user.name}</p>
                    </div>
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold">Email:</h2>
                        <p className="text-gray-700">{user === null ? "Unknown" : user.email}</p>
                    </div>
                    <button
                        onClick={logout}
                        className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition duration-200"
                    >
                        Log Out
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Profile;