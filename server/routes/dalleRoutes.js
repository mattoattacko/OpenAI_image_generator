import express from 'express';
import * as dotenv from 'dotenv'; 
import { Configuration, OpenAIApi } from 'openai'; //this is the OpenAI API

//make sure our environment variables are getting populated
dotenv.config();

//new instance of the router
const router = express.Router();

//add our API key to the configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

//create instance of OpenAI API
const openai = new OpenAIApi(configuration);

//test our route with a demo route
router.route('/').get((req, res) => {
  res.send('Hello from OpenAI!');
})

//real route
//makes a call to OpenAI API and based on prompt, returns a response
//takes a while so must be async
//prompt will come from our FE
router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    //generate image. This is the OpenAI API call. Our object takes in a few options
    const aiResponse = await openai.createImage({
      prompt,
      n: 2,
      size: '1024x1024',
      response_format: 'b64_json',
    })

    //now we have our AI response, we need to get the image out of it
    const image = aiResponse?.data?.data[0].b64_json;

    //send our image to the FE
    res.status(200).json({ photo: image });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error?.response?.data?.error?.message || 'Something went wrong!'); 
  }
});

//export our router
export default router;
