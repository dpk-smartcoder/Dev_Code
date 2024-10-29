import React,{useEffect,useState} from "react";
import { useParams } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import axios from "axios";
import styled from 'styled-components';
function CodePlayground(){
    const [e,sete]=useState("");
    const [q,setq]=useState(null);
    const [i,seti]=useState(null);
    const [css,setcss]=useState("");
    const [v,setv]=useState(false);
    const { qId, cId,uId } = useParams();
    const [DynamicElement,setD]=useState(styled.div`
        width:427px;
        ${css}
        height:320px !important;
      `);
    async function temp(){
        try {console.log(qId);
              const response = await axios.post("http://localhost:8000/question", { qId:qId });
              setq(response.data);
              sete(response.data.element);
              seti(response.data.image);
          } catch (err) {
            console.error(err);
          }
       }
    async function check(e) {
        e.preventDefault();try{
        const r= await axios.post("http://localhost:8000/submit",{css:css,qId:qId,cId:cId});
        if(r.data===true){
            setv(true);
            alert("correct answer!!!");
        }
        else alert("xxxx incorrect xxxx");}catch(err){console.log(err);}
    }
    useEffect(()=>{
    temp(); 
    },[]);
    return <div><Header></Header><h1>This is codeplayground page for question id {qId} ,Contest id {cId} and your user id {uId}</h1>
    <div>
        <h2>Element</h2>
        <p>{e}</p>
        <div className="flex space-x-10 h-80">
        <img src={`data:image/png;base64,${i}`} alt=" element" className="h-80"/>
        <DynamicElement className="h-80" dangerouslySetInnerHTML={{ __html: e }} />
        </div>
    </div>
    <br></br>
    <h1 hidden={!v}>submitted</h1>
    <form className="pb-16">
    <div className="flex-col flex">
                        <label  htmlFor="description">
                            Answer CSS
                        </label>
                        <textarea
                            id="description"
                            value={css}
                            onChange={(e) => {setcss(e.target.value);
                                try{setD(styled.div`
                                    width:427px;
                                    ${css}
                                    height:320px !important;
                                  `)}catch(err){};
                            }}
                            required
                            rows="10"
                        ></textarea>
                    </div>
                    <div>
                        <button
                            onClick={check}
                            type="submit"
                            
                        >
                            Submit
                        </button>
                    </div></form>
    <Footer></Footer></div>
}
export default CodePlayground;