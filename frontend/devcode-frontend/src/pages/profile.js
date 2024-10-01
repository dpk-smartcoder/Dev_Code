import React, { useEffect, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import axios from "axios";
function Profile(){
    const [user,setuser]=useState(null);
    async function get(){
        var u=localStorage.getItem('usergoogleId');
        if(u){
        const r= await axios.post("http://localhost:8000/getuserdetails",{u});
        setuser(r.data);}
        }
    function logout(){
        localStorage.removeItem('usergoogleId');
        window.location.href='/';
    }
    useEffect(()=>{
        get();
    },[]);
    return <div>
        <Header></Header>
        <h1>name: {user===null?"unknown":user.name}</h1>
        <h1>email: {user===null?"unknown":user.email}</h1>
        <button onClick={logout}>LogOut</button>
        <Footer></Footer>
    </div>
}
export default Profile;