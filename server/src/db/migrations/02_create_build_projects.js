export function up(knex) {
  return knex.schema.createTable("build_projects", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table
      .uuid("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.string("name").notNullable();
    table.text("description");

    table.timestamp("created_at").defaultTo(knex.fn.now());

    table.index("user_id");
  });
}

export function down(knex) {
  return knex.schema.dropTableIfExists("build_projects");
}
