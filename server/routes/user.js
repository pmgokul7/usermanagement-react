const express=require("express")
const login=require("../controllers/LoginControllers")

const db=require("../config/connection")
const userManagement=require("../controllers/userManagement")
const { ObjectID } = require("bson")
const cloudinary = require('cloudinary').v2

const route=express.Router()




route.post("/register",(req,res)=>{
    login.userRegister(req.body).then(result=>{
        if(result.inserted){
            res.status(200).send({status:"success"})
        }
        else{
            res.send({status:"email is already used"})
        }

    })
    console.log(req.body);
})

route.post("/login",(req,res)=>{
    login.userLogin(req.body).then(result=>{

        if(result.status=="success"){
            res.set('auth',result.tocken)
            res.send({status:"success",tocken:result.tocken,user:result.user})
            console.log(res.get("auth"));
         } else{
            console.log("failed");
            res.send({status:"failed"})
        }
    })
})


route.get("/getcurrent/:id",(req,res)=>{
userManagement.getCurrent(req.params.id).then((user)=>{
    res.json(user)
}).catch((err)=>{
    res.send(err.err)
})
})

route.get("/getuser/:id",(req,res)=>{
    userManagement.getUserDetails()
   
})

route.post("/imageupload/:id",(req,res)=>{
 
    console.log(req.files.file);
    const file=req.files.file
    console.log(process.cwd());
    file.mv(`${process.cwd()}/public/uploads/${file.name}`).then(()=>{
       cloudinary.uploader.upload(`public/uploads/${file.name}`,{
        folder:"main"
       }).then((result)=>{
        console.log(req.params.id);
        console.log(result);
        db.get().collection("user").updateOne({_id:ObjectID(req.params.id)},{$set:{profilePicture:result.url}})
        res.json(result)

       }).catch(err=>{
        console.log(err)
       })
    }).catch(err=>{
        console.log(err);
    })

    
})





module.exports=route