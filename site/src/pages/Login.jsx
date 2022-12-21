import React, { useState, useEffect, useRef } from "react";
import axios from "axios"
import {useCookies} from "react-cookie"
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button"
import "../styles/login.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser ,inc} from "../redux/user";
import { Cookies } from 'react-cookie'

function Login() {
  const [cookies,setCookies,removeCookie]=useCookies(['token'])

  // useEffect(() => {
  // if(cookies.token){
  //   navigate(-1)
  // }
  //   inputRef.current.focus();
  // }, []);
  const navigate=useNavigate()
  const inputRef = useRef();
  const dispatch=useDispatch()
  const [passwordShow, setpasswordShow] = useState(false);
  const [Credentials, setCredentials] = useState({
    userName: "",
    password: "",
  });
  const [submissionFlag,setSubmissionFlag]=useState(false)
const [Emailerr,setEmailErr]=useState("")
const [passworderr,setPasswordErr]=useState(false)

useEffect(()=>{
 if(cookies.token){
  navigate('/')
 }else if(cookies.admin){
  navigate('/admin')
 }


},[])


  function showpasswordToggle() {
    setpasswordShow(!passwordShow);
  }


  function loginSumbit(){

    setSubmissionFlag(true)
    axios.post("http://localhost:3001/user/login",{userName:Credentials.userName,password:Credentials.password}).then((response)=>{
      console.log(response.data);
      if(response.data.status=="success"){
        console.log("cccc",response);
        // localStorage.setItem('token',response.data.tocken)
        setSubmissionFlag(false)
        console.log("login success",response.data.user.id);
        dispatch(setCurrentUser(response.data.user))
        localStorage.setItem("id",response.data.user._id  )
        
         setCookies('token',response.data.tocken,{maxAge:300})
         
        navigate("/")
      }
      else{
         setPasswordErr(true)
         setSubmissionFlag(false)
      }
    }).catch((err)=>{
   console.log(err);
    })
  }


  return (
    <div className="login_container">
      <div className="mid_container">
        <header>
         
          <h1>Login</h1>
        </header>
        <div className="fields">
          <span className="label">E-mail address</span>
          <input
            onChange={(e) =>
              setCredentials({ ...Credentials, userName: e.target.value })
            }
            ref={inputRef}
            value={Credentials.userName}
            type="text"
            name="email"
            id="email"
            autoComplete="off"
          />
          <span style={{fontSize:"13px",color:"red"}}>{ Emailerr}</span>
          <span className="label">Password</span>
          <div className="input_password">
            <input
              onChange={(e) =>
                setCredentials({ ...Credentials, password: e.target.value })
              }
              value={Credentials.password}
              type={passwordShow ? "text" : "password"}
              name="password"
              id="password"
            />
           
            <button className="passToggle" onClick={() => showpasswordToggle()} style={{visibility:Credentials.password=="" ? "hidden" : "visible"}}>
              {passwordShow ? "hide" : "show"}
            </button>
          </div>
          <span style={{fontSize:"13px",color:"red"}}>{passworderr?"invalid username or password" : null}</span>

          <button
           disabled={Credentials.userName=="" || Credentials.password==""}
            className="login_btn"
            onClick={() => {
              loginSumbit()
            }}
          >
            {submissionFlag ?  "s":"log in"}
          </button>
          <Link to="/register">
          <span className="register">New here? register</span>
          </Link>
         
        </div>
      </div>
    </div>
  );
}

export default Login;
