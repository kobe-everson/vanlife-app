import * as Tasks from "../models/tasks.model.js";

export async function getTasksByProject(req, res, next) {
  try {
    const tasks = await Tasks.findByProject(req.params.projectId);
    res.json(tasks);
  } catch (err) {
    next(err);
  }
}
