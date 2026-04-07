// import React from "react";
// import {  Routes, Route } from "react-router-dom";
// import { Sign_up } from "./pages/Sign_up";
// import { Home } from "./pages/Home";
// import { Todo } from "./pages/Todo";



// const App = () => {
//   return (
//     <div>
      
    

//         <Routes>
//            <Route path="/" element={<Home />}/>
//            <Route path="/home" element={<Home />}/>
           
//            <Route path="/signup" element={<Sign_up />} />

//           <Route path="/todo" element={<Todo />} />
       
          
     
//         </Routes>

//       </div>

//   );
// };

// export default App;

import React from "react";
import { Routes, Route } from "react-router-dom";

import { Sign_up } from "./pages/Sign_up";
import { Home } from "./pages/Home";
import { Todo } from "./pages/Todo";
import ProtectedRoute from "./Components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (

    <>
    <ToastContainer position="top-right" autoClose={2000} />
    
    <Routes>


 
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Sign_up />} />

      {/* Protected Routes */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home/>
          </ProtectedRoute>
        }
      />

      <Route
        path="/Todo"
        element={
          <ProtectedRoute>
            <Todo />
          </ProtectedRoute>
        }
      />

    </Routes>
    </>
  );
};

export default App;