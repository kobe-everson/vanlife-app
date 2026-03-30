import { Outlet } from "react-router-dom";
import AppSidebar from "./AppSidebar";

export default function AppLayout() {
  return (
    <div className="flex min-h-screen bg-gray-200">
      <AppSidebar />

      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
