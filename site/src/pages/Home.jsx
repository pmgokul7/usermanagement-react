import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Header from '../components/Header'
import { inc,setCurrentUser,fetchCurrentUser } from '../redux/user';

import {useCookies} from "react-cookie"
import { useDispatch } from 'react-redux';

import "../styles/home.css"
import Spinner from '../components/Spinner';

function Home() {
  const user=useSelector((state)=>state.user)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [cookie,setCookie]=useCookies("token")

  useEffect(()=>{
  dispatch(fetchCurrentUser())
  if(!cookie.token){
    console.log(cookie.token);
    navigate("/login")
  }
  },[])
  return (
    <div className='home_container'>
      <Header/>
       <div className="home_content">
        Home page
       </div>
       
    </div>
  )
}

export default Home