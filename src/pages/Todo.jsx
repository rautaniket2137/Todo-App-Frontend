// import { useState, useEffect } from "react";

// import Navbar from "../Components/Navbar";
// import { Footer } from "../Components/Footer";
// import { getTodo, createTodo, deleteTodo, updateTodo } from "../api/todo.jsx";
// import toast from "react-hot-toast";

// export const Todo = () => {
//   console.log("🔥 TODO PAGE LOADED");

//   const [newTask, setNewTask] = useState("");
//   const [dueDate, setDueDate] = useState("");
//   const [isEditing, setIsEditing] = useState(false);
//   const [editId, setEditId] = useState(null);

//   const [tasks, setTasks] = useState({
//     incomplete: [],
//     doing: [],
//     completed: [],
//   });

//   // Fetch todos on load
//   useEffect(() => {
//     const fetchTodos = async () => {
//       try {
//         const res = await getTodo();

//         const formatted = {
//           incomplete: [],
//           doing: [],
//           completed: [],
//         };

//         res.forEach((todo) => {
//           if (!todo) return;
//           const status = todo.status === "complete" ? "completed" : todo.status;

//           formatted[status]?.push({
//             _id: todo._id,
//             text: todo.text,
//             dueDate: todo.dueDate || null,
//             createdAt: todo.createdAt,
//             completedAt: todo.completedAt || null,
//             status,
//           });
//         });

//         setTasks({
//           incomplete: formatted.incomplete.filter(Boolean),
//           doing: formatted.doing.filter(Boolean),
//           completed: formatted.completed.filter(Boolean),
//         });
//       } catch (err) {
//         console.log("FETCH ERROR:", err);
//       }
//     };

//     fetchTodos();
//   }, []);

//   // Add or update task
//   const addTask = async () => {
   
//     if (!newTask.trim()) {
//       toast.warning("Task cannot be empty ⚠️");
      
//       return;

//     }
   

//     try {
//       if (isEditing) {
//         // 🔹 UPDATE MODE
//         const res = await updateTodo(editId, {
//           text: newTask,
//           dueDate,
//         });
//         toast.success("Task updated ✏️");

//         const updated = res.todo;

//         setTasks((prev) => {
//           const newState = { ...prev };
//           Object.keys(newState).forEach((status) => {
//             newState[status] = newState[status].map((t) =>
//               t._id === editId
//                 ? {
//                     ...t,
//                     text: updated.text,
//                     dueDate: updated.dueDate,
//                     createdAt: updated.createdAt,
//                     completedAt: updated.completedAt || null,
//                     status: updated.status,
//                   }
//                 : t
//             );
//           });
//           return newState;
//         });

//         setIsEditing(false);
//         setEditId(null);
//       } else {
//         // ➕ ADD MODE
//         const res = await createTodo({
//           text: newTask,
//           dueDate,
//         });

//         toast.success("Task added successfully ✅");

//         const saved = res.data?.todo || res.data;
//         if (!saved) return;

//         const taskData = {
//           _id: saved._id,
//           text: saved.text,
//           dueDate: saved.dueDate,
//           createdAt: saved.createdAt,
//           completedAt: saved.completedAt || null,
//           status: saved.status,
//         };

//         setTasks((prev) => ({
//           ...prev,
//           incomplete: [...prev.incomplete ,taskData,],
//         }));

//       }

      
//       setNewTask("");
//       setDueDate("");

      
//     } catch (err) {
//       console.log("❌ Add/Update error", err.response?.data || err.message);
//     }
//   };

//   // Move task
//   const moveTask = async (taskId, from, to) => {
//     const taskToMove = tasks[from].find((t) => t._id === taskId);
//     if (!taskToMove) return;

//     try {
//       const res = await updateTodo(taskId, { status: to });
//       const updated = res.todo;

//       const updatedTask = {
//         _id: updated._id,
//         text: updated.text,
//         dueDate: updated.dueDate,
//         createdAt: updated.createdAt,
//         completedAt: updated.completedAt || null,
//         status: updated.status,
//       };

//       setTasks((prev) => ({
//         ...prev,
//         [from]: prev[from].filter((t) => t._id !== taskId),
//         [to]: [...prev[to], updatedTask],
//       }));

//       toast.success("Task moved 🚀");
//     } catch (err) {
//       console.log("❌ Move error", err.response?.data || err.message);
//     }
//   };

