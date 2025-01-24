import express from "express";
import {
  createPost,
  getPosts,
  deletePost,
  updatePost,
} from "../controllers/postControllers.js";
const postRouter = express.Router();

postRouter
  .route("/")
  .get(getPosts)
  .post(createPost)
  .delete(deletePost)
  .put(updatePost);

export default postRouter;
