import * as Users from "../models/users.model.js";

export async function getAllUsers(req, res, next) {
  try {
    const users = await Users.findAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
}

export async function getUserById(req, res, next) {
  try {
    const user = await Users.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
}
