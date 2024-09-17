import React from "react"
import Header from "../components/header";
import Footer from "../components/footer";
function CodePlayground(params){
    return <div><Header></Header><h1>This is codeplayground page for question id {params.questionid}</h1><Footer></Footer></div>
}
export default CodePlayground;