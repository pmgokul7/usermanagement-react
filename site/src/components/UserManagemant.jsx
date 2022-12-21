import React,{useEffect,useRef} from 'react'
import axios from "axios"
import "../styles/usermanagement.css"
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchusers } from '../redux/user'
import { useState } from 'react'
import { Pagination } from '@mui/material'
import { searchUser } from '../redux/user'
import Spinner from './Spinner'
import Header from './Header'
function UserManagemant() {


  
  const st=useSelector((state)=>state.user)
  const [deleteuserc,setDeleteuser]=useState(false)
  const [details, setDetials] = useState({   })
  const [page,setPage]=useState(1)
  const dispatch=useDispatch();
  
const [users,setUsers]=useState([])
const [user,setUser]=useState("")
  useEffect(()=>{
    dispatch(fetchusers(page))
    setUsers(st.user)
  },[page,deleteuserc])

const submitSearch=(e)=>{
  e.preventDefault()
  dispatch(searchUser(user))
}

function deleteuser(id){
 axios.delete("http://localhost:3001/admin/userdelete",{data:{id:id}}).then(res=>{
   console.log("deleted");
   setDeleteuser(!deleteuserc)
 })
}
function handleChange(event, value){
  setPage(value)
}
  return (
   
    <div className='userManagement_container position-relative'>
      <Header/>
      {st.loading==true ? <Spinner/> : null}
      <form onSubmit={(e)=>submitSearch(e)}>
          <input value={user} onChange={(e)=>setUser(e.target.value)} type="text" placeholder='search users..' style={{width:"500px",margin:"auto",marginTop:"60px"}}/>
        </form>
       <Link  to="/admin/adduser"> <button className='btn btn-primary float-end mt-2 me-4  '>Add user</button></Link>
        <table class="table table-striped m-4">
  <thead>
    <tr>
      <th scope="col">#</th>

      <th></th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Mobile</th>
    </tr>
  </thead>
  <tbody>
    {console.log("alshgfhagjkfh",st.user)}
    {st.user.map((obj,index)=> <tr>
      <th scope="row">{index+1}</th>
      <td><img src={obj.profilePicture} alt="" width="30px" /></td>
      <td>{obj.name}</td>
      <td>{obj.email}</td>
      <td>{obj.mobile}</td>
      <td>
   
     

      </td>
      <td>
        <Link to="/edituser"><i onClick={()=>localStorage.setItem("editId",obj._id)} role="button"  class="fa-sharp fa-solid fa-pen btn btn-warning p-2 rounded text-light me-4 "></i></Link>
        <i onClick={()=>deleteuser(obj._id)} role="button" class="fa-solid fa-trash btn btn-danger p-2 rounded text-light"></i></td>
        
    </tr>)}
   
    
    
  </tbody>

</table>

  <div className="pagination_container">
    <Pagination count={Math.ceil(st.count/8)} page={page} variant="outlined" className='pagination' onChange={handleChange}/>
   </div>
    </div>
  )
}

export default UserManagemant