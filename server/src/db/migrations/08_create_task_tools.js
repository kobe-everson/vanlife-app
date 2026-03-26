export function up(knex) {
  return knex.schema.createTable("task_tools", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table
      .uuid("task_id")
      .notNullable()
      .references("id")
      .inTable("tasks")
      .onDelete("CASCADE");
    table
      .uuid("tool_id")
      .notNullable()
      .references("id")
      .inTable("tools")
      .onDelete("CASCADE");

    table.timestamp("created_at").defaultTo(knex.fn.now());

    table.index("task_id");
    table.index("tool_id");
    table.index(["task_id", "tool_id"]);
  });
}

export function down(knex) {
  return knex.schema.dropTableIfExists("task_tools");
}