//   // Mark as completed
//   const markAsCompleted = async (task, from) => {
//     try {
//       const now = new Date();
//       const res = await updateTodo(task._id, {
//         status: "completed",
//         completedAt: now.toISOString(),
//       });
//       const updated = res.todo;

//       const updatedTask = {
//         _id: updated._id,
//         text: updated.text,
//         dueDate: updated.dueDate,
//         createdAt: updated.createdAt,
//         completedAt: updated.completedAt,
//         status: updated.status,
//       };

//       setTasks((prev) => ({
//         ...prev,
//         [from]: prev[from].filter((t) => t._id !== task._id),
//         completed: [updatedTask, ...prev.completed],
//       }));
//       toast.success("Task completed 🎉");
//     } catch (err) {
//       console.log("❌ Complete error", err.response?.data || err.message);
//     }
//   };

//   // Delete task
//   const handleDelete = async (taskId, status) => {
//     try {
//       await deleteTodo(taskId);
//       setTasks((prev) => ({
//         ...prev,
//         [status]: prev[status].filter((t) => t._id !== taskId),


//       }));

      

//     toast.success("Task deleted 🗑️");
//     } catch (err) {
//       console.log("❌ Delete error", err);
//     }
//   };

//   // Helper: overdue check
//   const isOverdue = (date) => {
//     if (!date) return false;
//     const today = new Date();
//     const due = new Date(date);
//     today.setHours(0, 0, 0, 0);
//     due.setHours(0, 0, 0, 0);
//     return due < today;
//   };

//   return (
//     <div className="bg-gradient-to-r from-purple-800 to-gray-800 min-h-screen space-y-8 overflow-y-auto">
//       <Navbar />

//       <div className="flex items-center justify-center pt-24">
//         <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
//           My Tasks
//         </h1>
//       </div>

//       <div className="mt-4 flex items-center justify-center mb-4 px-4">
//         <input
//           type="text"
//           value={newTask}
//           onChange={(e) => setNewTask(e.target.value)}
//           placeholder="Enter a new task..."
//           onKeyDown={(e) => { if (e.key === "Enter") addTask(); }}
//           className="rounded-md border px-4 text-sm shadow-sm bg-black/50 border-white/10 text-white placeholder:text-gray-400 focus:border-purple-500 h-12 w-full max-w-xl"
//         />

//         <input
//           type="date"
//           value={dueDate}
//           onChange={(e) => setDueDate(e.target.value)}
//           className="h-12 px-3 rounded bg-black/50 text-white"
//         />

       

//         <button
//   className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 ml-4 px-6 rounded"
//   onClick={addTask}
//   // disabled={isEditing}  <-- REMOVE THIS
// >
//   {isEditing ? "Update Task" : "Add Task"}
// </button>





//         {isEditing && (
//           <button
//             onClick={() => {
//               setIsEditing(false);
//               setEditId(null);
//               setNewTask("");
//               setDueDate("");
//             }}
//             className="text-xs bg-gray-500/30 px-2 py-1 rounded ml-2"
//           >
//             Cancel
//           </button>
//         )}
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-8 lg:px-16 pb-20">
//         {["incomplete", "doing", "completed"].map((status) => (
//           <div key={status} className="rounded-xl border shadow bg-black/40 border-white/10 backdrop-blur-lg">
//             <div className="p-6 border-b border-white/10 bg-white/5 flex justify-between text-white">
//               <span className="text-xl font-semibold capitalize">{status}</span>
//               <span className="rounded-full bg-white/20 px-3 py-1">
//                 {tasks[status].length}
//               </span>
//             </div>

//             <div className="p-4 space-y-3">
//               {(tasks[status] || []).map((task, index) => {
//                 if (!task) return null;

//                 return (
//                   <div
//                     key={task._id || index}
//                     className={`p-3 rounded text-white ${isOverdue(task.dueDate) ? "bg-red-500/30 border border-red-500" : "bg-white/10"}`}
//                   >
//                     <div className="font-bold">Task {index + 1}</div>
//                     {task.text}

//                     <div className="text-xs text-gray-400 mt-1">
//                       Created: {task.createdAt && new Date(task.createdAt).toLocaleDateString()}
//                     </div>

//                     {task.dueDate && (
//                       <div className="text-xs text-yellow-400">
//                         Due: {task.dueDate}
//                       </div>
//                     )}

//                     {task.completedAt && (
//                       <div className="text-xs text-green-400">
//                         Done: {new Date(task.completedAt).toLocaleString()}
//                       </div>
//                     )}

