import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editingField, setEditingField] = useState(null); // username, email, password
  const [fieldValue, setFieldValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");

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
      } catch (err) {
        console.error(err);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [navigate]);

  const handleEdit = (field) => {
    setEditingField(field);
    setFieldValue(user[field]);
  };

  const handleCancel = () => {
    setEditingField(null);
    setFieldValue("");
  };

  const handleSave = async () => {
    if (!fieldValue.trim()) return;

    const updatedUser = { ...user, [editingField]: fieldValue };
    try {
      await axios.patch(`http://localhost:3001/users/${user.id}`, { [editingField]: fieldValue });
      Cookies.set("login", JSON.stringify(updatedUser), { expires: 7 });
      setUser(updatedUser);
      setEditingField(null);
      setSuccess("اطلاعات با موفقیت ذخیره شد!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="text-gray-300 text-center mt-10">در حال بارگذاری...</p>;
  if (!user) return null;

  const fields = [
    { label: "نام کاربری", key: "username" },
    { label: "ایمیل", key: "email" },
    { label: "رمز عبور", key: "password" },
  ];

  return (
    <div className="min-h-screen bg-gray-950 flex justify-center items-start py-10 px-4 md:px-20 text-gray-100">
      <div className="bg-gray-900 p-10 rounded-3xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-indigo-400 mb-8 text-center">پروفایل کاربر</h2>

        <div className="flex flex-col gap-5">
          {fields.map((f) => (
            <div key={f.key} className="flex flex-col gap-2">
              <label className="text-gray-300">{f.label}</label>
              {editingField === f.key ? (
                <div className="flex gap-2">
                  <input
                    type={f.key === "password" ? "password" : "text"}
                    value={fieldValue}
                    onChange={(e) => setFieldValue(e.target.value)}
                    className="flex-1 p-3 rounded-xl bg-gray-800 text-gray-100 border border-gray-700 outline-none focus:border-indigo-500"
                  />
                  <button
                    onClick={handleSave}
                    className="bg-green-600 hover:bg-green-700 px-4 rounded-xl font-semibold transition"
                  >
                    ذخیره
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-red-600 hover:bg-red-700 px-4 rounded-xl font-semibold transition"
                  >
                    لغو
                  </button>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <p className="text-gray-200">{user[f.key]}</p>
                  <button
                    onClick={() => handleEdit(f.key)}
                    className="bg-indigo-600 hover:bg-indigo-700 px-4 py-1 rounded-xl font-semibold transition text-sm"
                  >
                    تغییر
                  </button>
                </div>
              )}
            </div>
          ))}

          {success && <p className="text-green-400 mt-2 text-center">{success}</p>}
        </div>
      </div>
    </div>
  );
}
