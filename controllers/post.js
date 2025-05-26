import prisma from '../prisma/client.js';

// Write your solution here

import Repository from "../repositories/generic.js";

const postRepository = new Repository("Post");

const selectObject = {
  id: true,
  title: true,
  content: true,
  published: true,
  authorId: true
};

const createPost = async (req, res) => {
  try {
    await postRepository.create(req.body);
    const newPosts = await postRepository.findAll(selectObject);
    return res.status(201).json({
      message: "User successfully created",
      data: newPosts,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getPosts = async (req, res) => {
  try {
    const users = await postRepository.findAll(selectObject);
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

const getPost = async (req, res) => {
  try {
    const post = await postRepository.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        message: `No post with the id: ${req.params.id} found`,
      });
    }
    return res.status(200).json({
      data: post,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const updatePost = async (req, res) => {
  try {
    let post = await postRepository.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        message: `No post with the id: ${req.params.id} found`,
      });
    }
    post = await postRepository.update(req.params.id, req.body);
    return res.status(200).json({
      message: `Post with the id: ${req.params.id} successfully updated`,
      data: post,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await postRepository.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        message: `No post with the id: ${req.params.id} found`,
      });
    }
    await postRepository.delete(req.params.id);
    return res.json({
      message: `Post with the id: ${req.params.id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
};
