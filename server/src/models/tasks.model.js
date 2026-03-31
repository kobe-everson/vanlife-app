import knex from "../db/knex.js";

export async function create(task, trx = knex) {
  const [created] = await trx("tasks").insert(task).returning("*");
  return created;
}

export function findByProject(projectId) {
  return knex("tasks").where({ project_id: projectId });
}

export function findById(id) {
  return knex("tasks").where({ id }).first();
}
