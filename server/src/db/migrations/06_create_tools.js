export function up(knex) {
  return knex.schema.createTable("tools", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table
      .uuid("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.string("name").notNullable();
    table.string("brand");
    table.string("model");
    table.string("category");

    table.boolean("owned").notNullable().defaultTo(false);
    table.date("purchase_date");
    table.decimal("purchase_cost", 10, 2);

    table.timestamp("created_at").defaultTo(knex.fn.now());

    table.index("user_id");
    table.index("name");
  });
}

export function down(knex) {
  return knex.schema.dropTableIfExists("tools");
}
