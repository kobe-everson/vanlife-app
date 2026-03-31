import { useEffect, useState } from "react";
import {
  getProjectById,
  getProjectTasks,
  updateProject,
  deleteProject as deleteProjectApi,
} from "../api/projects";

export function useProjectDetail(projectId) {
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

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
          setError(err.message || "Failed to load project details");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    if (projectId) {
      loadProject();
    }

    return () => {
      isMounted = false;
    };
  }, [projectId]);

  async function saveProjectChange(changes) {
    setIsSaving(true);
    setSaveError("");

    try {
      const updatedProject = await updateProject(projectId, changes);
      setProject(updatedProject);
      return updatedProject;
    } catch (err) {
      const message = err.message || "Failed to save changes.";
      setSaveError(message);
      throw err;
    } finally {
      setIsSaving(false);
    }
  }

  async function deleteProject() {
    setIsSaving(true);
    setSaveError("");

    try {
      await deleteProjectApi(projectId);
    } catch (err) {
      const message = err.message || "Failed to delete project.";
      setSaveError(message);
      throw err;
    } finally {
      setIsSaving(false);
    }
  }

  return {
    project,
    setProject,
    setTasks,
    tasks,
    loading,
    error,
    setError,
    isSaving,
    setSaveError,
    saveError,
    saveProjectChange,
    deleteProject,
  };
}
