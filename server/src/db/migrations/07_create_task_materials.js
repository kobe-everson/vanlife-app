export function up(knex) {
  return knex.schema.createTable("task_materials", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table
      .uuid("task_id")
      .notNullable()
      .references("id")
      .inTable("tasks")
      .onDelete("CASCADE");
    table
      .uuid("material_id")
      .notNullable()
      .references("id")
      .inTable("materials")
      .onDelete("CASCADE");

    table.decimal("quantity", 10, 2).notNullable().defaultTo(1);
    table.decimal("cost_per_unit", 10, 2).notNullable().defaultTo(0);

    table.timestamp("created_at").defaultTo(knex.fn.now());

    table.index("task_id");
    table.index("material_id");
    table.index(["task_id", "material_id"]);
  });
}

export function down(knex) {
  return knex.schema.dropTableIfExists("task_materials");
}
