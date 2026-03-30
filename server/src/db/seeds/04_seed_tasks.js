// Tasks - Creates sample tasks for categories (depends on project, categories)

export async function seed(knex) {
  await knex("tasks").del();

  const projects = await knex("build_projects");

  if (projects.length === 0) {
    throw new Error("No projects found.");
  }

  const project1 = projects[0];
  const project2 = projects[1];

  const categories = await knex("categories");

  if (categories.length === 0) {
    throw new Error("No categories found.");
  }

  const electricalCat = categories.find((c) => c.name === "Electrical");
  const interiorCat = categories.find((c) => c.name === "Interior");
  const plumbingCat = categories.find((c) => c.name === "Plumbing");
  const foundationCat = categories.find((c) => c.name === "Foundation");

  const tasks = await knex("tasks")
    .insert([
      {
        project_id: project1.id,
        category_id: electricalCat.id,
        name: "Install solar panels",
        description: "Mount three 200W solar panels on roof",
        status: "in_progress",
        order_index: 1,
      },
      {
        project_id: project1.id,
        category_id: electricalCat.id,
        name: "Wire battery system",
        description: "Connect eight 200Ah lithium batteries with BMS",
        status: "pending",
        order_index: 2,
      },
      {
        project_id: project1.id,
        category_id: interiorCat.id,
        name: "Install subfloor",
        description: "Lay floor framing with insulation and top floor panel",
        status: "pending",
        order_index: 1,
      },
      {
        project_id: project1.id,
        category_id: interiorCat.id,
        name: "Paint interior walls",
        description: "Paint all interior walls with water-resistant paint",
        status: "pending",
        order_index: 2,
      },
      {
        project_id: project1.id,
        category_id: plumbingCat.id,
        name: "Install fresh water tank",
        description: "Mount 33gal fresh water tank under bed on passenger side",
        status: "pending",
        order_index: 1,
      },
      {
        project_id: project2.id,
        category_id: foundationCat.id,
        name: "Dig foundation",
        description: "Mark 300 sq ft plot and dig foundation for concrete pour",
        status: "in_progress",
        order_index: 5,
      },
    ])
    .returning("*");

  console.log(`✅ Seeded ${tasks.length} tasks`);
}
