import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

//import our Post model
import Post from '../mongodb/models/post.js';

//make sure our environment variables are getting populated
dotenv.config();

//new instance of the router
const router = express.Router();

//our Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// GET all Posts //
// cant see our posts without a GET all posts route
router.route('/').get(async (req, res) => {
  try {
    const posts = await Post.find({}); //pass in an empty object as our first/only parameter

    res.status(200).json({ success: true, data: posts })
  } catch (error) {
    res.status(500).json({ success: false, message: error })
  }
})

// We need to store the images in Cloudinary in order to scale our application
// This is why before creating a new instance of a document ('newPost'), we are uploading the image to Cloudinary that stores it and gives us back a 'photoUrl'.
// based on that info, then we can create a new Post in the database by only sharing the URL of the image ('photoUrl.url').

// CREATE a Post (to submit a new post) //
router.route('/').post(async (req, res) => {
  try {
    // first get the data from the Frontend. 'req.body' is the data
    const { name, prompt, photo } = req.body;
    // we need to upload the photo (URL) to Cloudinary
    const photoUrl = await cloudinary.uploader.upload(photo); //returns a cloudinary optimized URL

    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url,
    }); //create a new post in our database

    res.status(201).json({ success: true, data: newPost }); //send the new post back to the frontend
  } catch (error) {
    res.status(500).json({ success: false, message: error })
  }
})


export default router;