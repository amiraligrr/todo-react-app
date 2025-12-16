import { useState ,useEffect} from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../hooks/authslice";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
useEffect(() => {
    const loginCookie = Cookies.get("login");
    if (loginCookie) {
      navigate("/todo");
     
    }})
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
       
        const res = await axios.get(
          `http://localhost:3001/users?email=${email}&password=${password}`
        );

        if (res.data.length === 0) {
          alert("ایمیل یا رمز عبور اشتباه است");
          return;
        }

        const user = res.data[0];
        dispatch(login(user));
       
        navigate("/todo");
      } else {
       
        const exist = await axios.get(
          `http://localhost:3001/users?email=${email}`
        );

        if (exist.data.length > 0) {
          alert("این ایمیل قبلاً ثبت شده است");
          return;
        }

        const newUser = {
          username,
          email,
          password,
          todos: [],
        };

        const res = await axios.post("http://localhost:3001/users", newUser);
        dispatch(login(res.data));
        Cookies.set("login", "true", { expires: 1 });
        navigate("/todo");
      }
    } catch (err) {
      console.error(err);
      alert("خطا در اتصال به سرور");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-950 to-gray-900 px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl p-10 w-full max-w-md relative overflow-hidden"
      >
        <h2 className="text-3xl font-bold text-indigo-400 text-center mb-8">
          {isLogin ? "ورود به حساب کاربری" : "ساخت حساب جدید"}
        </h2>

        <AnimatePresence mode="wait">
          <motion.form
            key={isLogin ? "login" : "register"}
            initial={{ opacity: 0, x: isLogin ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isLogin ? -100 : 100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            onSubmit={handleSubmit}
            className="flex flex-col space-y-5"
          >
            {!isLogin && (
              <input
                type="text"
                placeholder="نام کاربری"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 rounded-xl bg-gray-800 text-gray-100 border border-gray-700 focus:border-indigo-500 outline-none"
              />
            )}
            <input
              type="email"
              placeholder="ایمیل"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-xl bg-gray-800 text-gray-100 border border-gray-700 focus:border-indigo-500 outline-none"
            />
            <input
              type="password"
              placeholder="رمز عبور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-xl bg-gray-800 text-gray-100 border border-gray-700 focus:border-indigo-500 outline-none"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-indigo-600 hover:bg-indigo-700 transition py-3 rounded-xl font-semibold text-lg"
            >
              {isLogin ? "ورود" : "ثبت‌نام"}
            </motion.button>
          </motion.form>
        </AnimatePresence>

        <div className="text-gray-400 text-sm text-center mt-6">
          {isLogin ? (
            <>
              حساب نداری؟{" "}
              <button
                onClick={() => setIsLogin(false)}
                className="text-indigo-400 hover:text-indigo-300 transition font-semibold"
              >
                ثبت‌نام کن
              </button>
            </>
          ) : (
            <>
              حساب داری؟{" "}
              <button
                onClick={() => setIsLogin(true)}
                className="text-indigo-400 hover:text-indigo-300 transition font-semibold"
              >
                وارد شو
              </button>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
