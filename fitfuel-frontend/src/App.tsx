import {BrowserRouter, Navigate, Route, Routes} from "react-router";
import Landing from "./lib/pages/Landing.tsx";
import Login from "./lib/pages/Login.tsx";
import Register from "./lib/pages/Register.tsx";
import Home from "./lib/pages/Home.tsx";
import {Toaster} from "./components/ui/sonner.tsx";
import {AuthProvider, ProtectedRoute} from "./auth/AuthenticationContext.tsx";

function App() {
    return (
        <main className="w-full h-full">
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="*" element={<Navigate to="landing" replace/>}/>
                        <Route path="landing" element={<Landing/>}/>
                        <Route path="login" element={<Login/>}/>
                        <Route path="register" element={<Register/>}/>
                        <Route path="home" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
            <Toaster />
        </main>
    )
}

export default App
