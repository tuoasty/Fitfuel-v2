import {createContext, useContext, useEffect, useState} from "react";
import type {User} from "../type/user.ts";
import API from "../utils/API.ts";
import axios from "axios";
import {toast} from "sonner";
import {useNavigate, Outlet} from "react-router";

const AuthContext = createContext<AuthContextType | null>(null);

type AuthContextType = {
    user:User | null
    verifyLogin: () => Promise<boolean>
    verifyProfile: () => Promise<boolean>
    logout: () => Promise<void>
}

export const AuthProvider = ({children} : {children: React.ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);

    const verifyLogin = async ():Promise<boolean> => {
        try {
            const response = await API.get("/users/me");
            if (response.status === 200) {
                setUser(response.data.user)
                return true
            }
        } catch {
            return false
        }
        return false
    }

    const logout = async () => {
        try {
            const response = await axios.post("http://localhost:3000/auth/logout",{}, {
                withCredentials: true
            });
            if (response.data.success) {
                console.log(response);
                toast.success("Logout successful! Redirecting...");
                setTimeout(() => {
                    window.location.href = "/landing"
                }, 1000);
            }
        } catch (error) {
            let errorMessage = 'Logout failed.';
            if(axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || "Unable to connect to server";
            }
            toast.error(errorMessage);
        }
    }

    const verifyProfile = async ():Promise<boolean> => {
        try {
            const response = await API.get("/profile/me");
            if (response.status === 200) {
                return true
            }
        } catch (error) {
            let errorMessage = 'Please fill out profile details';
            if(axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || "Unable to connect to server";
            }
            toast.error(errorMessage);
            return false;
        }
        return false
    }

    const value:AuthContextType = {
        user,
        verifyLogin,
        verifyProfile,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const UseAuth = () => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error("useAuth must be used within a auth");
    }
    return context;
}

export const LoginRoute = () => {
    const {verifyLogin, verifyProfile} = UseAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const checkLogin = async () => {
        const isLoggedIn = await verifyLogin();
        if (isLoggedIn) {
            const profileCreated = await verifyProfile();
            if (profileCreated) {
                navigate("/home", {replace: true});
            } else {
                navigate("/complete-profile", {replace: true});
            }
        } else {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkLogin();
    }, []);

    if(loading) {
        return <h1>Loading...</h1>
    }
    return <Outlet/>
}

export const ProtectedRoute = () => {
    const {verifyLogin, verifyProfile} = UseAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkLogin = async () => {
            const isLoggedIn = await verifyLogin();
            if (!isLoggedIn) {
                console.log("Navigate to landing");
                navigate("/landing", {replace: true});
                return;
            }

            const profileCompleted = await verifyProfile();
            if (!profileCompleted) {
                navigate("/complete-profile", {replace: true});
                return;
            }

            setLoading(false);
        };

        checkLogin();
    }, []);

    if(loading) {
        return <h1>Loading...</h1>
    }
    return <Outlet/>
}

export const RequireAuthorization = () => {
    const {user, verifyLogin} = UseAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkLogin = async () => {
            const isLoggedIn = await verifyLogin();
            if (!isLoggedIn || !user) {
                navigate("/landing", {replace: true});
                return;
            }

            setLoading(false);
        };

        checkLogin();
    }, []);

    if(loading) {
        return <h1>Loading...</h1>
    }
    return <Outlet/>
}