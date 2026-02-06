import axios from 'axios';

const url = "backend-url"

const api = axios.create({
    baseURL : url,
    headers : {
        "Content-Type" : "application/json"
    }
});
export default api;