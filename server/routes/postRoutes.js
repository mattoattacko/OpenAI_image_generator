import express from 'express';
import * as dotenv from 'dotenv'; 
import { v2 as cloudinary } from 'cloudinary';

//import our Post model
import Post from '../mongodb/models/post.js';

//make sure our environment variables are getting populated
dotenv.config();

//new instance of the router
const router = express.Router();

export default router;