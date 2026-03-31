import knex from "../db/knex.js";

export function findByProject(projectId) {
  return knex("categories").where({ project_id: projectId });
}

export async function create(category, trx = knex) {
  const [created] = await trx("categories").insert(category).returning("*");
  return created;
}
