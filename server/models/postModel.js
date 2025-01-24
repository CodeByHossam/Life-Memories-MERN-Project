import mongoose from "mongoose";
import Joi from "joi";
//validate by the schema .. Creating postSchema
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
  },
  content: {
    type: String,
    required: true,
    minlength: 3,
  },
  File: {
    type: String,
    required: false,
    minlength: 3,
  },
});
//New post validation by JOI
function validateNewPost(newPost) {
  const postSchema=Joi.object({ 
    title: Joi.string().min(3).required(),
    content: Joi.string().min(3).required(),
    File: Joi.string().min(3),

  });
  return postSchema.validate(newPost);
};

const postModel = mongoose.model("posts", postSchema);

export default postModel;
export {validateNewPost};
