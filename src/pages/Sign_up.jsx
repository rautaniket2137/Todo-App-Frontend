import React , { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { Footer } from "../Components/Footer";
import API from "../api/axios";
import { useEffect } from "react";
import toast from "react-hot-toast";

export const Sign_up = () => {
  const [mode, setMode] = useState("signup"); // signup | signin
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();



  // useEffect(()=>{
  //   if(localStorage.getItem('login'))
  //        navigate("/");
  // })

 const handleSubmit = async (e) => {
  
  e.preventDefault();
  setError("");

  

  if (mode === "signup" && !username) {
    setError("Username is required");
    return;
  }

  if (!email || !password) {
    setError("Email and password are required");
    return;

    
  }
  if(mode === "signup" && password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

  if (mode === "signup" && !agree) {
    setError("You must accept the terms");
    return;
  }
console.log("Sending:", { username, email, password }); 
  try {
    let res;

    if (mode === "signup") {
      // 👉 SIGNUP API CALL
      res = await API.post("/signup", {
        username,
        email,
        password

      });
        toast.success("Signup successfully ");
    } else {
      // 👉 LOGIN API CALL
      res = await API.post("/login", {
        email,
        password
      });
      toast.success("Login successfully ");
    }

    console.log(res.data);

    

    // 👉 token save (future use)
    if (res.data.token) {
      // document.cookie="token"+data.token
      localStorage.setItem("token", res.data.token);
      // localStorage.setItem('login',res.data.email);
      
    }
    navigate("/home");

  } catch (error) {
    console.log(error);
    setError(
      error.response?.data?.message || "Something went wrong"
    );
    
  }
  
};

  return (
    <div className="bg-gradient-to-r from-purple-800 to-gray-800 hover:from-purple-900 hover:to-gray-900 min-h-screen ">
      <Navbar />

      <div className="bg-gradient-to-r from-purple-800 to-gray-800 hover:from-purple-900 hover:to-gray-900  min-h-screen flex items-center justify-center">
        <div className="bg-black/60 p-20  rounded-lg shadow-md max-w-96 text-white   hover:from-purple-500 to-pink-500 px-8 py-3 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25  ">
          <h1 className="text-2xl font-bold text-center mb-5 pt-6   text-white ">
            {mode === "signup" ? "Create Account" : "Welcome Back"}
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-4   hover:from-blue-500 hover:to-purple-400"
          >
            {mode === "signup" && (
              <input
                type="text"
                placeholder="Username"
                className="border rounded w-full py-2 px-3"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            )}

            <input
              type="email"
              placeholder="Email"
              className="border rounded w-full py-2 px-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="border rounded w-full py-2 px-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              
            />
            

            {mode === "signup" && (
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-600">
                  I agree to the terms and conditions
                </span>
              </div>
            )}

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white w-full py-2 rounded">
              {mode === "signup" ? "Sign Up" : "Sign In"}
            </button>

            <p className="text-center text-sm text-gray-600 mt-4">
              {mode === "signup"
                ? "Already have an account?"
                : "Don't have an account?"}

              <span
                onClick={() => setMode(mode === "signup" ? "signin" : "signup")}
                className="text-blue-500 ml-1 cursor-pointer"
              >
                {mode === "signup" ? "Sign In" : "Sign Up"}
              </span>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};


