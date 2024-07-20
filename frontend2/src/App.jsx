import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import SignUp from "../pages/sign/SignUp";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

function App() {
  const { authUser } = useAuthContext();
  return (
    <div className="border pt-20 border-red-500">
      <Routes>
        <Route path='/' element={<Home />} />
        {/* <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
				<Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} /> */}
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;