import prisma from '../prisma/client.js';

// Write your solution here

import Repository from "../repositories/generic.js";

const userRepository = new Repository("User");

const selectObject = {
  id: true,
  firstName: true,
  lastName: true,
  email: true
};

const createUser = async (req, res) => {
  try {
    await userRepository.create(req.body);
    const newUsers = await userRepository.findAll(selectObject);
    return res.status(201).json({
      message: "User successfully created",
      data: newUsers,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await userRepository.findAll(selectObject);
    if (!users) {
      return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json({
      data: users,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await userRepository.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: `No user with the id: ${req.params.id} found`,
      });
    }
    return res.status(200).json({
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    let user = await userRepository.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: `No user with the id: ${req.params.id} found`,
      });
    }
    user = await userRepository.update(req.params.id, req.body);
    return res.status(200).json({
      message: `User with the id: ${req.params.id} successfully updated`,
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await userRepository.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: `No user with the id: ${req.params.id} found`,
      });
    }
    await userRepository.delete(req.params.id);
    return res.json({
      message: `User with the id: ${req.params.id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};