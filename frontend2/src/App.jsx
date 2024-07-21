import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import SignUp from "../pages/sign/SignUp";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import BlogPage from "../pages/blog/Blog";
import Navbar from "../components/Navbar";
import BlogSubmission from "../pages/write/writeblog";

function App() {
  const { authUser } = useAuthContext();
  
  return (
    <div className="min-h-screen min-w-full bg-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs/:id" element={<BlogPage />} />
        <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={authUser ? <Navigate to="/" /> : <SignUp />} />
        <Route path="/write" element={!authUser ? <Navigate to="/" /> : <BlogSubmission />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
