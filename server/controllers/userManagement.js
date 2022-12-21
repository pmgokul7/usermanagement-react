const db =require("../config/connection")
const collection=require("../config/collections")
const collections = require("../config/collections")
const { ObjectID, ObjectId } = require("bson")

module.exports = {
  getUsers: (page) => {
    return new Promise(async (resolve, reject) => {
    
      const count=await db.get().collection(collections.USER_COLLECTION).count()
      // console.log("adghf",count);
      const allUsers = await db
        .get()
        .collection(collection.USER_COLLECTION)
        .aggregate([{$match:{}},{$skip:9*(Number(page.page)-1)},{$limit:9}]).
        toArray()
        // console.log(allUsers);

        resolve({allUsers,count});
    });
  },
  getCurrent: (id) => {
    return new Promise(async (resolve, reject) => {
      const user = await db
        .get()
        .collection(collections.USER_COLLECTION)
        .findOne({ _id: ObjectID(id) });
      if (user) {
        resolve(user);
      } else {
        reject({ error: "404" });
      }
    });
  },

  deleteUser:(id)=>{
    return new Promise((resolve,reject)=>{
        db.get().collection(collections.USER_COLLECTION).deleteOne({_id:ObjectID(id)})
    })
  },

  searchUser:(user)=>{
    return new Promise(async(resolve,reject)=>{
        const users=await db.get().collection(collections.USER_COLLECTION).find({name:{$regex:user}}).toArray()
        console.log(users);
        resolve(users)

    })
  },
  editUser:(id)=>{
    console.log(id);
    return new Promise(async(resolve,reject)=>{
        const user=await db.get().collection(collections.USER_COLLECTION).findOne({_id:ObjectId(id)})
        if(user){
            resolve(user)
        }
    })
  },
  updateUser:(body)=>{
    return new Promise(async(resolve,reject)=>{
        await db.get().collection(collections.USER_COLLECTION).updateOne({_id:ObjectID(body._id)},{$set:{name:body.name,mobile:body.mobile,email:body.email}})
        resolve({status:"success"})
    })
  }
};