import {BrowserRouter, Navigate, Route, Routes} from "react-router";
import Landing from "./lib/pages/Landing.tsx";
import Login from "./lib/pages/Login.tsx";

function App() {
  return (
    <main className="w-full h-full">
      <BrowserRouter>
          <Routes>
              <Route path="*" element={<Navigate to="landing" replace />}/>
              <Route path="landing" element={<Landing/>}/>
              <Route path="login" element={<Login/>}/>
          </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
