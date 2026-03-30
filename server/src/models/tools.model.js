import knex from "../db/knex.js";

export function findByUser(userId) {
  return knex("tools").where({ user_id: userId });
}

export function findById(id) {
  return knex("tools").where({ id }).first();
}
