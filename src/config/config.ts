import axios from "axios";

const config = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}/api`,
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