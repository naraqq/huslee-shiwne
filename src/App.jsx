import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import TwoMillion from "./pages/2say";
import TenMillion from "./pages/10say";
import FiveMillion from "./pages/5say";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TwoMillion />} />
        <Route path="/2say" element={<TwoMillion />} />
        <Route path="/5say" element={<FiveMillion />} />
        <Route path="/10say" element={<TenMillion />} />
        <Route path="contact" element={<></>} />
        <Route path="*" element={<></>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
