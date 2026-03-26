// Task Materials (join table) - links materials to tasks (depends on tasks, materials)

export async function seed(knex) {
  await knex("task_materials").del();

  const tasks = await knex("tasks");
  const materials = await knex("materials");

  if (tasks.length === 0 || materials.length === 0) {
    throw new Error("No tasks or materials found.");
  }

  const solarTask = tasks.find((t) => t.name === "Install solar panels");
  const batteryTask = tasks.find((t) => t.name === "Wire battery system");
  const subfloorTask = tasks.find((t) => t.name === "Install subfloor");
  const tankTask = tasks.find((t) => t.name === "Install fresh water tank");

  const solarPanel = materials.find((m) => m.name === "200W Solar Panel");
  const brackets = materials.find((m) => m.name === "Solar Mount Brackets");
  const battery = materials.find((m) => m.name === "200Ah LiFePO4 Battery");
  const floorWood = materials.find((m) => m.name === `3/4" Plywood`);
  const floorInsulation = materials.find((m) => m.name === "Insulation");
  const freshTank = materials.find((m) => m.name === "33 Gal Fresh Water Tank");

  // Insert task_materials relationships
  const taskMaterials = await knex("task_materials")
    .insert([
      {
        task_id: solarTask.id,
        material_id: solarPanel.id,
        quantity: 3,
        cost_per_unit: 250.0,
      },
      {
        task_id: solarTask.id,
        material_id: brackets.id,
        quantity: 1,
        cost_per_unit: 80.0,
      },
      {
        task_id: batteryTask.id,
        material_id: battery.id,
        quantity: 4,
        cost_per_unit: 300,
      },
      {
        task_id: subfloorTask.id,
        material_id: floorWood.id,
        quantity: 80,
        cost_per_unit: 3.5,
      },
      {
        task_id: subfloorTask.id,
        material_id: floorInsulation.id,
        quantity: 1,
        cost_per_unit: 150.0,
      },
      {
        task_id: tankTask.id,
        material_id: freshTank.id,
        quantity: 1,
        cost_per_unit: 299,
      },
    ])
    .returning("*");

  console.log(`✅ Seeded ${taskMaterials.length} task-material relationships`);
}
