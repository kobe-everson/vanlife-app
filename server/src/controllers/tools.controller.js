import * as Tools from "../models/tools.model.js";

export async function getToolsByUser(req, res, next) {
  try {
    const tools = await Tools.findByUser(req.params.userId);
    res.json(tools);
  } catch (err) {
    next(err);
  }
}
