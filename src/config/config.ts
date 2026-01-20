import axios from "axios";

const config = axios.create({
    // baseURL: "",
    baseURL: 'http://localhost:5050/api',
    // baseURL: "http://192.168.20.143:5050",
})

config.interceptors.request.use((cnfg) => {
    const token = localStorage.getItem("token");
    if(token){
        cnfg.headers.Authorization = `Bearer ${token}`;
    }
    return cnfg;
})

config.interceptors.request.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;
        const message = error.response?.data.message;

        if(status === 401 && message === 'Unauthorized'){
            localStorage.removeItem('token');
            window.location.href = '/login'
        }

        return Promise.reject(error);
    }
)

export default config