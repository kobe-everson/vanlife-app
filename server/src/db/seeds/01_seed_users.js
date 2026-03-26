// Seed Users - creates user accounts with no dependencies

const defaultPassHash =
  "$2b$10$h.9s7YvS9V9.t2v2fV9V9.u8z7x6c5v4b3n2m1l0k9j8i7h6g5f4e"; // password123

export async function seed(knex) {
  await knex("users").del();

  const users = await knex("users")
    .insert([
      {
        email: "kobe@example.com",
        password_hash: defaultPassHash,
      },
      {
        email: "kaitlyn@example.com",
        password_hash: defaultPassHash,
      },
    ])
    .returning("*");

  console.log(`✅ Seeded ${users.length} users`);
}
