import {BrowserRouter, Route, Routes} from "react-router";
import Landing from "./lib/pages/Landing.tsx";

function App() {
  return (
    <main>
      <BrowserRouter>
          <Routes>
              <Route path="landing" element={<Landing/>}/>
          </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
