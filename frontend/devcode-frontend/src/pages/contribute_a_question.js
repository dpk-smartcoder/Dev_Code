import React, { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import axios from "axios";
function ContributeQuestion() {
    const [css, setcss] = useState("");
    const [element, setelement] = useState("");
    const handleSubmit =async (e) => {
        e.preventDefault();
        const r=await axios.post("http://localhost:8000/addquestion",{
            css:css,element:element
        }).then((r)=>{if(r.data===true)alert("Question added succesfully!!");else alert("Some error occured during submission")}).catch((err)=>{console.log.err();});
        setcss("");setelement("");
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-100">
            <Header />
            <main className="flex-grow container mx-auto p-4">
                <h1 className="text-3xl font-bold text-center mb-10 mt-6">Create the CSS Challenge Question</h1>
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-14">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                            HTML Element
                        </label>
                        <textarea
                            id="description"
                            value={element}
                            onChange={(e) => setelement(e.target.value)}
                            required
                            rows="10"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                            Answer CSS
                        </label>
                        <textarea
                            id="description"
                            value={css}
                            onChange={(e) => setcss(e.target.value)}
                            required
                            rows="10"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        ></textarea>
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
