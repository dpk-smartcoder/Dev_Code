import React,{useState,useEffect} from "react";
import axios from "axios";
import Header from "../components/header";
import Footer from "../components/footer";
function PastContests(){const [pc,setpc]=useState([]);
 async function navigateToQuestion(p){
        window.location.href=(`/question/${p.qId}/${p._id}/${localStorage.getItem("usergoogleId")}`);
    }
    useEffect(()=>{
        async function temp(){try{
        const r= await axios.get("http://localhost:8000/pastcontests");
        setpc(r.data);}
        catch(err){alert("some error occured");}
    }
    temp();
    },[]);
    return <div><Header></Header><h1>This is past contest page</h1>
    {pc.map((u)=>{
        return <div onClick={()=>{navigateToQuestion(u);}}>
            <h2>{u._id}</h2>
            <h2>{u.startTime}</h2>
            <br></br>
            <br></br>
        </div>
    })}
    <Footer></Footer></div>
}
export default PastContests;