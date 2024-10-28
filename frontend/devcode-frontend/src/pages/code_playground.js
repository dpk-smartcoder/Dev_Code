import React,{useEffect,useState} from "react";
import { useParams } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import axios from "axios";
function CodePlayground(){
    const [e,sete]=useState("");
    const [q,setq]=useState(null);
    const [i,seti]=useState(null);
    const { qId, cId,uId } = useParams();
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
    useEffect(()=>{
    temp(); 
    },[]);
    return <div><Header></Header><h1>This is codeplayground page for question id {qId} ,Contest id {cId} and your user id {uId}</h1>
    <div>
        <h2>Element</h2>
        <p>{e}</p>
        {<img src={`data:image/png;base64,${i}`} alt=" element" />}
    </div>
    <Footer></Footer></div>
}
export default CodePlayground;