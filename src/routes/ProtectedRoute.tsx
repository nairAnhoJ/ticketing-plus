import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom';
import config from '../config/config';
import { useEffect, useState } from 'react';

function ProtectedRoutes() {
    const { event_id } = useParams<{ event_id: string }>();
    const location = useLocation();
    const [isVerified, setIsVerified] = useState<boolean>(false)
    const [isFirstTimeLogin, setIsFirstTimeLogin] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)


    useEffect(()=>{
        config.get('/auth/is-valid')
            .then((res)=>{
                console.log(res);
                if(res.data.user.first_time_login === 1){
                    setIsFirstTimeLogin(true)
                }
                setIsVerified(true)
            })
            .catch((err)=>{
                console.log(err);
                setIsVerified(false)
            })
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <p>Loading...</p>
    if (!isVerified){
        localStorage.removeItem('user')
        return <Navigate to={event_id ? `/login/${event_id}` : `/login`} replace />
    } 
    if (isFirstTimeLogin && !location.pathname.includes("set-password")){
        return <Navigate to={event_id ? `/set-password/${event_id}` : `/set-password`} replace />
    }
    if (!isFirstTimeLogin && location.pathname.includes("set-password")){
        return <Navigate to={`/`} replace />
    }

    return <Outlet />
}

export default ProtectedRoutes