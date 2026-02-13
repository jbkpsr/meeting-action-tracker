import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Status from "./pages/Status";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow p-4 flex justify-between">
          <h1 className="font-bold text-lg">Meeting Action Tracker</h1>
          <div className="space-x-4">
            <Link to="/">Home</Link>
            <Link to="/status">Status</Link>
          </div>
        </nav>

        <div className="p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/status" element={<Status />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
