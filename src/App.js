import "./App.css";
import { Route, Routes } from "react-router-dom";
import Upload from "./pages/Upload";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/upload" element={<Upload />} />
    </Routes>
  );
}

export default App;
