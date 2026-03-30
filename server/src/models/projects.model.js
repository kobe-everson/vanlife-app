import knex from "../db/knex.js";

export function findAll() {
  return knex("build_projects");
}

export function findAllByUserId(userId) {
  return knex("build_projects").where({ user_id: userId });
}

export function findById(id) {
  return knex("build_projects").where({ id }).first();
}

export function findByIdAndUserId(id, userId) {
  return knex("build_projects").where({ id, user_id: userId }).first();
}
