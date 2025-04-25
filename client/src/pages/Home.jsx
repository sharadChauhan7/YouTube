import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import {v4 as uuid4} from 'uuid'
import {Link} from 'react-router-dom'
import Header from '../components/Header.jsx'
import Body from '../components/Body.jsx'
function Home() {
    const [allQuotes ,setAllQuotes] = useState("");
    async function getAllQuotes(){
        try{
            let res = await axios.get("http://localhost:8080");
            console.log(res.data);
            setAllQuotes(res.data);
        }
        catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        getAllQuotes();
    },[]);
  return (
    <div className='bg-black h-screen'>
        <Header/>
        <Body/>
    </div>
  )
}

export default Home