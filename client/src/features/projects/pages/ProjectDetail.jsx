import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProjectDetail } from "../hooks/useProjectDetail";

export default function ProjectDetail() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const {
    project,
    tasks,
    loading,
    error,
    isSaving,
    saveError,
    saveProjectChange,
    deleteProject,
    setSaveError,
  } = useProjectDetail(projectId);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");

  // Edit name functions
  function startEditName() {
    setNameInput(project?.name || "");
    setSaveError("");
    setIsEditingName(true);
  }

  function cancelEditName() {
    setNameInput(project?.name || "");
    setSaveError("");
    setIsEditingName(false);
  }

  function startEditDescription() {
    setDescriptionInput(project?.description || "");
    setSaveError("");
    setIsEditingDescription(true);
  }

  function cancelEditDescription() {
    setDescriptionInput(project?.description || "");
    setSaveError("");
    setIsEditingDescription(false);
  }

  async function saveName() {
    if (!nameInput.trim()) {
      setSaveError("Project name cannot be empty.");
      return;
    }

    try {
      await saveProjectChange({ name: nameInput.trim() });
      setIsEditingName(false);
    } catch (err) {} // error stored in useProjectDetail hook
  }

  async function saveDescription() {
    try {
      await saveProjectChange({ description: descriptionInput });
      setIsEditingDescription(false);
    } catch (err) {} // error stored in useProjectDetail hook
  }

  async function handleDeleteProject() {
    try {
      await deleteProject();
      navigate("/projects");
    } catch (err) {} // error stored in hook
  }

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
        {/* Edit name ternary: */}
        <div className="flex flex-col gap-3">
          {isEditingName ? (
            <div className="space-y-3">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-3xl font-bold text-gray-900 focus:border-gray-900 focus:outline-none"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={saveName}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  Save
                </button>
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={cancelEditName}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
              {saveError && <p className="text-sm text-red-600">{saveError}</p>}
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-bold text-gray-900 capitalize">
                {project.name}
              </h1>
              <button
                type="button"
                onClick={startEditName}
                className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Edit
              </button>
            </div>
          )}
          <p className="text-gray-600 mt-2">
            Project details and tasks appear below.
          </p>
        </div>
        <button
          type="button"
          className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 hover:shadow-lg cursor-pointer"
          onClick={() => navigate("/projects")}
        >
          Back to projects
        </button>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Project Description
            </h2>
            {/* Edit description ternary: */}
            {!isEditingDescription && (
              <button
                type="button"
                onClick={startEditDescription}
                className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Edit
              </button>
            )}
          </div>
          {isEditingDescription ? (
            <div className="mt-4 space-y-3">
              <textarea
                value={descriptionInput}
                onChange={(e) => setDescriptionInput(e.target.value)}
                rows={4}
                className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-gray-900 focus:outline-none"
              />
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={saveDescription}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  Save
                </button>
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={cancelEditDescription}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
              {saveError && <p className="text-sm text-red-600">{saveError}</p>}
            </div>
          ) : (
            <p className="mt-3 text-gray-700">
              {project.description || "No description available."}
            </p>
          )}
          <div className="mt-4 text-sm text-gray-600">
            <span className="font-semibold">Total Tasks:</span> {tasks.length}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900">Task Details</h2>
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
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            disabled={isSaving}
            onClick={handleDeleteProject}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 hover:shadow-lg cursor-pointer disabled:opacity-50"
          >
            Delete project
          </button>
        </div>
      </div>
    </div>
  );
}
