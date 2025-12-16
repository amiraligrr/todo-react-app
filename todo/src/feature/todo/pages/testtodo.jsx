import { useState } from "react";
import { Check, Trash2, Edit2, Save, Undo, Contact } from "lucide-react";

export default function TestTodo() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("low");

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([
      ...tasks,
      { id: Date.now(), text: newTask, priority, done: false, editing: false },
    ]);
    setNewTask("");
    setPriority("low");
  };

  const deleteTask = (id) => setTasks(tasks.filter((t) => t.id !== id));
  const toggleDone = (id) =>
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  const toggleEdit = (id) =>
    setTasks(tasks.map((t) => (t.id === id ? { ...t, editing: !t.editing } : t)));
  const saveEdit = (id, newText) =>
    setTasks(tasks.map((t) => (t.id === id ? { ...t, text: newText, editing: false } : t)));

  // مرتب سازی بر اساس اولویت: high > medium > low
  const sortByPriority = (arr) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return [...arr].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  };

  const activeTasks = sortByPriority(tasks.filter((t) => !t.done));
  const completedTasks = sortByPriority(tasks.filter((t) => t.done));

  const TaskCard = ({ task }) => {
    const priorityColors = {
      high: "bg-red-700 border-red-600 shadow-red-500/30",
      medium: "bg-yellow-700 border-yellow-600 shadow-yellow-500/30",
      low: "bg-green-700 border-green-600 shadow-green-500/30",
    };

    return (
      <div
        className={`flex flex-col md:flex-row justify-between items-start md:items-center p-4 rounded-2xl border shadow-lg transition-all hover:scale-105 ${
          priorityColors[task.priority]
        }`}
      >
        <div className="flex-1 flex flex-col md:flex-row md:items-center gap-4 w-full">
          {task.editing ? (
            <input
              type="text"
              defaultValue={task.text}
              onKeyDown={(e) => e.key === "Enter" && saveEdit(task.id, e.target.value)}
              className="bg-gray-900 text-gray-100 p-2 rounded-lg outline-none border border-gray-700 flex-1"
            />
          ) : (
            <p
              className={`text-gray-100 text-lg font-medium ${
                task.done ? "line-through" : ""
              }`}
            >
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
            {task.priority === "high"
              ? "زیاد"
              : task.priority === "medium"
              ? "متوسط"
              : "کم"}
          </span>
        </div>

        <div className="flex gap-2 mt-3 md:mt-0">
          {task.editing ? (
            <button
              onClick={() =>
                saveEdit(task.id, document.activeElement.value || task.text)
              }
              className="p-2 bg-indigo-600 rounded-lg hover:bg-indigo-700"
            >
              <Save size={16} />
            </button>
          ) : (
            <button
              onClick={() => toggleEdit(task.id)}
              className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600"
            >
              <Edit2 size={16} />
            </button>
          )}

          <button
            onClick={() => toggleDone(task.id)}
            className={`p-2 rounded-lg ${
              task.done ? "bg-yellow-600 hover:bg-yellow-700" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {task.done ? <Undo size={16} /> : <Check size={16} />}
          </button>

          <button
            onClick={() => deleteTask(task.id)}
            className="p-2 bg-red-600 rounded-lg hover:bg-red-700"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 px-4 md:px-20 py-10">
      <h1 className="text-4xl font-bold text-indigo-400 mb-10 text-center">
 Todo 
      </h1>

      {/* Input Section */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-10">
        <input
          type="text"
          placeholder="یک تسک جدید..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-1 bg-gray-900 p-4 rounded-2xl border border-gray-700 outline-none focus:border-indigo-500"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="bg-gray-900 border border-gray-700 rounded-2xl p-3 text-gray-200 focus:border-indigo-500"
        >
          <option value="low">کم</option>
          <option value="medium">متوسط</option>
          <option value="high">زیاد</option>
        </select>
        <button
          onClick={addTask}
          className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-2xl font-semibold transition"
        >
          افزودن
        </button>
      </div>

      {/* Active Tasks */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-300">
          در حال انجام ({activeTasks.length})
        </h2>
        <div className="flex flex-col gap-4">
          {activeTasks.length === 0 ? (
            <p className="text-gray-500">تسکی نداری...</p>
          ) : (
            activeTasks.map((task) => <TaskCard key={task.id} task={task} />)
          )}
        </div>
      </div>

      {/* Completed Tasks */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-green-400">
          انجام‌شده‌ها ({completedTasks.length})
        </h2>
        <div className="flex flex-col gap-4">
          {completedTasks.length === 0 ? (
            <p className="text-gray-500">هنوز چیزی انجام نشده 😎</p>
          ) : (
            completedTasks.map((task) => <TaskCard key={task.id} task={task} />)
          )}
        </div>
      </div>
    </div>
  );
}
