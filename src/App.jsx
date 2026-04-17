import { Routes, Route } from "react-router-dom";

import { Sign_up } from "./pages/Sign_up";
import { Home } from "./pages/Home";
import { Todo } from "./pages/Todo";
import ProtectedRoute from "./Components/ProtectedRoute";

import { Toaster } from "react-hot-toast";
const App = () => {
  return (

    <>
     <Toaster position="top-center" />
  
    
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