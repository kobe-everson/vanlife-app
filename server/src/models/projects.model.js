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

// Create project (post; insert data)
export async function create(project, trx = knex) {
  const [created] = await trx("build_projects").insert(project).returning("*");
  return created;
}

// Update project (patch; update data)
export async function updateByIdAndUserId(id, userId, changes, trx = knex) {
  const [updated] = await trx("build_projects")
    .update(changes)
    .where({ id, user_id: userId })
    .returning("*");
  return updated;
}

// Delete project (delete data)
export async function deleteByIdAndUserId(id, userId, trx = knex) {
  const [updated] = await trx("build_projects")
    .delete()
    .where({ id, user_id: userId })
    .returning("*");
  return updated;
}
