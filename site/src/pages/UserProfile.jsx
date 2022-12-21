import axios from 'axios';
import React,{useState,useEffect,useRef} from 'react'
import { useSelector } from 'react-redux';
import {useNavigate} from "react-router-dom"
import { useDispatch } from 'react-redux';
import {useCookies} from "react-cookie"
import Header from '../components/Header';
import { inc,setCurrentUser,fetchCurrentUser, uploadImage } from '../redux/user';
import "../styles/profile.css"
import Spinner from '../components/Spinner';
function UserProfile() {
  const [cookie,setCookie]=useCookies('')
  const navigate=useNavigate()
  useEffect(() => {
    if(!cookie.token){
      navigate("/login")
    }
    dispatch(fetchCurrentUser())
   
  }, [])
  const btnRef=useRef()
  
  const user=useSelector((state)=>state.user)
    const [image, setImage] = useState("")
   async function  selectImage(e){
        console.log(e.target.files[0]);
        setImage(URL.createObjectURL(e.target.files[0]))
        
        const formdata=new FormData()
        formdata.append("file",e.target.files[0])
        
       dispatch(uploadImage({formdata,id:user.currentUser._id}))
        
    }
    const dispatch=useDispatch()
  return (
    <>
    <Header/>
    <div className="profile_container">
    {user.loading ? <Spinner/> :null}
    {/* {console.log(profile.currentUser,"==profilr")} */}
    <div class="container">
      
      <div class="image" onClick={()=>btnRef.current.click()}>
        <img  src={image ? image : user.currentUser.profilePicture} alt="image" /><br/>
      </div>
<input style={{display:"none"}} ref={btnRef} className='fileInput' type="file"  onChange={(e)=>selectImage(e)}/>  
      <div class="details">
        <h1>{user.currentUser.name}</h1>
        <h3 class="title">{user.currentUser.email}</h3>
        <p className='mt-4'>Mob:{user.currentUser.mobile}</p>
      
      </div>
      
    </div>
    
    </div>
    </>
  )
}

export default UserProfile