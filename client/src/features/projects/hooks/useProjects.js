import { useEffect, useMemo, useState } from "react";
// use memo caches the result of a calculated value between re-renders (dependencies)
import { getProjects, getProjectTasks } from "../api/projects";

export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadProjects() {
      setLoading(true);
      setError("");

      try {
        const projectData = await getProjects();
        const enhancedProjectData = await Promise.all(
          projectData.map(async (project) => {
            const tasks = await getProjectTasks(project.id);
            return {
              ...project,
              tasksCount: tasks.length,
              isCompleted:
                tasks.length > 0 &&
                tasks.every((task) => task.status === "completed"),
            };
          }),
        );

        if (isMounted) {
          setProjects(enhancedProjectData);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Unable to load projects");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  const ongoing = useMemo(
    () => projects.filter((project) => !project.isCompleted),
    [projects],
  );

  const completed = useMemo(
    () => projects.filter((project) => project.isCompleted),
    [projects],
  );

  return { projects, ongoing, completed, loading, error };
}
