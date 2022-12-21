import React, { useState, useEffect, useRef } from "react";
import axios from "axios"
import {useCookies} from "react-cookie"
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { useDispatch } from "react-redux";
import { editUser } from "../redux/user";
function Adminlogin() {
 const [cookie,setCookie]=useCookies("admin")
 const dispatch=useDispatch()
  useEffect(() => {
    if(cookie.admin){
      navigate('/admin')
     }else if(cookie.token){
      navigate('/')
     }
    inputRef.current.focus();
    dispatch(editUser())
    
    
  }, []);
  const navigate=useNavigate()
  const inputRef = useRef();
  const [passwordShow, setpasswordShow] = useState(false);
  const [Credentials, setCredentials] = useState({
    userName: "",
    password: "",
  });
  const [submissionFlag,setSubmissionFlag]=useState(false)
const [Emailerr,setEmailErr]=useState("")
const [passworderr,setPasswordErr]=useState(false)



  function showpasswordToggle() {
    setpasswordShow(!passwordShow);
  }


  function loginSumbit(){

    setSubmissionFlag(true)
    axios.post("http://localhost:3001/admin/login",{adminName:Credentials.userName,password:Credentials.password}).then((response)=>{
      console.log(response.data);
      if(response.data.status=="success"){
        setSubmissionFlag(false)
        setCookie("admin",response.data.token)
        navigate("/admin")
       
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
         
          <h1>Admin</h1>
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
         
        </div>
      </div>
    </div>
  );
}

export default Adminlogin;
