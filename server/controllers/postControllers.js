//CreatePost controller function is used to create a new post in the database.
import postModel from "../models/postModel.js";
import { validateNewPost } from "../models/postModel.js";

/**
 * @description Create a new post
 * @route POST /api/posts
 * @method POST
 * @access public
 */
async function createPost(req, res) {
  //Vlidate data recived from the client
  const { error } = validateNewPost(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //Create new post
  const newPost = new postModel({
    title: req.body.title,
    content: req.body.content,
    time: new Date(),
    File: req.body.File,
  });

  try {
    await newPost.save();
    console.log("Data saved successfully");
  } catch (error) {
    console.log("Error saving data");
  }

  res.status(201).json(newPost);
}
/**
 * @description ge all posts
 * @route get /api/posts
 * @method get
 * @access public
 */
async function getPosts(req, res) {
  const posts = await postModel.find();
  res.send(posts);
}

/**
 * @description delete a post
 * @route delete /api/posts
 * @method delete
 * @access public
 */

async function deletePost(req, res) {
  const id = req.params.id;
  await postModel.findByIdAndRemove(id);
  res.send("Post deleted successfully");
}

/**
 * @description update a post
 * @route put /api/posts
 * @method put
 * @access public
 */

async function updatePost(req, res) {
  const id = req.params.id;
  const { error } = validateNewPost(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const post = await postModel.findById(id);
  post
    ? ((post.title = req.body.title),
      (post.content = req.body.content),
      (post.File = req.body.File),
      await post.save(),
      res.send("Post updated successfully"))
    : res.status(404).send("Post not found");
}

export { createPost, getPosts, deletePost, updatePost };
