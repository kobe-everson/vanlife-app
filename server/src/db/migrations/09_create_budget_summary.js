export function up(knex) {
  return knex.schema.createTable("budget_summary", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table
      .uuid("project_id")
      .notNullable()
      .references("id")
      .inTable("build_projects")
      .onDelete("CASCADE");

    table.decimal("total_estimated_cost", 12, 2).notNullable().defaultTo(0);
    table.decimal("total_actual_cost", 12, 2).notNullable().defaultTo(0);

    table.text("notes");

    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.timestamp("created_at").defaultTo(knex.fn.now());

    table.index("project_id");
  });
}

export function down(knex) {
  return knex.schema.dropTableIfExists("budget_summary");
}
