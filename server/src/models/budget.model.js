import knex from "../db/knex.js";

export async function create(summary, trx = knex) {
  const [created] = await trx("budget_summary").insert(summary).returning("*");
  return created;
}

export function findByProject(projectId) {
  return knex("budget_summary").where({ project_id: projectId }).first();
}
