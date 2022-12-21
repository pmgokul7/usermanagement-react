const mongodb=require("mongodb").MongoClient
const uri="mongodb://127.0.0.1:27017/"

// const uri="mongodb+srv://pmgokul7:palappillil1234@cluster0.tdijx9j.mongodb.net/?retryWrites=true&w=majority"
dbname="week14"

 state={
    db:null
}

module.exports={
    connect:()=>{
        mongodb.connect(uri).then(connection=>{
          state.db=connection.db(dbname)
          console.log("connected to mongodb");
        }).catch((err)=>{
               console.log("error connecting database",err);
        })
    },
    get:()=>{
        return state.db
    }
}