import {BrowserRouter, Navigate, Route, Routes} from "react-router";
import Landing from "./lib/pages/Landing.tsx";
import Login from "./lib/pages/Login.tsx";
import Register from "./lib/pages/Register.tsx";
import Home from "./lib/pages/Home.tsx";

function App() {
  return (
    <main className="w-full h-full">
      <BrowserRouter>
          <Routes>
              <Route path="*" element={<Navigate to="landing" replace />}/>
              <Route path="landing" element={<Landing/>}/>
              <Route path="login" element={<Login/>}/>
              <Route path="register" element={<Register/>}/>
              <Route path="home" element={<Home/>}/>
          </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
