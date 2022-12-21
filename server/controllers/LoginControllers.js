const db=require("../config/connection")
const collections=require("../config/collections")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
module.exports={
    userRegister:(datas)=>{
        return new Promise(async(resolve,reject)=>{
            const user=await db.get().collection(collections.USER_COLLECTION).findOne({email:datas.email})
            if(!user){
                const hashedPassword=await bcrypt.hash(datas.password,10)
                await db.get().collection(collections.USER_COLLECTION).insertOne({
                    name:datas.name,
                    mobile:datas.mobile,
                    email:datas.email,
                    status:"active",
                    profilePicture:datas.profilePicture,
                    password:hashedPassword
                })
                resolve({inserted:true,msg:"inserted"})        
            }else{
                resolve({inserted:false,msg:"used Email"})
            }
        })
    },
    userLogin:(datas)=>{
   return new Promise(async(resolve,reject)=>{
    
     const user=await await db.get().collection(collections.USER_COLLECTION).findOne({email:datas.userName})
     console.log(datas,user);
     
       if(user){
        if(user.email==datas.userName &&await bcrypt.compare(datas.password,user.password)==true && user.status=="active"){
            console.log("match");
            let userTocken= jwt.sign({email:user.email},"secret",{expiresIn:120})
            
            resolve({status:"success",tocken:userTocken,user:user})
        }
        else if(user.name!=datas.userName ||await bcrypt.compare(user.password,datas.password)==false || user.active=="block"){
            console.log("failed");
            resolve({status:"wrong password"})
        }
       }
       else{
        console.log("not found");
        resolve({status:"wrong password"})
       }
   })
    },
    adminLogin:(datas)=>{
        return new Promise(async(resolve,reject)=>{
          const admin=await db.get().collection(collections.ADMIN_COLLECTION).findOne({name:datas.adminName})
          console.log(admin);
            if(admin && admin.name==datas.adminName&&datas.password==admin.password){
               const token= jwt.sign({name:admin.name},"secret")
                resolve({status:"success",token:token})
            }
            else{
                resolve({status:"failed"})
            }
          
          
        })
    }
}