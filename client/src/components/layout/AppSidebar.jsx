import { useAuth } from "../../context/AuthContext";
import { NavLink } from "react-router-dom";

export default function AppSidebar() {
  const { user, logout } = useAuth();

  const linkBase = "block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md";
  const active = "bg-gray-200 font-semibold";

  return (
    <aside className="fixed inset-y-0 left-0 w-60 bg-gray-300 shadow-lg flex flex-col">
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-900">Vanlio</h1>
        <p className="text-gray-600 mt-0.5 text-md">{user.email}</p>
      </div>
      <nav className="px-4 space-y-2 flex-1 overflow-y-auto">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => `${linkBase} ${isActive ? active : ""}`}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) => `${linkBase} ${isActive ? active : ""}`}
        >
          Projects
        </NavLink>
        <NavLink
          to="/tools"
          className={({ isActive }) => `${linkBase} ${isActive ? active : ""}`}
        >
          Tools
        </NavLink>
      </nav>
      <div className="p-4">
        <button
          onClick={logout}
          className="w-full bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 font-medium cursor-pointer"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
