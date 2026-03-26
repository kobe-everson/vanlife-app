export async function up(knex) {
  await knex.raw(
    `CREATE TYPE task_status AS ENUM ('pending', 'in_progress', 'completed', 'blocked')`,
  );
  return knex.schema.createTable("tasks", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table
      .uuid("project_id")
      .notNullable()
      .references("id")
      .inTable("build_projects")
      .onDelete("CASCADE");
    table
      .uuid("category_id")
      .notNullable()
      .references("id")
      .inTable("categories")
      .onDelete("CASCADE");
    table.string("name").notNullable();
    table.text("description");
    table
      .enum("status", ["pending", "in_progress", "completed", "blocked"])
      .notNullable()
      .defaultTo("pending");
    table
      .integer("order_index")
      .notNullable()
      .defaultTo(3)
      .checkBetween([1, 5]);

    table.timestamp("created_at").defaultTo(knex.fn.now());

    table.index("category_id");
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("tasks");
  await knex.raw(`DROP TYPE IF EXISTS task_status`);
}
