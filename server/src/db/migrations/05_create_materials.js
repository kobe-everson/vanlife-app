export function up(knex) {
  return knex.schema.createTable("materials", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table
      .uuid("project_id")
      .notNullable()
      .references("id")
      .inTable("build_projects")
      .onDelete("CASCADE");
    table
      .uuid("task_id")
      .notNullable()
      .references("id")
      .inTable("tasks")
      .onDelete("CASCADE");
    table.string("name").notNullable();
    table.string("vendor");
    table.string("unit").notNullable();
    table.decimal("cost_per_unit", 10, 2).notNullable().defaultTo(0);

    table.timestamp("created_at").defaultTo(knex.fn.now());

    table.index("name");
    table.index("task_id");
  });
}

export function down(knex) {
  return knex.schema.dropTableIfExists("materials");
}
