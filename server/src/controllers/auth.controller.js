import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as Users from "../models/users.model.js";
import "dotenv/config";

const JWT_SECRET = process.env.JWT_SECRET || "jwt_secret";
const JWT_EXPIRES_IN = "1d";

function signToken(user) {
  return jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

// Login
export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password required for login." });
    }

    const user = await Users.findByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "Invalid email." });
    }

    const passwordVerify = await bcrypt.compare(password, user.password_hash);
    if (!passwordVerify) {
      return res.status(400).json({ message: "Invalid password." });
    }

    const token = signToken(user);
    return res.json({
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    next(err);
  }
}

// Signup
export async function signup(req, res, next) {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({
        message: "Full name, email, and password are required to signup.",
      });
    }

    const existingUser = await Users.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use." });
    }

    const password_hash = await bcrypt.hash(password, 10);
    const newUser = await Users.create({
      first_name: firstName,
      last_name: lastName,
      email,
      password_hash,
    });
    const token = signToken(newUser);

    return res.status(200).json({
      user: {
        id: newUser.id,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
      },
      token,
    });
  } catch (err) {
    next(err);
  }
}

// Get profile
export async function getProfile(req, res, next) {
  try {
    const user = await Users.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.json({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    });
  } catch (err) {
    next(err);
  }
}
