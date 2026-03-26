import knex from "../db/knex.js";

export function findByProject(projectId) {
  return knex("materials").where({ project_id: projectId });
}

export function findById(id) {
  return knex("materials").where({ id }).first();
}
