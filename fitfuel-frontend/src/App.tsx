import {BrowserRouter, Navigate, Route, Routes} from "react-router";
import Landing from "./lib/pages/Landing.tsx";
import Login from "./lib/pages/Login.tsx";
import Register from "./lib/pages/Register.tsx";
import Home from "./lib/pages/Home.tsx";
import {Toaster} from "./components/ui/sonner.tsx";
import {AuthProvider, LoginRoute, ProtectedRoute, RequireAuthorization} from "./auth/AuthenticationContext.tsx";
import CompleteProfile from "./lib/pages/CompleteProfile.tsx";
import DailyCalorieIntake from "./lib/pages/DailyCalorieIntake.tsx";
import Recipes from "./lib/pages/Recipes.tsx";
import RecipeDetail from "./lib/pages/RecipeDetail.tsx";

function App() {
    return (
        <main className="w-full h-full">
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="*" element={<Navigate to="/landing" replace/>}/>
                        {/*Login Routes*/}
                        <Route element={<LoginRoute/>}>
                            <Route path="landing" element={<Landing/>}/>
                            <Route path="login" element={<Login/>}/>
                            <Route path="register" element={<Register/>}/>
                        </Route>
                        {/*Complete Profile Route*/}
                        <Route element={<RequireAuthorization/>}>
                            <Route path="complete-profile" element={<CompleteProfile/>}/>
                        </Route>
                        {/*Protected Routes*/}
                        <Route element={<ProtectedRoute/>}>
                            <Route path="home" element={<Home/>}/>
                            <Route path="daily-calorie-intake" element={<DailyCalorieIntake/>}/>
                            <Route path="recipe" element={<Recipes/>}/>
                            <Route path="recipe/:recipeId" element={<RecipeDetail/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
            <Toaster />
        </main>
    )
}

export default App
