import express from 'express';
import * as dotenv from 'dotenv'; //gives us access to our environment variables
import cors from 'cors'; //allows us to make requests from our frontend to our backend

import connectDB from './mongodb/connect.js';
import dalleRoutes from './routes/dalleRoutes.js';
import postRoutes from './routes/postRoutes.js';

dotenv.config(); //allows us to pull our environment variables from our .env file

//initialize express application 
const app = express();

//middleware
app.use(cors());
app.use(express.json( { limit: '50mb' } ));

//Creates API endpoints that we can connect to from our Frontend
app.use('/api/v1/dalle', dalleRoutes); 
app.use('/api/v1/post', postRoutes);

//routes
//root route
app.get('/', async (req, res) => {
  res.send('Hello from Dall-E!');
}); //this ensures that our server is running once we visit the URL of our server

//to run server
const startServer = async () => {
  //connect to DB
  try {
    connectDB(process.env.MONGODB_URL);
      app.listen(8080, () => console.log('Server has started on port http://localhost:8080'));
  } catch (error) {
    console.log(error);
  }
}

startServer();