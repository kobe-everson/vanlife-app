// Categories - Creates task categories for projects (depends on build_projects)

export async function seed(knex) {
  await knex("categories").del();

  const projects = await knex("build_projects");

  if (projects.length === 0) {
    throw new Error("No projects found.");
  }

  const project1 = projects[0];
  const project2 = projects[1];

  const categories = await knex("categories")
    .insert([
      {
        project_id: project1.id,
        name: "Electrical",
        description: "Wiring, solar panels, and power systems",
      },
      {
        project_id: project1.id,
        name: "Interior",
        description: "Flooring, walls, cabinets, and bed installation",
      },
      {
        project_id: project1.id,
        name: "Plumbing",
        description: "Water systems, tanks, and fixtures",
      },
      {
        project_id: project2.id,
        name: "Foundation",
        description: "Base and support structure",
      },
      {
        project_id: project2.id,
        name: "Framing",
        description: "Wall and roof framing",
      },
    ])
    .returning("*");

  console.log(`✅ Seeded ${categories.length} categories`);
}
