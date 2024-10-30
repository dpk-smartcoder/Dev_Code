import React, { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import axios from "axios";

function ContributeQuestion() {
    const [css, setCss] = useState("");
    const [element, setElement] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/addquestion", {
                css: css,
                element: element,
            });
            if (response.data === true) {
                alert("Question added successfully!!");
            } else {
                alert("Some error occurred during submission");
            }
        } catch (err) {
            console.error(err);
        }
        setCss("");
        setElement("");
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-100">
            <Header />
            <main className="flex-grow container mx-auto p-4">
                <h1 className="text-3xl font-bold text-center mb-10 mt-6 text-gray-800">
                    Create the CSS Challenge Question
                </h1>
                <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 mb-14 transition-transform duration-300 hover:shadow-xl">
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="element">
                            HTML Element
                        </label>
                        <textarea
                            id="element"
                            value={element}
                            onChange={(e) => setElement(e.target.value)}
                            required
                            rows="5"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-200 ease-in-out hover:border-blue-500 focus:border-blue-500"
                        ></textarea>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="css">
                            Answer CSS
                        </label>
                        <textarea
                            id="css"
                            value={css}
                            onChange={(e) => setCss(e.target.value)}
                            required
                            rows="5"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-200 ease-in-out hover:border-blue-500 focus:border-blue-500"
                        ></textarea>
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline transition duration-200 ease-in-out transform hover:scale-105"
                        >
                            Submit Question
                        </button>
                    </div>
                </form>
            </main>
            <Footer />
        </div>
    );
}

export default ContributeQuestion;