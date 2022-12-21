const express=require("express")
const LoginControllers = require("../controllers/LoginControllers")
const jwt=require("jsonwebtoken")
const route=express.Router()
const login=require("../controllers/LoginControllers")
const userManagement=require("../controllers/userManagement")
const { use } = require("./user")




route.post("/login",(req,res)=>{
    login.adminLogin(req.body).then((result)=>{
        
        if(result.status=="success"){
            console.log("this");

          res.set("authadmin",result.token)
          console.log("setted",res.get("authadmin"));
        }
        res.send(result)
        console.log(res.header.auth,"auth");
    })
})

route.get("/users",(req,res)=>{
   userManagement.getUsers(req.query).then(result=>{
    res.json({users:result.allUsers,count:result.count})
   })
})

route.post("/usersearch",(req,res)=>{
    console.log(req.query);
    userManagement.searchUser(req.query.name).then(result=>{
        res.send({user:result})
    })
})
route.delete("/userdelete",(req,res)=>{
    console.log(req.body.delete);
   userManagement.deleteUser(req.body.id)
})

route.get("/edituser/:id",(req,res)=>{
    userManagement.editUser(req.params.id).then((result)=>{
        res.send(result)
    })
})

route.post("/userupdate",(req,res)=>{
    userManagement.updateUser(req.body).then(response=>[
        res.send({response})
    ])
    
})


module.exports=route