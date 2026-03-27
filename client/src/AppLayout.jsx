import { Outlet } from "react-router-dom";
import AppSidebar from "./components/AppSidebar";
// import { useAuth } from "./context/AuthContext";

export default function AppLayout() {
  // const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen bg-gray-200">
      <AppSidebar />

      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
