import { useAuth } from "../../../context/AuthContext";

export default function Tools() {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Tools</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Hello, {user?.first_name || user?.email}!
        </h2>
        <p className="text-gray-600">
          Tools inventory and management will appear here
        </p>
      </div>
    </div>
  );
}
