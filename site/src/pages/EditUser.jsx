import React,{useState,useEffect,useRef} from 'react'
import { Link,useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';

import axios from "axios"
import "../styles/login.css"
import { editUser } from '../redux/user';
import Spinner from '../components/Spinner';

function Edituser() {
const dispatch=useDispatch()
const st=useSelector((state)=>state.user)
useEffect(() => {
  registerRef.current.focus()
  dispatch(editUser())
  
  setDetials(st.editinguser)
  console.log("hai",st.editinguser);
 
}, [])
const navigate= useNavigate()
 const registerRef= useRef()

 const [emailError, setemailError] = useState({
  msg:"error ",
  status:false
 })



    
    const [detials, setDetials] = useState({})
    const {name,mobile,email,password,confirm}=detials;
    const updateUser=()=>{
      axios.post("http://localhost:3001/admin/userupdate",detials).then((response)=>{
        navigate("/admin")
      })

    }
  return (
    <div className='login_container'>
      {st.loading ? <Spinner/> : null}
    <div className="mid_container">
     <header>
        
      <h1>Edit user</h1>
     </header>
     <div className='fields'>
     <label htmlFor="email"><span className='label'>Name</span></label>
      <input ref={registerRef} type="text" name='name' id='email' autoComplete='off' value={detials.name} onChange={(e)=>setDetials({...detials,name:e.target.value})}/>
      <span className='label'>Mobile</span>
      <input type="text" name='mobile' id='' autoComplete='off' value={detials.mobile} onChange={(e)=>setDetials({...detials,mobile:e.target.value})}/>
      <span className='label'>E-mail address</span>
      <input type="email" name='email' id='' autoComplete='off'  value={detials.email} onChange={(e)=>setDetials({...detials,email:e.target.value})}/>
      <span className='register_err' style={{display:emailError.status==true ? "block":"none"}}>{emailError.msg}</span>
      
      
     
     
      <button className='login_btn' onClick={()=>updateUser()}>Update</button>
    
     </div>
      
    </div>
  </div>
  )
}

export default Edituser