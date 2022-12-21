import React,{useState,useEffect,useRef} from 'react'
import { Link,useNavigate } from 'react-router-dom';

import axios from "axios"
import "../styles/login.css"
import Header from '../components/Header';

function Adduser() {

useEffect(() => {
  registerRef.current.focus()
}, [])
const navigate= useNavigate()
 const registerRef= useRef()
 const [emailError, setemailError] = useState({
  msg:"error ",
  status:false
 })
    const [detials, setDetials] = useState({
        name:"",
        mobile:"",
        email:"",
        password:"",
        confirm:"",
        profilePicture:"https://imgs.search.brave.com/LMpWnF7RM9zoG60XzzMUHUQdQEEfAqeSp5S_d3Kc1g4/rs:fit:800:800:1/g:ce/aHR0cDovL2xoNS5n/Z3BodC5jb20vX1Mw/Zi1BV3hLVmRNL1M1/VHBVNmtSbVVJL0FB/QUFBQUFBTDRZL3dy/angzXzIza3c0L3M3/Mi1jL2Rfc2lsaG91/ZXR0ZVsyXS5qcGc_/aW1nbWF4PTgwMA"
    })
    const {name,mobile,email,password,confirm}=detials;
    const register=()=>{
      axios.post("http://localhost:3001/user/register",detials).then((response)=>{
        console.log(response.data,response.status);
        if(response.data.status=="email is already used"){
           setemailError({msg:response.data.status,status:true})
        }
        else if(response.data.status=="success"){
          navigate("/admin")
        }

      })

    }
  return (
    <div className='login_container'>
      <Header/>
    <div className="mid_container">
     <header>
      <h1>Add user</h1>
     </header>
     <div className='fields'>
     <label htmlFor="email"><span className='label'>Name</span></label>
      <input ref={registerRef} type="text" name='name' id='email' autoComplete='off' value={detials.name} onChange={(e)=>setDetials({...detials,name:e.target.value})}/>
      <span className='label'>Mobile</span>
      <input type="text" name='mobile' id='' autoComplete='off' value={detials.mobile} onChange={(e)=>setDetials({...detials,mobile:e.target.value})}/>
      <span className='label'>E-mail address</span>
      <input type="email" name='email' id='' autoComplete='off'  value={detials.email} onChange={(e)=>setDetials({...detials,email:e.target.value})}/>
      <span className='register_err' style={{display:emailError.status==true ? "block":"none"}}>{emailError.msg}</span>
      <span className='label'>Password</span>
      <input type="text" name='password' id='eail' autoComplete='off'  value={detials.password} onChange={(e)=>setDetials({...detials,password:e.target.value})}/>
      <span className='register_err' style={{visibility:password.length>=6 && password.length<=10? "hidden":"visible"}}> should contain atleast 6 charectors</span>
      <span className='label'>Confirm Password</span>
      <input type="text" name='confirm' id='' autoComplete='off' value={detials.confirm} onChange={(e)=>setDetials({...detials,confirm:e.target.value})}/>
      <span className='register_err' style={{visibility:password==confirm ? "hidden":"visible"}}>passwords not matching</span>
   
     
     
      <button className='login_btn' onClick={()=>register()} disabled={name=="" || password=="" || mobile=="" || email==""||confirm==""||password!=confirm||password.length<6}>Register</button>
     <Link to="/login"> <span className='register'>Log in</span></Link>
     </div>
      
    </div>
  </div>
  )
}

export default Adduser