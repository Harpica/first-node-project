import mongoose, { Mongoose } from 'mongoose';

const Schema = mongoose.Schema; // define the structure of the docs we will store; function-constructor
const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// create model
export const Blog = mongoose.model('Blog', blogSchema); // will automatically look thought blogs collection in db
