import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

export default function GuestLayout() {
    const { user, token } = useStateContext();

    // If user is already authenticated, redirect them based on their role
    if (token) {
        return <Navigate to="/dashboard" />;
    }
    return (
        <div>
            <Outlet />
        </div>
    );
}