//                     <div className="flex gap-2 mt-2">
//                       {status !== "completed" && (
//                         <button
//                           onClick={() => moveTask(task._id, status, status === "incomplete" ? "doing" : "completed")}
//                           className="text-xs bg-purple-500/30 px-2 py-1 rounded hover:bg-purple-500/50"
//                         >
//                           Move →
//                         </button>
//                       )}

//                       <button
//                         onClick={() => handleDelete(task._id, status)}
//                         className="text-xs bg-red-500/30 px-2 py-1 rounded hover:bg-red-500/50"
//                       >
//                         <i className="fa-solid fa-trash"></i>
//                       </button>

//                       <button
//                         onClick={() => {
//                           setNewTask(task.text);
//                           setDueDate(task.dueDate || "");
//                           setIsEditing(true);
//                           setEditId(task._id);
//                         }}
//                         className="text-xs bg-green-500/30 px-2 py-1 rounded hover:bg-green-500/50"
//                       >
//                         Update
//                       </button>

//                       {status !== "completed" && (
//                         <button
//                           onClick={() => markAsCompleted(task, status)}
//                           className="text-xs bg-green-500/30 px-2 py-1 rounded"
//                         >
//                           Complete
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 );
//               })}

//               {tasks[status].length === 0 && (
//                 <div className="text-gray-500 text-center py-4">
//                   No tasks in this category
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       <Footer />
//     </div>
//   );
// };



import { useState, useEffect } from "react";

import Navbar from "../Components/Navbar";
import { Footer } from "../Components/Footer";
import { getTodo, createTodo, deleteTodo, updateTodo } from "../api/todo.jsx";
import toast from "react-hot-toast";

