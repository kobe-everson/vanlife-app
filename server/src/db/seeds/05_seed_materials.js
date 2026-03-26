// Materials - Creates sample materials for tasks (depends on tasks)

export async function seed(knex) {
  await knex("materials").del();

  const projects = await knex("build_projects");

  if (projects.length === 0) {
    throw new Error("No projects found.");
  }

  const project1 = projects[0];
  const project2 = projects[1];

  const tasks = await knex("tasks");

  if (tasks.length === 0) {
    throw new Error("No tasks found.");
  }

  const solarTask = tasks.find((t) => t.name === "Install solar panels");
  const batteryTask = tasks.find((t) => t.name === "Wire battery system");
  const subfloorTask = tasks.find((t) => t.name === "Install subfloor");
  const waterTask = tasks.find((t) => t.name === "Install fresh water tank");

  const materials = await knex("materials")
    .insert([
      {
        project_id: project1.id,
        task_id: solarTask.id,
        name: "200W Solar Panel",
        vendor: "Renogy",
        unit: "piece",
        cost_per_unit: 250,
      },
      {
        project_id: project1.id,
        task_id: solarTask.id,
        name: "Solar Mount Brackets",
        vendor: "Renogy",
        unit: "set",
        cost_per_unit: 80,
      },
      {
        project_id: project1.id,
        task_id: batteryTask.id,
        name: "200Ah LiFePO4 Battery",
        vendor: "Renogy",
        unit: "piece",
        cost_per_unit: 300,
      },
      {
        project_id: project1.id,
        task_id: subfloorTask.id,
        name: `3/4" Plywood`,
        vendor: "Home Depot",
        unit: "sq ft",
        cost_per_unit: 3.5,
      },
      {
        project_id: project1.id,
        task_id: subfloorTask.id,
        name: "Insulation",
        vendor: "Home Depot",
        unit: "roll",
        cost_per_unit: 150,
      },
      {
        project_id: project1.id,
        task_id: waterTask.id,
        name: "33 Gal Fresh Water Tank",
        vendor: "Vanlife Outfitters",
        unit: "piece",
        cost_per_unit: 299,
      },
    ])
    .returning("*");

  console.log(`✅ Seeded ${materials.length} materials`);
}
