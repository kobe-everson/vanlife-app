import * as Materials from "../models/materials.model.js";

export async function getMaterialsByProject(req, res, next) {
  try {
    const materials = await Materials.findByProject(req.params.projectId);
    res.json(materials);
  } catch (err) {
    next(err);
  }
}
