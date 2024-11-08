import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import axios from "axios";
import styled from 'styled-components';
function CodePlayground() {
    const [element, setElement] = useState("");
    const [question, setQuestion] = useState(null);
    const [image, setImage] = useState(null);
    const [css, setCss] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { qId, cId, uId } = useParams();
    const [DynamicElement,setD]=useState(styled.div`
    .body{
        width:417px !important;
        height:320px !important;
        }
        ${css}
        
      `);
    async function fetchQuestion() {
        try {
            const response = await axios.post("http://localhost:8000/question", { qId: qId });
            setQuestion(response.data);
            setElement(`<div class="body">${response.data.element}</div>`);
            setImage(response.data.image);
        } catch (err) {
            console.error(err);
        }
    }

    async function check(e) {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/submit", { css: css, qId: qId, cId: cId ,uId:uId});
            if (response.data === true) {
                setIsSubmitted(true);
                alert("Correct answer!!!");
            } else {
                alert("xxxx incorrect xxxx");
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchQuestion();
    }, []);

    return (
        <div className="bg-gray-900  min-h-screen p-5 mb-12">
            <Header />
            <div className="flex justify-end p-4"><button  className="text-center text-lg font-bold text-white bg-gray-600 px-4 py-2 rounded-lg" onClick={async ()=>{ window.location.href = `/rankings/${qId}/${cId}/${uId}`;}}>Contest Rankings</button>
            </div>
            <p className="mb-4 text-purple-600 text-center font-bold ">HTML for question</p>
            <div className="flex justify-center">
            <p className="mb-4 text-gray-400 text-center max-w-80">{element}</p></div>
            <div className="flex justify-between mb-6">
                <div className="flex flex-col items-center w-1/2 ">
                    <h2 className="text-xl font-bold text-white">Element</h2>
                    <br></br>
                    <img src={`data:image/png;base64,${image}`} alt="Element" className="h-80 pt-9 mb-4 transition-transform duration-300 hover:scale-105" />
                </div>
                <div className="flex flex-col items-center w-2/3 p-4">
                    <h2 className="text-xl mb-2 font-bold text-white">Output</h2>
                    <div className="border-2 h-80 w-auto mt-9 flex justify-center items-center bg-gray-800 relative">
                        {/* <style>
                            {`
                                .output-container {
                                    height:320px;
                                    width:427px;
                                    ${css}
                                }
                            `}
                        </style> */}
                        <DynamicElement className="h-80" dangerouslySetInnerHTML={{ __html: element }} />
                        {/* <div className="output-container" dangerouslySetInnerHTML={{ __html: `<body>${element}</body>` }} /> */}
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
            <h1 className={`text-xl text-white font-bold w-36 rounded-sm text-center bg-green-600 mb-4 ${!isSubmitted && "hidden"}`}>Submitted</h1>
            </div><form className="flex flex-col items-center text-white" onSubmit={check}>
                <label htmlFor="description" className="mb-2 text-lg">Answer CSS</label>
                <textarea
                    id="description"
                    value={css}
                    onChange={(e) => {setCss(e.target.value);
                                {setD(styled.div`
                                .body{
                                    width:417px !important;
                                    height:320px !important;
                                    }
                                    ${css}
                                  `)}
                            }}
                    required
                    rows="10"
                    className="w-full max-w-md h-40 border border-white bg-gray-800 text-white p-2 mb-4 rounded-lg resize-none focus:border-purple-500 focus:outline-none"
                />
                <button
                    type="submit"
                    className="bg-purple-600 text-white py-2 px-4 rounded-lg transition-colors duration-300 hover:bg-purple-500"
                >
                    Submit
                </button>
            </form>
            <Footer />
        </div>
    );
}

export default CodePlayground;