import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

import authRouter from "./routes/auth.routes.js";
import usersRouter from "./routes/users.routes.js";
import projectsRouter from "./routes/projects.routes.js";
import tasksRouter from "./routes/tasks.routes.js";
import materialsRouter from "./routes/materials.routes.js";
import toolsRouter from "./routes/tools.routes.js";
import budgetRouter from "./routes/budget.routes.js";

const server = express();
const PORT = process.env.PORT || 4000;

server.use(cors({ origin: "http://localhost:5173", credentials: true }));
server.use(express.json());

// Auth router
server.use("/auth", authRouter);

// Users Router
server.use("/users", usersRouter);

// Projects Routers
server.use("/projects", projectsRouter);
server.use("/projects/:projectId/tasks", tasksRouter);
server.use("/projects/:projectId/materials", materialsRouter);
server.use("/projects/:projectId/tools", toolsRouter);
server.use("/projects/:projectId/budget", budgetRouter);

server.get("/", (req, res) => {
  res.send("API is running");
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

export default server;
