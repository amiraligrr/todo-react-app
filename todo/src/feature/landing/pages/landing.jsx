import TestTodo from "../../todo/pages/testtodo.jsx";
import { useNavigate } from "react-router-dom";
export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="text-gray-100">

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24 md:py-40 bg-gradient-to-b from-gray-900 to-gray-950">
        <h1 className="text-5xl md:text-7xl font-extrabold text-indigo-400 mb-6 leading-tight">
          مدیریت تسک‌ها <br /> ساده، سریع و هوشمند
        </h1>
        <p className="text-gray-400 max-w-2xl mb-10 text-lg md:text-xl">
          اپ ما برای کنترل تسک‌های روزانه ساخته شده — فقط اضافه کن، حذف کن و اولویت بده.
          طراحی شده برای سادگی و تمرکز.
        </p>
        <button
          onClick={() => (navigate('/todo'))}
          className="bg-indigo-600 hover:bg-indigo-700 transition px-10 py-4 rounded-2xl text-lg font-semibold"
        >
          شروع کنید
        </button>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8 px-6 md:px-20 py-28 bg-gray-950">
        {[
          {
            title: "افزودن تسک با یک کلیک",
            desc: "به‌سرعت تسک‌های جدید اضافه کن و به کارهات نظم بده.",
            icon: "📝",
          },
          {
            title: "حذف آسان و تمیز",
            desc: "وقتی کاری تموم شد، با یه کلیک حذفش کن و ذهنت رو آزاد کن.",
            icon: "🗑️",
          },
          {
            title: "اولویت‌بندی هوشمند",
            desc: "کارهای مهم رو همیشه در صدر نگه دار تا چیزی از قلم نیفته.",
            icon: "⭐",
          },
        ].map((f) => (
          <div
            key={f.title}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-indigo-600 hover:shadow-lg transition duration-300"
          >
            <div className="text-4xl mb-4">{f.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-indigo-400">{f.title}</h3>
            <p className="text-gray-400">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Demo Section (Responsive TestTodo Preview) */}
      <section className="py-28 px-6 md:px-20 bg-gradient-to-b from-gray-950 to-gray-900 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-10">
          پیش‌نمایش زنده ✨
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-16">
          بدون نیاز به ثبت‌نام، همین‌جا محیط واقعی اپ رو ببین.
          اضافه کردن، حذف کردن و اولویت‌بندی تسک‌ها فقط با چند کلیک.
        </p>

        <div className="w-full max-w-full md:max-w-5xl mx-auto">
          {/* رندر مستقیم TestTodo داخل لندینگ */}
          <div className="bg-gray-900 rounded-3xl p-4 md:p-6 shadow-2xl">
       <div className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-3xl border border-gray-800 shadow-2xl
    h-[400px] sm:h-[450px] md:h-[550px] lg:h-[600px]"
>
  <iframe
    src="/testtodo"
    title="Todo App Preview"
    className="w-full h-full rounded-3xl border-0"
  />
</div>


          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24 bg-gradient-to-b from-gray-900 to-indigo-900">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          آماده‌ای شروع کنی؟
        </h2>
        <p className="text-gray-300 max-w-xl mb-10">
          همین حالا اپ رو امتحان کن و اولین تسک‌هاتو بساز.
          سادگی در کنار نظم واقعی!
        </p>
        <button
          onClick={() => (navigate('/todo'))}
          className="bg-indigo-600 hover:bg-indigo-700 px-10 py-4 rounded-2xl text-lg font-semibold transition"
        >
          برو به صفحه‌ی تسک‌ها
        </button>
      </section>

    </div>
  );
}
