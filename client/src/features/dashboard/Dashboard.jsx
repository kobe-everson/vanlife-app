import { useAuth } from "../../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Hello, {user?.first_name || user?.email}!
        </h2>
        <p className="text-gray-600">
          Manage your van build projects, tasks, materials, tools, and budget
        </p>
        <div className="mt-6 grid grid-cols-1 gap-4">
          <div className="bg-blue-200 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900">Projects</h3>
            <p className="text-blue-700">Manage your build projects</p>
          </div>
          <div className="bg-green-200 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900">Tasks</h3>
            <p className="text-green-700">Track your tasks and progress</p>
          </div>
          <div className="bg-orange-200 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900">Budget</h3>
            <p className="text-orange-700">Monitor your expenses</p>
          </div>
        </div>
      </div>
    </div>
  );
}
