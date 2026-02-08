//routes behind auth
import {Navigate, Outlet, useLocation} from "react-router-dom";
import { useAuth } from "./AuthContext";


export default function RequireAuth() {
    const {user, loading} = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <>
            <div>
                loading...
            </div>
            </>
        )
    }
    if (!user) {
        return (
            <>
            <Navigate to="/login" replace state={{from: location}} />
            </>
        )
    }

    return (
        <Outlet />
    )
}