import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import ProjectTile from "../components/ProjectTile";
import { useProjects } from "../hooks/useProjects";

export default function Projects() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { ongoing, completed, loading, error } = useProjects();

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="mt-2 text-gray-600">
            Build projects are organized here so you can jump into ongoing work
            or review completed builds.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/projects/new")}
          className="inline-flex items-center justify-center font-medium rounded-md bg-green-400 px-4 py-2 text-white shadow-sm hover:bg-green-600 hover:shadow-lg cursor-pointer"
        >
          New Project
        </button>
      </div>

      <div className="space-y-8">
        <section className="bg-white rounded-lg shadow p-6">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Ongoing Projects
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Projects with active tasks or work still in progress.
              </p>
            </div>
            <span className="text-sm font-medium text-gray-700">
              {ongoing.length} ongoing
            </span>
          </div>

          {loading ? (
            <p className="text-gray-600">Loading projects…</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : ongoing.length === 0 ? (
            <p className="text-gray-600">No ongoing projects found yet.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {ongoing.map((project) => (
                <ProjectTile
                  key={project.id}
                  title={project.name}
                  tasksCount={project.tasksCount}
                  status="ongoing"
                  onClick={() => navigate(`/projects/${project.id}`)}
                />
              ))}
            </div>
          )}
        </section>

        <section className="bg-white rounded-lg shadow p-6">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Completed Projects
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Projects where all tasks are complete.
              </p>
            </div>
            <span className="text-sm font-medium text-gray-700">
              {completed.length} completed
            </span>
          </div>

          {loading ? (
            <p className="text-gray-600">Loading projects…</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : completed.length === 0 ? (
            <p className="text-gray-600">No completed projects yet.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {completed.map((project) => (
                <ProjectTile
                  key={project.id}
                  title={project.name}
                  tasksCount={project.tasksCount}
                  status="completed"
                  onClick={() => navigate(`/projects/${project.id}`)}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
