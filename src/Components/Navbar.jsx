// import { Link } from "react-router-dom";



// const Navbar = () => {
//   const handleLogout = () => {
//   localStorage.removeItem("token"); // remove JWT
//   window.location.href = "/signup"; // redirect to home/login
// };





//   return (

//     <nav className="bg-gray-800 text-white p-4 flex items-center justify-between">
      
//       <span className="text-xl font-bold text-white hover:text-purple-400 transition-colors">
//         TaskMaster
//       </span>
//       <ul className="nav-menu p-0 m-0 list-none flex space-x-4">
//         <li className="nav-item ">


//           <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 relative group text-gray-400 transition-colors overflow-hidden">
//           <span>
//             <Link to="/home">Home</Link>
//           </span>
//           <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300"></span>
//         </button>

          
//           {/* <a href="/" className="nav-link  hover:text-blue-700  text-gray-700  */}
//           <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 relative group text-gray-400 transition-colors overflow-hidden">
//             <span><Link to="/todo">My Tasks</Link></span>
//             <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300"></span>
//           </button>
//           {/* My Task */}
//           {/* </a> */}
//         </li>
//         <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 relative group text-gray-400 transition-colors overflow-hidden">
//           <span>
//             <Link to="/signup">Sign Up</Link>
//           </span>
//           <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300"></span>
//         </button>


//         <button  onClick={handleLogout}
//         className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 relative group text-gray-400 transition-colors overflow-hidden">
//           <span>
//             Logout
//           </span>
//           <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300"></span>
//         </button>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;


import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Navbar = () => {

  const isLoggedIn = !!localStorage.getItem("token"); // ✅ check login

 

const handleLogout = async () => {
  const result = await Swal.fire({
    title: "Logout?",
    text: "You will be logged out of your account.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#e3342f",
    cancelButtonColor: "#6c757d",
    confirmButtonText: "Yes, logout",
  });

  if (!result.isConfirmed) return;

  localStorage.removeItem("token");

  Swal.fire("Logged out!", "See you again 👋", "success");

  setTimeout(() => {
    window.location.href = "/signup";
  }, 1000);
};
  return (
    <nav className="bg-gray-800 text-white p-4 flex items-center justify-between">
      
      <span className="text-xl font-bold text-white hover:text-purple-400 transition-colors">
        TaskMaster
      </span>

      <ul className="nav-menu p-0 m-0 list-none flex space-x-4">

        {/* ✅ HOME (ONLY AFTER LOGIN) */}
        {isLoggedIn && (
          <li className="nav-item">
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 relative group text-gray-400 transition-colors overflow-hidden">
              <span>
                <Link to="/home">Home</Link>
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300"></span>
            </button>
          </li>
        )}

        {/* ✅ MY TASK (ALWAYS SHOW) */}
        <li className="nav-item">
          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 relative group text-gray-400 transition-colors overflow-hidden">
            <span>
              <Link to="/todo">My Tasks</Link>
            </span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300"></span>
          </button>
        </li>

        {/* ❌ BEFORE LOGIN → SIGNUP */}
        {!isLoggedIn && (
          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 relative group text-gray-400 transition-colors overflow-hidden">
            <span>
              <Link to="/signup">Sign Up</Link>
            </span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300"></span>
          </button>
        )}

        {/* ✅ AFTER LOGIN → LOGOUT */}
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 relative group text-gray-400 transition-colors overflow-hidden"
          >

           
            <span>Logout</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300"></span>
         
          </button>
        )}

      </ul>
    </nav>
  );
};

export default Navbar;