import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar"
import Footer from "./footer"

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-row-reverse bg-gray-950 text-gray-100 font-sans">
      <Sidebar />
      <main className="flex-1 flex flex-col justify-between">
        <div className="flex-1">
          <Outlet /> {/* صفحات Route اینجا رندر میشن */}
        </div>
        <Footer />
      </main>
    </div>
  );
}
