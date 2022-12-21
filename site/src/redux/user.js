import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import  axios  from "axios"

 export const fetchusers=createAsyncThunk("user/fetchusers",async(page)=>{
    const response=await axios.get(`http://localhost:3001/admin/users?page=${page}`)
    return response.data
})

export const fetchCurrentUser=createAsyncThunk("user/fetchCurrentUser",async()=>{
    const userid=localStorage.getItem("id")
    const response=await axios.get(`http://localhost:3001/user/getcurrent/${userid}`)
    return response.data
})

export const editUser=createAsyncThunk('user/editUser',async()=>{
    const userId=localStorage.getItem("editId")
  const response=await axios.get(`http://localhost:3001/admin/edituser/${userId}`)
  return response.data
})

export const searchUser=createAsyncThunk("user/searchUser",async(query)=>{
const response=await axios.post(`http://localhost:3001/admin/usersearch?name=${query}`)
return response.data
})

export const uploadImage=createAsyncThunk("user/uploadImage",async(data)=>{
    console.log("id",data.id);
    const response=await axios.post(`http://localhost:3001/user/imageupload/${data.id}`,data.formdata) 
    return response.data
})

const userSlice=createSlice({
    name:"user",
    initialState:{
        currentUser:{},
        name:"",
        user:[],
        count:0,
        editinguser:{},
        loading:false
    },
    reducers:{
        inc:(state)=>{
            state.count+=5
        },
        setUsers:(state,action)=>{
            state.user=action.payload
        }
        ,
        setCurrentUser:(state,action)=>{
            state.name=action.payload.name
            state.currentUser=action.payload
        
        },
        // editUser:(state,action)=>{
        //     state.editinguser=
        // }
    },
    extraReducers:{
        [fetchusers.pending]:(state,action)=>{
          state.loading=true
        },
        [fetchusers.fulfilled]:(state,action)=>{
            console.log(action);
           state.user=action.payload.users
           state.count=action.payload.count
           state.loading=false
        },
        [fetchCurrentUser.fulfilled]:(state,action)=>{
            state.currentUser=action.payload
        },
        [editUser.pending]:(state,action)=>{
            state.loading=true
       },
        [editUser.fulfilled]:(state,action)=>{
            console.log(action.payload);
            state.editinguser=action.payload
            state.loading=false
        },
       
        [searchUser.fulfilled]:(state,action)=>{
            console.log(action.payload.users);
            state.user=action.payload.user
        },
        [uploadImage.fulfilled]:(state,payload)=>{
           console.log("payload",payload);
           state.loading=false
        },
        [uploadImage.pending]:(state,payload)=>{
            state.loading=true
        }
    }

})

export const {inc,setCurrentUser}=userSlice.actions
export default userSlice.reducer