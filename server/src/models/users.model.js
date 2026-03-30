import knex from "../db/knex.js";

export function findAll() {
  return knex("users");
}

export function findById(id) {
  return knex("users").where({ id }).first();
}

export function findByEmail(email) {
  return knex("users").where({ email }).first();
}

export async function create({ first_name, last_name, email, password_hash }) {
  const [user] = await knex("users")
    .insert({ first_name, last_name, email, password_hash })
    .returning("*");
  return user;
}
