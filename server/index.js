import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

dotenv.config(); //allows us to pull our environment variables from our .env file

//initialize express application 
const app = express();

//middleware
app.use(cors());
app.use(express.json( { limit: '50mb' } ));

//routes
//root route
app.get('/', async (req, res) => {
  res.send('Hello from Dall-E!');
}); //this ensures that our server is running once we visit the URL of our server

//to run server
const startServer = async (req, res) => {
  app.listen(8080, () => console.log('Server has started on port http://localhost:8080'))
}

startServer();