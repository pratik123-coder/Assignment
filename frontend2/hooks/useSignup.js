import { useState } from "react"
import toast from 'react-hot-toast'
import { useAuthContext } from "../context/AuthContext";


const useSignup = () => {
  const [loading,setLoading] = useState(false);
  const {setAuthUser} = useAuthContext();
  const signup = async ({name,email,password}) =>{
    const success = handleInputErrors({name,email,password})
    if(!success) return;
    try {
      setLoading(true);
      const res = await fetch('http://localhost:8000/api/auth/signup',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          password,
        })
      })
      const data = await res.json();
      if(data.error) {
        throw new Error(data.error);
      }
      console.log(data);
      toast.success('Signup Successful');

      //save to local storage 
      localStorage.setItem('user', JSON.stringify(data));
      //context (Auth)
      setAuthUser(data);

    } catch (error) {
      toast.error(error.message);
    }
    finally {
      setLoading(false);
    }

  }
  return {
    signup,
    loading
  }
  };

export default useSignup

function handleInputErrors({ name, email, password  }) {
  if (!name || !email || !password  ) {
    toast.error('Please Fill All the fields');
    return false;
  }
  if (password.length < 6) {
    toast.error('Password must be at least 6 characters');
    return false;
  }
  return true;
}
