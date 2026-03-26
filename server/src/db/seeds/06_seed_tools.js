// Tools - Creates sample tools for projects (depends on build_projects)

export async function seed(knex) {
  await knex("tools").del();

  const projects = await knex("build_projects");

  if (projects.length === 0) {
    throw new Error("No projects found. Run build_projects seed first.");
  }

  const project1 = projects[0]; // Kobe's Sprinter Van Conversion

  const tools = await knex("tools")
    .insert([
      {
        project_id: project1.id,
        name: "Impact Driver",
        brand: "DeWalt",
        model: "DCF850",
        category: "Power Tool",
        owned: true,
        purchase_date: new Date("2025-11-23"),
        purchase_cost: 169.32,
      },
      {
        project_id: project1.id,
        name: "Jigsaw",
        brand: "DeWalt",
        model: "DCS334B",
        category: "Power Tool",
        owned: true,
        purchase_date: new Date("2025-11-23"),
        purchase_cost: 108.59,
      },
      {
        project_id: project1.id,
        name: "Circular Saw",
        brand: "Dewalt",
        model: "DCS565",
        category: "Power Tool",
        owned: true,
        purchase_date: new Date("2025-11-23"),
        purchase_cost: 129.68,
      },
      {
        project_id: project1.id,
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