export const Todo = () => {
  const [newTask, setNewTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [tasks, setTasks] = useState({
    incomplete: [],
    doing: [],
    completed: [],
  });

  // ✅ Drag state
  const [draggedTask, setDraggedTask] = useState(null);
  const [sourceStatus, setSourceStatus] = useState(null);

  // Fetch todos
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await getTodo();

        const formatted = {
          incomplete: [],
          doing: [],
          completed: [],
        };

        res.forEach((todo) => {
          if (!todo) return;
          const status =
            todo.status === "complete" ? "completed" : todo.status;

          formatted[status]?.push({
            _id: todo._id,
            text: todo.text,
            dueDate: todo.dueDate || null,
            createdAt: todo.createdAt,
            completedAt: todo.completedAt || null,
            status,
          });
        });

        setTasks(formatted);
      } catch (err) {
        console.log("FETCH ERROR:", err);
      }
    };

    fetchTodos();
  }, []);

  // Add / Update
  const addTask = async () => {
    if (!newTask.trim()) {
      toast.warning("Task cannot be empty ⚠️");
      return;
    }

    try {
      if (isEditing) {
        const res = await updateTodo(editId, {
          text: newTask,
          dueDate,
        });

        const updated = res.todo;

        setTasks((prev) => {
          const newState = { ...prev };
          Object.keys(newState).forEach((status) => {
            newState[status] = newState[status].map((t) =>
              t._id === editId
                ? { ...t, ...updated }
                : t
            );
          });
          return newState;
        });

        toast.success("Task updated ✏️");
        setIsEditing(false);
        setEditId(null);
      } else {
        const res = await createTodo({
          text: newTask,
          dueDate,
        });

        const saved = res.data?.todo || res.data;

        setTasks((prev) => ({
          ...prev,
          incomplete: [saved, ...prev.incomplete],
        }));

        toast.success("Task added successfully ✅");
      }

      setNewTask("");
      setDueDate("");
    } catch (err) {
      console.log("❌ Add/Update error", err);
    }
  };

  // ✅ Drag functions
  const handleDragStart = (task, status) => {
    setDraggedTask(task);
    setSourceStatus(status);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (targetStatus) => {
    if (!draggedTask || !sourceStatus) return;
    if (sourceStatus === targetStatus) return;

    try {
      const res = await updateTodo(draggedTask._id, {
        status: targetStatus,
      });

      const updated = res.todo;

      setTasks((prev) => ({
        ...prev,
        [sourceStatus]: prev[sourceStatus].filter(
          (t) => t._id !== draggedTask._id
        ),
        [targetStatus]: [updated, ...prev[targetStatus]],
      }));

      toast.success("Task moved 🚀");
    } catch (err) {
      console.log("❌ Drag error", err);
    }

    setDraggedTask(null);
    setSourceStatus(null);
  };

  // Delete
  const handleDelete = async (taskId, status) => {
    try {
      await deleteTodo(taskId);
      setTasks((prev) => ({
        ...prev,
        [status]: prev[status].filter((t) => t._id !== taskId),
      }));
      toast.success("Task deleted 🗑️");
    } catch (err) {
      console.log("❌ Delete error", err);
    }
  };

  // Complete
  const markAsCompleted = async (task, from) => {
    try {
      const now = new Date();

      const res = await updateTodo(task._id, {
        status: "completed",
        completedAt: now.toISOString(),
      });

      const updated = res.todo;

      setTasks((prev) => ({
        ...prev,
        [from]: prev[from].filter((t) => t._id !== task._id),
        completed: [updated, ...prev.completed],
      }));

      toast.success("Task completed 🎉");
    } catch (err) {
      console.log("❌ Complete error", err);
    }
  };

  const isOverdue = (date) => {
    if (!date) return false;
    const today = new Date();
    const due = new Date(date);
    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);
    return due < today;
  };

  return (
    <div className="bg-gradient-to-r from-purple-800 to-gray-800 min-h-screen space-y-8 overflow-y-auto">
      <Navbar />

      <div className="flex items-center justify-center pt-24">
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          My Tasks
        </h1>
      </div>

      <div className="mt-4 flex items-center justify-center mb-4 px-4 ">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task..."
          onKeyDown={(e) => {
            if (e.key === "Enter") addTask();
          }}
          className="rounded-md border px-4 text-sm shadow-sm bg-black/50 border-white/10 text-white placeholder:text-gray-400 focus:border-purple-500 h-12 w-full max-w-xl cursor-pointer"
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="h-12 px-3 rounded bg-black/50 text-white cursor-pointer"
        />

        <button
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 ml-4 px-6 rounded cursor-pointer"
          onClick={addTask}
        >
          {isEditing ? "Update Task" : "Add Task"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-8 lg:px-16 pb-20">
        {["incomplete", "doing", "completed"].map((status) => (
          <div
            key={status}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(status)}
            className="rounded-xl border shadow bg-black/40 border-white/10 backdrop-blur-lg"
          >
            <div className="p-6 border-b border-white/10 bg-white/5 flex justify-between text-white">
              <span className="text-xl font-semibold capitalize">
                {status}
              </span>
              <span className="rounded-full bg-white/20 px-3 py-1">
                {tasks[status].length}
              </span>
            </div>

            <div className="p-4 space-y-3">
              {(tasks[status] || []).map((task, index) => (
                <div
                  key={task._id || index}
                  draggable
                  onDragStart={() => handleDragStart(task, status)}
                  className={`p-3 rounded text-white cursor-move ${
                    isOverdue(task.dueDate)
                      ? "bg-red-500/30 border border-red-500"
                      : "bg-white/10"
                  }`}
                >
                  <div className="font-bold">Task {index + 1}</div>
                  {task.text}

                  <div className="text-xs text-gray-400 mt-1">
                    Created:{" "}
                    {task.createdAt &&
                      new Date(task.createdAt).toLocaleDateString()}
                  </div>

                  {task.dueDate && (
                    <div className="text-xs text-yellow-400">
                      Due: {task.dueDate}
                    </div>
                  )}

                  {task.completedAt && (
                    <div className="text-xs text-green-400">
                      Done:{" "}
                      {new Date(task.completedAt).toLocaleString()}
                    </div>
                  )}

                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleDelete(task._id, status)}
                      className="text-xs bg-red-500/30 px-2 py-1 rounded hover:bg-red-500/50 cursor-pointer"
                    >
                      🗑️
                    </button>

                    <button
                      onClick={() => {
                        setNewTask(task.text);
                        setDueDate(task.dueDate || "");
                        setIsEditing(true);
                        setEditId(task._id);
                      }}
                      className="text-xs bg-green-500/30 px-2 py-1 rounded hover:bg-green-500/50 cursor-pointer"
                    >
                      Update
                    </button>

                    {status !== "completed" && (
                      <button
                        onClick={() => markAsCompleted(task, status)}
                        className="text-xs bg-green-500/30 px-2 py-1 rounded cursor-pointer"
                      >
                        Complete
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {tasks[status].length === 0 && (
                <div className="text-gray-500 text-center py-4">
                  No tasks in this category
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};