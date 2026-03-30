import * as Tasks from "../models/tasks.model.js";
import * as Projects from "../models/projects.model.js";

export async function getTasksByProject(req, res, next) {
  try {
    const project = await Projects.findByIdAndUserId(
      req.params.projectId,
      req.user.id,
    );
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const tasks = await Tasks.findByProject(req.params.projectId);
    res.json(tasks);
  } catch (err) {
    next(err);
  }
}
