// Build Projects - Creates sample projects for users (depends on users)

export async function seed(knex) {
  await knex("build_projects").del();

  const users = await knex("users").select("id", "email");

  if (users.length === 0) {
    throw new Error("No users found.");
  }

  const kobe =
    users.find((user) => user.email === "kobe@example.com") || users[0];
  const kaitlyn =
    users.find((user) => user.email === "kaitlyn@example.com") || users[1];

  const projects = await knex("build_projects")
    .insert([
      {
        user_id: kobe.id,
        name: "Sprinter Van Conversion",
        description: `Upfitting a 2024 Mercedes Sprinter 4x4 for full-time van life`,
      },
      {
        user_id: kaitlyn.id,
        name: "Tiny Home Build",
        description: `Building a 300 sq ft tiny home on a trailer`,
      },
    ])
    .returning("*");

  console.log(`✅ Seeded ${projects.length} build projects`);
}
