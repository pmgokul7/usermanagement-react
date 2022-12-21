import axios from "axios"

const axiosConfig=axios.create({
    baseURL:"http://localhost:3001/",
    method:"POST"
})

export default axiosConfig