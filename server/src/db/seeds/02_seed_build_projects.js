// Build Projects - Creates sample projects for users (depends on users)

export async function seed(knex) {
  await knex("build_projects").del();

  // Get first user to associate projects with
  const user = await knex("users").first();

  if (!user) {
    throw new Error("No users found.");
  }

  const projects = await knex("build_projects")
    .insert([
      {
        user_id: user.id,
        name: "Sprinter Van Conversion",
        description: "Complete interior renovation of a Mercedes Sprinter van",
      },
      {
        user_id: user.id,
        name: "Tiny Home Build",
        description: "Building a 200 sq ft tiny home on a trailer",
      },
    ])
    .returning("*");

  console.log(`✅ Seeded ${projects.length} build projects`);
}
