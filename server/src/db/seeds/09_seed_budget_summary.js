// Budget Summary - creates budget summaries for projects (depends on build_projects)

export async function seed(knex) {
  await knex("budget_summary").del();

  const projects = await knex("build_projects");

  if (projects.length === 0) {
    throw new Error("No projects found. Run build_projects seed first.");
  }

  const budgets = await knex("budget_summary")
    .insert(
      projects.map((project) => ({
        project_id: project.id,
        total_estimated_cost:
          project.name === "Sprinter Van Conversion" ? 20000 : 45000.0,
        total_actual_cost:
          project.name === "Sprinter Van Conversion" ? 7000 : 150,
        notes:
          project.name === "Sprinter Van Conversion"
            ? "Van conversion on budget so far"
            : "Tiny home build - planning phase",
      })),
    )
    .returning("*");

  console.log(`✅ Seeded ${budgets.length} budget summaries`);
}
