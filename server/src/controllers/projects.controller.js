import knex from "../db/knex.js";
import * as Projects from "../models/projects.model.js";
import * as Categories from "../models/categories.model.js";
import * as Tasks from "../models/tasks.model.js";
import * as Budget from "../models/budget.model.js";

// Get all projects for a user
export async function getAllProjects(req, res, next) {
  try {
    const projects = await Projects.findAllByUserId(req.user.id);
    res.json(projects);
  } catch (err) {
    next(err);
  }
}

// Get project by ID for a user
export async function getProjectById(req, res, next) {
  try {
    const project = await Projects.findByIdAndUserId(
      req.params.id,
      req.user.id,
    );
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  } catch (err) {
    next(err);
  }
}

// Create project
export async function createProject(req, res, next) {
  const { name, description, startingBudget, categories = [] } = req.body;

  if (!name || startingBudget === undefined || startingBudget === null) {
    return res.status(400).json({
      message: "Project name and starting budget are required.",
    });
  }

  const budgetValue = Number(startingBudget);
  if (Number.isNaN(budgetValue) || budgetValue < 0) {
    return res.status(400).json({
      message: "Starting budget must be a valid, positive number.",
    });
  }

  try {
    const project = await knex.transaction(async (trx) => {
      const createdProject = await Projects.create(
        {
          user_id: req.user.id,
          name,
          description,
        },
        trx,
      );

      await Budget.create(
        {
          project_id: createdProject.id,
          total_estimated_cost: budgetValue,
          total_actual_cost: 0,
        },
        trx,
      );

      for (const category of categories) {
        if (!category.name) {
          continue;
        }

        const createdCategory = await Categories.create(
          {
            project_id: createdProject.id,
            name: category.name,
            description: category.description || null,
          },
          trx,
        );

        for (const task of category.tasks || []) {
          if (!task.name) {
            continue;
          }

          const createdTask = await Tasks.create(
            {
              project_id: createdProject.id,
              category_id: createdCategory.id,
              name: task.name,
              description: task.description || null,
              status: task.status || "pending",
              order_index: task.orderIndex || 3,
            },
            trx,
          );

          const toolLinks = (task.toolIds || []).map((toolId) => ({
            task_id: createdTask.id,
            tool_id: toolId,
          }));

          if (toolLinks.length > 0) {
            await trx("task_tools").insert(toolLinks);
          }
        }
      }

      return createdProject;
    });

    return res.status(201).json({ project });
  } catch (err) {
    next(err);
  }
}

// Update project
export async function updateProject(req, res, next) {
  const { name, description } = req.body;
  if (name !== undefined && typeof name === "string" && name.trim() === "") {
    return res.status(400).json({ message: "Project name cannot be empty." });
  }

  if (name === undefined && description === undefined) {
    return res.status(400).json({ message: "No updates captured." });
  }

  const changes = {};
  if (name !== undefined) {
    changes.name = name.trim();
  }
  if (description !== undefined) {
    changes.description = description;
  }

  try {
    const updatedProject = await Projects.updateByIdAndUserId(
      req.params.id,
      req.user.id,
      changes,
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found." });
    }

    res.json(updatedProject);
  } catch (err) {
    next(err);
  }
}

// Delete project
export async function deleteProject(req, res, next) {
  try {
    const deletedProject = await Projects.deleteByIdAndUserId(
      req.params.id,
      req.user.id,
    );

    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found." });
    }

    return res.status(204).end();
  } catch (err) {
    next(err);
  }
}
