import * as Tools from "../models/tools.model.js";

export async function getToolsByProject(req, res, next) {
  try {
    const tools = await Tools.findByProject(req.params.projectId);
    res.json(tools);
  } catch (err) {
    next(err);
  }
}
