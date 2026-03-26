import knex from "../db/knex.js";

export function findByProject(projectId) {
  return knex("tasks").where({ project_id: projectId });
}

export function findById(id) {
  return knex("tasks").where({ id }).first();
}
