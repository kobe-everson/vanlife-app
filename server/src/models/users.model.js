import knex from "../db/knex.js";

export function findAll() {
  return knex("users");
}

export function findById(id) {
  return knex("users").where({ id }).first();
}
