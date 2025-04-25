import React from 'react'
import { useState,useEffect } from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios';
function Show() {
    const [quote,setQuote] = useState("");

    let {id}  = useParams();
    async function getData(){
        try{
            console.log(id);
            let res = await axios.get(`http://localhost:8080/${id}`);
            console.log(res.data);
            setQuote(res.data);
        }
        catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        getData();
    },[]);
  return (
    <>
    {quote &&<div>
        <div>Author:{quote.author} </div>
    <div>Ouote:{quote.quote}</div>
    <div>Time:{quote.createdAt}</div>
    </div> }
    </>
  )
}

export default Show