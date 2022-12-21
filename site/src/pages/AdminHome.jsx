import React,{useEffect} from 'react'

import AdminSidebar from '../components/AdminSidebar'
import UserManagemant from '../components/UserManagemant'
import "../styles/adminhome.css"
import { useSelector } from 'react-redux'
import { Cookies, useCookies } from 'react-cookie'
import Header from '../components/Header'
import { Navigate, useNavigate } from 'react-router-dom'
function AdminHome() {
  const navigate=useNavigate()
  const [Cookies,deleteCookies]=useCookies()
 useEffect(()=>{
    if(!Cookies.admin){
      navigate("/adminlogin")
    }
 },[])
  return (
    <div className='adminhome_container'>
        <div className='admin_container'>
        
        <UserManagemant/>
        </div>
    </div>
  )
}

export default AdminHome