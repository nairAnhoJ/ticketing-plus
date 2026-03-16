import { Outlet, useLocation } from "react-router-dom"
import Navigation from "../components/Navigation"

const HIDDEN_NAV_ROUTES = ["/set-password"];

const MainLayout = () => {
    const location = useLocation();
    const hideNav = HIDDEN_NAV_ROUTES.includes(location.pathname);

    return (
        <>
            {!hideNav && <Navigation />}
            
            <Outlet />
        </>
    )
}  

export default MainLayout