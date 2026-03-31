// Builder page for new projects -

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../../../context/AuthContext";
import { createProject, getToolsForUser } from "../api/projects";

// Temporary UUID helper for creating empty categories and tasks
function createId() {
  return uuidv4();
}

function createEmptyCategory() {
  return {
    id: createId(),
    name: "",
    description: "",
    tasks: [],
  };
}

function createEmptyTask() {
  return {
    id: createId(),
    name: "",
    description: "",
    status: "pending",
    toolIds: [],
  };
}

// Export NewProject
export default function NewProject() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startingBudget, setStartingBudget] = useState("");
  const [categories, setCategories] = useState([]);
  const [tools, setTools] = useState([]);
  const [loadingTools, setLoadingTools] = useState(false);
  const [toolsError, setToolsError] = useState("");
  const [creating, setCreating] = useState(false);
  const [formError, setFormError] = useState("");

  // Load user's available tools
  useEffect(() => {
    if (!user?.id) return;

    async function loadTools() {
      setLoadingTools(true);
      setToolsError("");

      try {
        const toolData = await getToolsForUser(user.id);
        setTools(toolData);
      } catch (err) {
        setToolsError(err.message || "Unable to load your tools.");
      } finally {
        setLoadingTools(false);
      }
    }

    loadTools();
  }, [user?.id]);

  // Next page
  const handleNext = () => {
    setFormError("");

    if (!name.trim()) {
      setFormError("Project name required.");
      return;
    }

    const budgetValue = Number(startingBudget);
    if (
      !startingBudget.trim() ||
      Number.isNaN(budgetValue) ||
      budgetValue < 0
    ) {
      setFormError("Valid starting budget required.");
      return;
    }

    setStep(2);
  };

  // Previous page
  const handleBack = () => {
    setFormError("");
    setStep(1);
  };

  // Add, remove, and update categories

  // Add empty category when new category is selected
  const addCategory = () => {
    setCategories((current) => [...current, createEmptyCategory()]);
  };

  const removeCategory = (categoryId) => {
    setCategories((current) =>
      current.filter((category) => category.id !== categoryId),
    );
  };

  const updateCategory = (categoryId, field, value) => {
    setCategories((current) =>
      current.map((category) =>
        category.id === categoryId ? { ...category, [field]: value } : category,
      ),
    );
  };

  // Add, remove and update tasks within a specific category

  // Add empty task when new task is selected
  const addTask = (categoryId) => {
    setCategories((current) =>
      current.map((category) =>
        category.id === categoryId
          ? { ...category, tasks: [...category.tasks, createEmptyTask()] }
          : category,
      ),
    );
  };

  const removeTask = (categoryId, taskId) => {
    setCategories((current) =>
      current.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              tasks: category.tasks.filter((task) => task.id !== taskId),
            }
          : category,
      ),
    );
  };

  const updateTask = (categoryId, taskId, field, value) => {
    setCategories((current) =>
      current.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              tasks: category.tasks.map((task) =>
                task.id === taskId ? { ...task, [field]: value } : task,
              ),
            }
          : category,
      ),
    );
  };

  // Assign tool to a specific task
  const toggleTaskTool = (categoryId, taskId, toolId) => {
    setCategories((current) =>
      current.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              tasks: category.tasks.map((task) => {
                if (task.id !== taskId) return task;
                const hasTool = task.toolIds.includes(toolId);
                return {
                  ...task,
                  toolIds: hasTool
                    ? task.toolIds.filter((id) => id !== toolId)
                    : [...task.toolIds, toolId],
                };
              }),
            }
          : category,
      ),
    );
  };

  const handleSubmit = async () => {
    setFormError("");

    if (!name.trim()) {
      setFormError("Project name required.");
      setStep(1);
      return;
    }

    const budgetValue = Number(startingBudget);
    if (
      !startingBudget.trim() ||
      Number.isNaN(budgetValue) ||
      budgetValue < 0
    ) {
      setFormError("Valid starting budget required.");
      setStep(1);
      return;
    }

    setCreating(true);

    // Clean up project data for creation
    const newProjectCreation = {
      name: name.trim(),
      description: description.trim(),
      startingBudget: budgetValue,
      categories: categories
        .filter((category) => category.name.trim())
        .map((category) => ({
          name: category.name.trim(),
          description: category.description.trim(),
          tasks: category.tasks
            .filter((task) => task.name.trim())
            .map((task, index) => ({
              name: task.name.trim(),
              description: task.description.trim(),
              status: task.status || "pending",
              orderIndex: index + 1,
              toolIds: task.toolIds,
            })),
        })),
    };

    try {
      const response = await createProject(newProjectCreation);
      navigate(`/projects/${response.project.id}`);
    } catch (err) {
      setFormError(err.message || "Unable to create project.");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">New Project</h1>
          <p className="text-gray-600 mt-2">
            Create a new project with starting budget, categories, tasks, and
            tool linkages.
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

      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              Step {step} of 2
            </p>
            <h2 className="text-2xl font-semibold text-gray-900">
              {step === 1 ? "Project details" : "Categories, tasks, and tools"}
            </h2>
          </div>
          {step === 1 ? (
            <button
              type="button"
              onClick={addCategory}
              className="inline-flex items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
            >
              Add category later
            </button>
          ) : null}
        </div>

        {formError ? (
          <div className="mb-6 rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
            {formError}
          </div>
        ) : null}

        {step === 1 ? (
          <div className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium text-gray-700">
                  Project name
                </span>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  type="text"
                  placeholder="Name for your new project..."
                  className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-gray-700">
                  Starting budget
                </span>
                <input
                  value={startingBudget}
                  onChange={(event) => setStartingBudget(event.target.value)}
                  type="number"
                  min="0"
                  step="100"
                  placeholder="Starting budget..."
                  className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                />
              </label>
            </div>

            <label className="block">
              <span className="text-sm font-medium text-gray-700">
                Project description
              </span>
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                rows="4"
                placeholder="Describe your project goals and any other important details..."
                className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
              />
            </label>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => navigate("/projects")}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Continue to task details
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Add categories and tasks now, then link any tools you already
                own.
              </p>
              <button
                type="button"
                onClick={addCategory}
                className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 cursor-pointer"
              >
                Add category
              </button>
            </div>

            {categories.length === 0 ? (
              <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center text-gray-600">
                No categories added yet. Use the button above to start.
              </div>
            ) : (
              <div className="space-y-6">
                {categories.map((category, categoryIndex) => (
                  <div
                    key={category.id}
                    className="rounded-xl border border-gray-200 p-5"
                  >
                    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Category {categoryIndex + 1}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Group tasks under this category.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeCategory(category.id)}
                        className="text-sm font-medium text-red-600 hover:text-red-800 cursor-pointer"
                      >
                        Remove category
                      </button>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-2">
                      <label className="block">
                        <span className="text-sm font-medium text-gray-700">
                          Category name
                        </span>
                        <input
                          value={category.name}
                          onChange={(event) =>
                            updateCategory(
                              category.id,
                              "name",
                              event.target.value,
                            )
                          }
                          type="text"
                          placeholder="Category (i.e. electrical, water, storage...)"
                          className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                        />
                      </label>
                      <label className="block">
                        <span className="text-sm font-medium text-gray-700">
                          Category description
                        </span>
                        <input
                          value={category.description}
                          onChange={(event) =>
                            updateCategory(
                              category.id,
                              "description",
                              event.target.value,
                            )
                          }
                          type="text"
                          placeholder="Category description (i.e. install solar panels and battery bank...)"
                          className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                        />
                      </label>
                    </div>

                    <div className="mt-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-base font-semibold text-gray-900">
                          Tasks
                        </h4>
                        <button
                          type="button"
                          onClick={() => addTask(category.id)}
                          className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
                        >
                          Add task
                        </button>
                      </div>

                      {category.tasks.length === 0 ? (
                        <p className="text-sm text-gray-500">
                          Add tasks to this category to scope work and link
                          tools.
                        </p>
                      ) : (
                        <div className="space-y-4">
                          {category.tasks.map((task) => (
                            <div
                              key={task.id}
                              className="rounded-lg border border-gray-200 p-4"
                            >
                              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                <div>
                                  <h5 className="text-sm font-semibold text-gray-900">
                                    Task
                                  </h5>
                                  <p className="text-sm text-gray-500">
                                    Enter a task name, description, and optional
                                    tools.
                                  </p>
                                </div>
                                <button
                                  type="button"
                                  onClick={() =>
                                    removeTask(category.id, task.id)
                                  }
                                  className="text-sm font-medium text-red-600 hover:text-red-800"
                                >
                                  Remove task
                                </button>
                              </div>

                              <div className="grid gap-6 lg:grid-cols-2">
                                <label className="block">
                                  <span className="text-sm font-medium text-gray-700">
                                    Task name
                                  </span>
                                  <input
                                    value={task.name}
                                    onChange={(event) =>
                                      updateTask(
                                        category.id,
                                        task.id,
                                        "name",
                                        event.target.value,
                                      )
                                    }
                                    type="text"
                                    placeholder="Task name (i.e. install solar panels, install battery bank, etc...)"
                                    className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                                  />
                                </label>
                                <label className="block">
                                  <span className="text-sm font-medium text-gray-700">
                                    Status
                                  </span>
                                  <select
                                    value={task.status}
                                    onChange={(event) =>
                                      updateTask(
                                        category.id,
                                        task.id,
                                        "status",
                                        event.target.value,
                                      )
                                    }
                                    className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                                  >
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">
                                      In progress
                                    </option>
                                    <option value="completed">Completed</option>
                                    <option value="blocked">Blocked</option>
                                  </select>
                                </label>
                              </div>

                              <label className="block mt-4">
                                <span className="text-sm font-medium text-gray-700">
                                  Task description
                                </span>
                                <textarea
                                  value={task.description}
                                  onChange={(event) =>
                                    updateTask(
                                      category.id,
                                      task.id,
                                      "description",
                                      event.target.value,
                                    )
                                  }
                                  rows="3"
                                  placeholder="Describe the task (i.e. Mount the panels on the van roof and secure wiring...)"
                                  className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                                />
                              </label>

                              <div className="mt-4">
                                <p className="text-sm font-medium text-gray-700">
                                  Link tools
                                </p>
                                {loadingTools ? (
                                  <p className="mt-2 text-sm text-gray-500">
                                    Loading tools…
                                  </p>
                                ) : toolsError ? (
                                  <p className="mt-2 text-sm text-red-600">
                                    {toolsError}
                                  </p>
                                ) : tools.length === 0 ? (
                                  <p className="mt-2 text-sm text-gray-500">
                                    No tools found for your account.
                                  </p>
                                ) : (
                                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                                    {tools.map((tool) => (
                                      <label
                                        key={tool.id}
                                        className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2"
                                      >
                                        <input
                                          type="checkbox"
                                          checked={task.toolIds.includes(
                                            tool.id,
                                          )}
                                          onChange={() =>
                                            toggleTaskTool(
                                              category.id,
                                              task.id,
                                              tool.id,
                                            )
                                          }
                                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="text-sm text-gray-700">
                                          {tool.name}
                                        </span>
                                      </label>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={handleBack}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Back to project details
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={creating}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
              >
                {creating ? "Creating project…" : "Create project"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
