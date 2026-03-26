import * as Budget from "../models/budget.model.js";

export async function getBudgetByProject(req, res, next) {
  try {
    const summary = await Budget.findByProject(req.params.projectId);

    if (!summary) {
      return res.status(404).json({ message: "Budget summary not found" });
    }

    res.json(summary);
  } catch (err) {
    next(err);
  }
}
