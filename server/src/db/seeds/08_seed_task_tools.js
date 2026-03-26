// Task Tools (join table) - links tasks to tools (depends on tasks, tools)

export async function seed(knex) {
  await knex("task_tools").del();

  const tasks = await knex("tasks");
  const tools = await knex("tools");

  if (tasks.length === 0 || tools.length === 0) {
    throw new Error("No tasks or tools found.");
  }

  const solarTask = tasks.find((t) => t.name === "Install solar panels");
  const flooringTask = tasks.find((t) => t.name === "Install subfloor");

  const drill = tools.find((t) => t.name === "Impact Driver");
  const saw = tools.find((t) => t.name === "Circular Saw");

  // Insert task_tools relationships
  const taskTools = await knex("task_tools")
    .insert([
      {
        task_id: solarTask.id,
        tool_id: drill.id,
      },
      {
        task_id: flooringTask.id,
        tool_id: drill.id,
      },
      {
        task_id: flooringTask.id,
        tool_id: saw.id,
      },
    ])
    .returning("*");

  console.log(`✅ Seeded ${taskTools.length} task-tool relationships`);
}
