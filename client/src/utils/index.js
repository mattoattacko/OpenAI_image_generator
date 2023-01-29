// utility functions can be reused across our application

import FileSaver from 'file-saver'
import { surpriseMePrompts } from '../constants'

// the getRandomPrompt function takes in a prompt as an argument and gives us a random prompt the user can use to generate an AI image
//surpriseMePrompts.length will get us a random index from 1-49. Then we retrieve the prompt from the array
export function getRandomPrompt(prompt) {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length)
  const randomPrompt = surpriseMePrompts[randomIndex]

  //we need a check to make sure that we dont get the same prompt twice in a row
  if(randomPrompt === prompt) return getRandomPrompt(prompt)

  return randomPrompt
}

//using file saver library
export async function downloadImage(_id, photo) {
  FileSaver.saveAs(photo, `download-${_id}.jpg`)
}

