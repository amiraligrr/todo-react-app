import { Routes, Route } from "react-router-dom";
import Layout from "./lut/layout.jsx"; // سایدبار + فوتر
import Footer from "./lut/footer.jsx"; // فقط فوتر
import Landing from "./feature/landing/pages/landing.jsx";
import Todo from "./feature/todo/pages/todo.jsx";
import Auth from "./feature/auth/pages/login.jsx";
import TestTodo from "./feature/todo/pages/testtodo.jsx";
import Profile from "./feature/auth/pages/profile.jsx";

export default function App() {
  return (
    <Routes>
      {/* صفحات اصلی با سایدبار */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* صفحه تستی بدون سایدبار، فقط فوتر */}
      <Route
        path="/testtodo"
        element={
          <div className="min-h-screen flex flex-col bg-gray-950 text-gray-100">
            <main className="flex-1">
              <TestTodo />
            </main>
            <Footer />
          </div>
        }
      />
    </Routes>
  );
}
