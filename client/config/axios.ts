import axios from "axios";

const api = axios.create( {
    url : "http://localhost:4000/api/v1",
    withCredentials : false
})

export default api