export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center px-6 py-24 md:py-40">
      <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">مدیریت تسک‌ها آسان شد</h1>
      <p className="text-gray-400 max-w-2xl mb-10">
        با اپ ما می‌توانید تسک‌های روزانه خود را مدیریت کنید، اولویت‌بندی کنید و هیچ کاری را فراموش نکنید.
      </p>
      <button className="bg-indigo-600 hover:bg-indigo-700 transition px-8 py-4 rounded-xl text-white font-semibold">
        شروع کنید
      </button>
    </section>
  );
}
