import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { preview } from '../assets'
import { FormField, Loader } from '../components'
import { getRandomPrompt } from '../utils'


const CreatePost = () => {
  const navigate = useNavigate()
  
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  })

  const [generatingImg, setGeneratingImg] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = () => {

  }
  
  // makes sure we can type in our form fields
  // we take our event (key press event) and call the setForm state where we want to spread the entire form and we want to update e.target.name (meaning that specific property) with the newly created e.target.value (meaning the character we typed in)
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value})
  }
  
  //calls our utility function to ensure that we always get a new prompt
  // we get a random prompt via the getRandomPrompt function and we set the form.prompt to that random prompt. Form.prompt to ensure we don't render the same prompt again
  // once we do that, we call the setForm state and then update the prompt to be our random prompt
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt)
    setForm({ ...form, prompt: randomPrompt })
  }
  
  // calls our backend
  const generateImage = () => {
  
  }

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">
          Create
        </h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">
          Create imaginative and visually stunning images through DALL-E AI and share them with the community
        </p>
      </div>

      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField 
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            handleChange={handleChange}
          />

          <FormField 
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="A plush toy goat sitting on a couch holding a magnifying glass"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe //shows additional button
            handleSurpriseMe={handleSurpriseMe}
          />

          {/* AI Image Preview */}
          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {/* if there is a form photo, show it. If we don't, show preview image */}
            {form.photo ? (
              <img 
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img 
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}

            {/* Loader while image is being generated. If we are generating an Img, show loader. */}
            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>
        
        {/* Submit Button */}
        <div className="mt-5 flex gap-5">
          <button 
            type="button"
            onClick={generateImage}
            className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImg ? "Generating..." : "Generate"}
          </button>
        </div>

        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">
            Share images that you have created with other people in our community!
          </p>

          {/* Check if we are currently loading */}
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? "Sharing..." : "Share with our community"}
          </button>
        </div>
      </form>

    </section>
  )
}

export default CreatePost

// useNavigate allows us to go back to the home page once the post is created
// the generatingImg state is used while we are contacting the API and waiting for the image to be generated