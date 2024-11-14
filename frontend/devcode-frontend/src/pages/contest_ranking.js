import React from "react";
import { useParams} from "react-router-dom";
import { useEffect,useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import axios from "axios";
function ContestRanking(){
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
    const [urank,seturank]=useState("-");
    const [ranks,setranks]=useState([]);
    async function fetchQuestion() {
        try {
            const r = await axios.post("http://localhost:8000/conteststandings", { cId: cId });
            setranks(r.data);
            for(let i=0;i<r.data.length;i++){
                if(r.data[i].uId===uId){seturank(`${i+1}`);} 
            }
        } catch (err) {
            console.error(err);
        }
    }
    useEffect(() => {
        fetchQuestion();
        
    }, []);
    const { qId, cId, uId } = useParams();
    return <div>
    <Header></Header>
    {/* <h1>contest rankings</h1>
    <h1> for Question ID {parseInt(qId)%1000}, Contest {parseInt(cId)%1000}, User ID {parseInt(uId)%1000}</h1>
    <h1>Your Rank = {urank}</h1>
    {ranks.map((u,index)=>{
    const { date, time } = formatDateTime(u.t);   
    return <div>
    <p>rank : {index+1} username : {u.userDetails.name} userid : {u.userDetails.email} time : {time}</p><br></br>
    </div>})} */}
     <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center content-center"><h1 className="text-3xl font-bold mb-4">Contest Rankings</h1></div>
      <div className="flex justify-center content-center"><h3 className="text-xl font-medium mb-4">Your Rank = {urank}</h3></div>
      <br></br>
      <div className="flex justify-center content-center">
      <ul className="list-disc space-y-4 w-1/2">
        {ranks.map((user, index) => {
          const { date, time } = formatDateTime(user.t);
          return (
            <li key={index} className="flex items-center justify-between">
              <div className="flex space-x-4">
                <span className="text-lg font-medium">{index + 1}.</span>
                <div>
                  <p className="text-base font-normal">{user.userDetails.name}</p>
                  <p className="text-sm text-gray-500">User ID: {user.userDetails.email}</p>
                </div>
              </div>
              <p className="text-lg text-gray-500">{time}</p>
            </li>
          );
        })}
      </ul></div>
    </div>
    <Footer></Footer>
    </div>
}
export default ContestRanking;