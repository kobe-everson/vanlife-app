import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProjectById, getProjectTasks } from "../api/projects";

export default function ProjectDetail() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadProject() {
      setLoading(true);
      setError("");

      try {
        const [projectData, taskData] = await Promise.all([
          getProjectById(projectId),
          getProjectTasks(projectId),
        ]);

        if (isMounted) {
          setProject(projectData);
          setTasks(taskData);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Unable to load project details");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadProject();

    return () => {
      isMounted = false;
    };
  }, [projectId]);

  if (loading) {
    return <div className="text-gray-600">Loading project details…</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  if (!project) {
    return <div className="text-gray-700">Project not found.</div>;
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
          <p className="text-gray-600 mt-2">
            Project details and tasks appear below.
          </p>
        </div>
        <button
          type="button"
          className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 hover:shadow-lg cursor-pointer"
          onClick={() => navigate(-1)}
        >
          Back to projects
        </button>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Project description
          </h2>
          <p className="mt-3 text-gray-700">
            {project.description || "No description available."}
          </p>
          <div className="mt-4 text-sm text-gray-600">
            <span className="font-semibold">Tasks:</span> {tasks.length}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900">Task list</h2>
          {tasks.length === 0 ? (
            <p className="mt-3 text-gray-700">
              No tasks are attached to this project yet.
            </p>
          ) : (
            <ul className="mt-4 space-y-3">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className="rounded-lg border border-gray-200 p-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-semibold text-gray-900">
                      {task.name}
                    </span>
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-700">
                      {task.status.replace("_", " ")}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    {task.description}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
