// Tools - Creates sample tools for projects (depends on users)

export async function seed(knex) {
  await knex("tools").del();

  const users = await knex("users");

  if (users.length === 0) {
    throw new Error("No users found.");
  }

  const user1 = users[0]; // kobe@example.com

  const tools = await knex("tools")
    .insert([
      {
        user_id: user1.id,
        name: "Impact Driver",
        brand: "DeWalt",
        model: "DCF850",
        category: "Power Tool",
        owned: true,
        purchase_date: new Date("2025-11-23"),
        purchase_cost: 169.32,
      },
      {
        user_id: user1.id,
        name: "Jigsaw",
        brand: "DeWalt",
        model: "DCS334B",
        category: "Power Tool",
        owned: true,
        purchase_date: new Date("2025-11-23"),
        purchase_cost: 108.59,
      },
      {
        user_id: user1.id,
        name: "Circular Saw",
        brand: "Dewalt",
        model: "DCS565",
        category: "Power Tool",
        owned: true,
        purchase_date: new Date("2025-11-23"),
        purchase_cost: 129.68,
      },
      {
        user_id: user1.id,
        name: "Angle Grinder",
        brand: "DeWalt",
        model: "DCG405B",
        category: "Power Tool",
        owned: false,
        purchase_date: null,
        purchase_cost: null,
      },
    ])
    .returning("*");

  console.log(`✅ Seeded ${tools.length} tools`);
}
