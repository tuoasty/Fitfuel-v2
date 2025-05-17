import {createContext, useContext, useEffect, useState} from "react";
import type {User} from "../type/user.ts";
import API from "../utils/API.ts";
import axios from "axios";
import {toast} from "sonner";
import {useNavigate} from "react-router";

const AuthContext = createContext<AuthContextType | null>(null);

type AuthContextType = {
    user:User | null
    verifyLogin: () => Promise<boolean>
}

export const AuthProvider = ({children} : {children: React.ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);

    const verifyLogin = async ():Promise<boolean> => {
        try {
            const response = await API.get("/users/me");
            console.log(response);
            if (response.status === 200) {
                setUser(response.data.user)
                return true
            }
        } catch (error) {
            let errorMessage = 'Unauthenticated. Please login again';
            if(axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || "Unable to connect to server";
            }
            toast.error(errorMessage);
            return false
        }
        return false
    }
    const value:AuthContextType = {
        user,
        verifyLogin
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

export const ProtectedRoute = ({children}:{children:React.ReactNode}) => {
    const {user, verifyLogin} = UseAuth();
    const navigate = useNavigate();
    const [authorized, setAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkLogin = async () => {
            const isLoggedIn = await verifyLogin();
            if(!isLoggedIn || !user) {
                navigate("/landing", {replace:true});
                return
            } else {
                setAuthorized(true);
            }
        }
        checkLogin().finally(() => setLoading(false));
    }, []);

    if(loading) {
        return <h1>Loading...</h1>
    }
    if(authorized){
        return <>{children}</>
    }
}