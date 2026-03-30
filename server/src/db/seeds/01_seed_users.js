// Seed Users - creates user accounts with no dependencies

const defaultPassHash =
  "$2b$10$3BNQP5gjYKhXDVtJ.ir8Juzd4ccMcjhk8oTkqrmPv3R9VM4xottyi"; // password123

export async function seed(knex) {
  await knex("users").del();

  const users = await knex("users")
    .insert([
      {
        first_name: "Kobe",
        last_name: "Everson",
        email: "kobe@example.com",
        password_hash: defaultPassHash,
      },
      {
        first_name: "Kaitlyn",
        last_name: "Everson",
        email: "kaitlyn@example.com",
        password_hash: defaultPassHash,
      },
    ])
    .returning("*");

  console.log(`✅ Seeded ${users.length} users`);
}
