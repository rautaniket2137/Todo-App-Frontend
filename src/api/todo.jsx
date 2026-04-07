import API from "./axios.jsx"; // your axios file

// GET TODOSy
export const getTodo = async () => {
  const res = await API.get("/todo");
  return res.data.todos || []; // ✅ always array
};


export const createTodo = async (data) => {
  return await API.post("/todo", data);
};

// DELETE TODO
export const deleteTodo = async (id) => {
  const res = await API.delete(`/todo/${id}`);
  return res.data;
};

// UPDATE TODO
export const updateTodo = async (id, data) => {
  const res = await API.put(`/todo/${id}`, data);
  return res.data;
};