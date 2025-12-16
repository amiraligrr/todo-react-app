import { useState, useEffect } from "react";
import { Check, Trash2, Edit2, Save, Undo } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function TestTodo() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("low");

  useEffect(() => {
    const loginCookie = Cookies.get("login");
    if (!loginCookie) {
      navigate("/login");
      return;
    }

    const loginData = JSON.parse(loginCookie);
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/users/${loginData.id}`);
        setUser(res.data);
        setTasks(res.data.todos || []);
      } catch (err) {
        console.error(err);
        navigate("/login");
      }
    };
    fetchUser();
  }, [navigate]);

  const updateTodos = async (updatedTodos) => {
    setTasks(updatedTodos);
    if (!user) return;
    try {
      const updatedUser = { ...user, todos: updatedTodos };
      await axios.patch(`http://localhost:3001/users/${user.id}`, { todos: updatedTodos });
      setUser(updatedUser);
      Cookies.set("login", JSON.stringify(updatedUser), { expires: 7 });
    } catch (err) {
      console.error(err);
    }
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    const newItem = { id: Date.now(), text: newTask, priority, done: false };
    updateTodos([...tasks, newItem]);
    setNewTask("");
    setPriority("low");
  };

  const deleteTask = (id) => updateTodos(tasks.filter((t) => t.id !== id));
  const toggleDone = (id) => updateTodos(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  const toggleEdit = (id) => updateTodos(tasks.map((t) => (t.id === id ? { ...t, editing: !t.editing } : t)));
  const saveEdit = (id, newText) => updateTodos(tasks.map((t) => (t.id === id ? { ...t, text: newText, editing: false } : t)));

  const priorityOrder = { high: 0, medium: 1, low: 2 };
  const activeTasks = [...tasks.filter((t) => !t.done)].sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  );
  const completedTasks = [...tasks.filter((t) => t.done)].sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  );

  const TaskCard = ({ task }) => {
    const priorityColors = {
      high: "bg-red-700 border-red-600 shadow-lg",
      medium: "bg-yellow-700 border-yellow-600 shadow-lg",
      low: "bg-green-700 border-green-600 shadow-lg",
    };

    return (
      <div
        className={`flex flex-col md:flex-row justify-between items-start md:items-center p-7 w-[80%] rounded-3xl border transition-all hover:scale-105 hover:shadow-2xl ${
          priorityColors[task.priority]
        }`}
      >
        <div className="flex-1 flex flex-col md:flex-row md:items-center gap-4 w-full">
          {task.editing ? (
            <input
              type="text"
              defaultValue={task.text}
              onKeyDown={(e) => e.key === "Enter" && saveEdit(task.id, e.target.value)}
              className="bg-gray-900 text-gray-100 p-2 rounded-lg outline-none border border-gray-700 flex-1 "
            />
          ) : (
            <p className={`text-gray-100 text-2xl font-medium ${task.done ? "line-through text-gray-300" : ""}`}>
              {task.text}
            </p>
          )}
          <span
            className={`text-sm font-semibold ${
              task.priority === "high"
                ? "text-red-200"
                : task.priority === "medium"
                ? "text-yellow-200"
                : "text-green-200"
            }`}
          >
            {task.priority === "high" ? "زیاد" : task.priority === "medium" ? "متوسط" : "کم"}
          </span>
        </div>

        <div className="flex gap-2 mt-3 md:mt-0">
          {task.editing ? (
            <button
              onClick={() => saveEdit(task.id, document.activeElement.value || task.text)}
              className="p-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
            >
              <Save size={18} />
            </button>
          ) : (
            <button onClick={() => toggleEdit(task.id)} className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition">
              <Edit2 size={18} />
            </button>
          )}
          <button
            onClick={() => toggleDone(task.id)}
            className={`p-2 rounded-lg ${task.done ? "bg-yellow-600 hover:bg-yellow-700" : "bg-green-600 hover:bg-green-700"} transition`}
          >
            {task.done ? <Undo size={18} /> : <Check size={18} />}
          </button>
          <button onClick={() => deleteTask(task.id)} className="p-2 bg-red-600 rounded-lg hover:bg-red-700 transition">
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    );
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 px-4 md:px-12 py-10 md:flex md:gap-6">
      {/* سایدبار دسکتاپ */}
      <div className="hidden md:flex w-1/4 flex-col items-center border-l border-gray-800 p-4">
        {/* فقط فضای سایدبار */}
      </div>

      {/* محتوای اصلی */}
      <div className="flex-1 md:pr-80">
        <h1 className="text-4xl font-bold text-indigo-400 mb-10 text-center md:text-left">Todo</h1>

        {/* Input Section */}
        <div className="flex flex-col md:flex-row items-center gap-4 mb-10">
          <input
            type="text"
            placeholder="یک تسک جدید..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex-1 bg-gray-900 p-4 rounded-3xl border border-gray-700 outline-none focus:border-indigo-500"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="bg-gray-900 border border-gray-700 rounded-3xl p-3 text-gray-200 focus:border-indigo-500"
          >
            <option value="low">کم</option>
            <option value="medium">متوسط</option>
            <option value="high">زیاد</option>
          </select>
          <button onClick={addTask} className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-3xl font-semibold transition">
            افزودن
          </button>
        </div>

        {/* Active Tasks */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-300">در حال انجام ({activeTasks.length})</h2>
          <div className="flex flex-col gap-4">
            {activeTasks.length === 0 ? <p className="text-gray-500">تسکی نداری...</p> : activeTasks.map((task) => <TaskCard key={task.id} task={task} />)}
          </div>
        </div>

        {/* Completed Tasks */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-green-400">انجام‌شده‌ها ({completedTasks.length})</h2>
          <div className="flex flex-col gap-4">
            {completedTasks.length === 0 ? <p className="text-gray-500">هنوز چیزی انجام نشده 😎</p> : completedTasks.map((task) => <TaskCard key={task.id} task={task} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
