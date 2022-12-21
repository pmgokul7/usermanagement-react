const db=require("../config/connection")
const collections=require("../config/collections")
const cloudinary =require("cloudinary").v2
const { ObjectID } = require("bson")

module.exports={
    changeProfile:(files,id)=>{
       return new Promise((resolve,reject)=>{

   
        console.log(files.file);
        const file=files.file
        console.log(process.cwd());
        file.mv(`${process.cwd()}/public/uploads/${file.name}`).then(()=>{
           cloudinary.uploader.upload(`public/uploads/${file.name}`,{
            folder:"main"
           }).then(async(result)=>{
            console.log("done",result);
           await db.get().collection(collections.USER_COLLECTION).updateOne({_id:ObjectID(id)},{$set:{profilePicture:result.url}})

           }).catch(err=>{
            console.log(err)
           })
        }).catch(err=>{
            console.log(err);
        })

       })
    }
}