import mongoose from "mongoose";

const Post = new mongoose.Schema({
  name: { type: String, required: true },
  prompt: { type: String, required: true },
  photo: { type: String, required: true },
})

// model of the schema
const PostSchema = mongoose.model("Post", Post); //"Post" is the name of the model/schema. The second Post is the schema we just created.

export default PostSchema;