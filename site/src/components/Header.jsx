import React,{useEffect,useState} from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {useCookies} from "react-cookie"
import "../styles/header.css"

function Header() {
    const [cookie,setCookie,removeCookie]=useCookies("")
    const user=useSelector((state)=>state.user)
  return (
    <div className='header_container'>
       <Link to={cookie.admin ? "/admin" : "/"}><h4>{cookie.admin ? "Admin" : "HOME"}</h4></Link> 
       
      {/*  <h6 role="button"> </h6></Link> */}
      <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
  {cookie.admin ? "admin" : user.currentUser.name }
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
 < Link to={cookie.admin ? "/admin" : "/profile"} > <li><a class="dropdown-item" href="#">{cookie.admin ? "users" :"profile"}</a></li></Link>
    <li><hr class="dropdown-divider"/></li>

    < Link to="/login"><li onClick={()=>{removeCookie("token")
    removeCookie("admin")}}><a class="dropdown-item" href="#" >log out</a></li></Link>
    
  </ul>
</div>
    </div>
  )
}

export default Header