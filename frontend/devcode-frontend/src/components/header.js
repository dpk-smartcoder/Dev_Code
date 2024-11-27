import React, { useEffect, useState } from "react";
import prLogo from "../images/prLogo.png";
import { NavLink } from "react-router-dom";

function Header() {
    const [isloggedin, setItem] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('usergoogleId')) {
            setItem(true);
        }
    }, []);

    return (
        <div className="bg-blue-950 font-bold flex flex-wrap justify-between items-center p-4">
            <h1 className="text-white text-2xl select-none">
                Dev<span className="text-red-700">Code</span>
            </h1>
            <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
                ☰
            </button>
            <ul className={`md:flex space-x-4 ${menuOpen ? 'block' : 'hidden'} w-full md:w-auto mt-2 md:mt-0`}>
                <li className="text-white text-lg hover:bg-blue-800 rounded-lg p-2 select-none hover:opacity-90">
                    <NavLink to="/">Home</NavLink>
                </li>
                {isloggedin && (
                    <>
                        <li className="text-white text-lg hover:bg-blue-800 rounded-lg p-2 select-none hover:opacity-90">
                            <NavLink to="/pastcontests">Past Contests</NavLink>
                        </li>
                        <li className="text-white text-lg hover:bg-blue-800 rounded-lg p-2 select-none hover:opacity-90">
                            <NavLink to="/upcomingcontest">Upcoming Contest</NavLink>
                        </li>
                        <li className="text-white text-lg hover:bg-blue-800 rounded-lg p-2 select-none hover:opacity-90">
                            <NavLink to="/contribute">Contribute a Question</NavLink>
                        </li>
                        <li className="text-white text-lg hover:bg-blue-800 rounded-lg p-2 select-none hover:opacity-90">
                            <NavLink to="/about">About</NavLink>
                        </li>
                    </>
                )}
                {!isloggedin && (
                    <li className="text-white text-lg hover:bg-blue-800 rounded-lg p-2 select-none hover:opacity-90">
                        <NavLink to="/login">Login</NavLink>
                    </li>
                )}
                {isloggedin && (
                    <li className="text-white text-lg p-2 select-none hover:opacity-90">
                        <NavLink to="/profile">
                            <img
                                src={prLogo}
                                alt="Profile"
                                className="h-8 w-8 rounded-full transition-transform transform hover:scale-110 hover:opacity-80"
                            />
                        </NavLink>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default Header;
