import { useState, useEffect } from "react";
import { Home, CheckSquare, User, LogOut, Menu } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../feature/auth/hooks/authslice";
import Cookies from "js-cookie";
export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [active, setActive] = useState(location.pathname);
  const [open, setOpen] = useState(false);
   const loginCookie = Cookies.get("login");
  useEffect(() => {
   
    setActive(location.pathname);
  }, [location]);

  // منو بر اساس وضعیت لاگین
  let menu = [];
  if (loginCookie) {
    menu = [
      { path: "/", icon: <Home size={22} />, label: "خانه" },
      { path: "/todo", icon: <CheckSquare size={22} />, label: "تسک‌ها" },
      { path: "/profile", icon: <User size={22} />, label: "پروفایل" },
    ];
  } else {
    menu = [
      { path: "/", icon: <Home size={22} />, label: "خانه" },
      { path: "/login", icon: <User size={22} />, label: "ورود" },
    ];
  }

  const handleClick = (path) => {
    setActive(path);
    navigate(path);
    setOpen(false); // موبایل: بعد از انتخاب آیتم، سایدبار بسته شود
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setOpen(false);
  };

  return (
    <>
      {/* دکمه منو موبایل */}
      {!open && (
        <button
          className="fixed top-4 right-4 z-50 md:hidden p-2 bg-gray-900 rounded-md text-white shadow-lg"
          onClick={() => setOpen(true)}
        >
          <Menu size={24} />
        </button>
      )}

      {/* سایدبار */}
      <aside
        className={`
          fixed top-0 right-0 h-full bg-gray-900 border-l border-gray-800 flex flex-col py-8
          transition-transform duration-300 z-40
          ${open ? "translate-x-0 w-[20٪] md:w-56" : "translate-x-full md:translate-x-0 md:w-56"}
        `}
      >
        <h1 className="text-2xl font-bold mb-10 text-indigo-400 hidden md:block text-center">
          TodoApp
        </h1>

        <nav className="flex flex-col gap-4 w-full px-4">
          {menu.map((item) => (
            <button
              key={item.path}
              onClick={() => handleClick(item.path)}
              className={`
                flex items-center justify-center md:justify-start gap-3 px-4 py-3 rounded-xl transition-all
                ${active === item.path ? "bg-indigo-600 text-white" : "text-gray-400 hover:bg-gray-800"}
              `}
            >
              {item.icon}
              <span className="hidden md:inline text-sm font-medium">{item.label}</span>
            </button>
          ))}

          {loginCookie && (
            <button
              onClick={handleLogout}
              className="flex items-center justify-center md:justify-start gap-3 px-4 py-3 mt-6 rounded-xl text-gray-400 hover:bg-gray-800 transition-all"
            >
              <LogOut size={22} />
              <span className="hidden md:inline text-sm font-medium">خروج</span>
            </button>
          )}
        </nav>

        <div className="mt-auto text-xs text-gray-500 text-center md:block">
          © 2025
        </div>
      </aside>

      {/* لایه پوشش موبایل */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </>
  );
}
