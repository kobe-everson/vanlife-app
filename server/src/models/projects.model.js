import knex from "../db/knex.js";

export function findAll() {
  return knex("build_projects");
}

export function findById(id) {
  return knex("build_projects").where({ id }).first();
}
