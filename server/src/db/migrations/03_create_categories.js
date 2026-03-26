export function up(knex) {
  return knex.schema.createTable("categories", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table
      .uuid("project_id")
      .notNullable()
      .references("id")
      .inTable("build_projects")
      .onDelete("CASCADE");
    table.string("name").notNullable();
    table.text("description");

    table.timestamp("created_at").defaultTo(knex.fn.now());

    table.index("project_id");
  });
}

export function down(knex) {
  return knex.schema.dropTableIfExists("categories");
}
