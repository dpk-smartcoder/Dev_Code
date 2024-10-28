import React, { useState , useEffect } from "react"
import Header from "../components/header";
import Footer from "../components/footer";
import axios from "axios";
function UpcomingContest(){
    const [uc,setuc]=useState([]);
   async function navigateToQuestion(p){
        window.location.href=(`/question/${p.qId}/${p._id}/${localStorage.getItem("usergoogleId")}`);
    }
    useEffect(()=>{
        async function temp(){try{
        const r= await axios.get("http://localhost:8000/upcomingcontests");
        setuc(r.data);}
        catch(err){alert("some error occured");}
    }
    temp();
    },[]);
    return <div><Header></Header><h1>This is upcoming contest page</h1>
    {uc.map((u)=>{
        return <div onClick={()=>{navigateToQuestion(u);}}>
            <h2>{u._id}</h2>
            <h2>{u.startTime}</h2>
            <br></br>
            <br></br>
        </div>
    })}
    <Footer></Footer></div>
}
export default UpcomingContest;