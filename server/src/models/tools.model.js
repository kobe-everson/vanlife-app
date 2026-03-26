import knex from "../db/knex.js";

export function findByProject(projectId) {
  return knex("tools").where({ project_id: projectId });
}

export function findById(id) {
  return knex("tools").where({ id }).first();
}
