const express=require("express")
const db=require("./config/connection")
const userRoute=require("./routes/user")
const adminRoute=require("./routes/admin")
var bodyParser = require('body-parser')
const cloudinary=require("cloudinary").v2
const uploader=require("express-fileupload")
const cookie=require("cookie-parser")

var cors=require("cors")
const app=express()

app.use(cors())
db.connect()
app.use(bodyParser.json());
app.use(uploader())
app.use(bodyParser.urlencoded({ extended: false }))
app.use("/user",userRoute)
app.use("/admin",adminRoute)
app.use(cookie())
 
cloudinary.config({
    cloud_name:"dem5z7tgz",
    api_key:"315628366858732",
    api_secret:"OV3JdlJ8TaJQUoukAPdmDxxcopA"
})

app.post("/",(req,res)=>{
    
    console.log("post called",req.body);
})
app.listen(3001,()=>{
    console.log("server started");
})