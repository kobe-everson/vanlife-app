import knex from "../db/knex.js";

export function findByProject(projectId) {
  return knex("budget_summary").where({ project_id: projectId }).first();
}
