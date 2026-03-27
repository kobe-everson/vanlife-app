import { useAuth } from "../context/AuthContext";

export default function AppSidebar() {
  const { user, logout } = useAuth();
  return (
    <aside className="w-60 bg-gray-300 shadow-lg">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900">Vanlio</h1>
        <p className="text-gray-600 mt-0.5">
          Welcome, {user?.name || user?.email}!
        </p>
      </div>
      <nav className="px-4 space-y-2">
        <a
          href="#"
          className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md"
        >
          Dashboard
        </a>
        <a
          href="#"
          className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md"
        >
          Projects
        </a>
        <a
          href="#"
          className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md"
        >
          Tasks
        </a>
        <a
          href="#"
          className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md"
        >
          Materials
        </a>
        <a
          href="#"
          className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md"
        >
          Tools
        </a>
        <a
          href="#"
          className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md"
        >
          Budget
        </a>
      </nav>
      <div className="absolute bottom-0 w-60 p-4">
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
