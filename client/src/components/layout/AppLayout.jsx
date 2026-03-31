import { Outlet } from "react-router-dom";
import AppSidebar from "./AppSidebar";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-gray-200">
      <AppSidebar />

      <main className="ml-60 p-8 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
