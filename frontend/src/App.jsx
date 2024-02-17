import "../src/styles/main.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Performance from "./pages/Performance";
import CreateTests from "./pages/CreateTests";
import AllTests from "./pages/AllTests";
import Sidebar from "./components/Sidebar";

function App() {
    return (
        <Router>
            <div className="App">
                <Sidebar />
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/performance" element={<Performance />} />
                    <Route path="/alltests" element={<AllTests />} />
                    <Route path="/createtests" element={<CreateTests />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
