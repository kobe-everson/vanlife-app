import { useNavigate } from "react-router-dom";

export default function NewProject() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Create New Project
          </h1>
          <p className="text-gray-600 mt-2">Starter page for project builder</p>
        </div>
        <button
          type="button"
          className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 hover:shadow-lg cursor-pointer"
          onClick={() => navigate(-1)}
        >
          Back to projects
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-700">Builder UI coming soon...</p>
      </div>
    </div>
  );
}
