// import React, { useState, useEffect } from 'react'

// import { Loader, Card, FormField } from '../components'

// const RenderCards = ({ data, title }) => {
//   // check if we have data. If we do, render the images/cards (post = image) while passing all of the post data to each individual card. Else just return the title.
//   if (data?.length > 0) {
//     return (
//           data.map((post) => <Card key={post._id} {...post} />)
//     )
//   }

//   return (
//     <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">
//       {title}
//     </h2>
//   )
// }

// const Home = () => {
//   const [loading, setLoading] = useState(false)
//   const [allPosts, setAllPosts] = useState(null)

//   const [searchText, setSearchText] = useState('')
//   const [searchedResults, setSearchedResults] = useState(null)
//   const [searchTimeout, setSearchTimeout] = useState(null)

//   //make a call to get all the posts
//   useEffect(() => {
//     const fetchPosts = async () => {
//       setLoading(true)

//       try {
//         const response = await fetch('http://localhost:8080/api/v1/post', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         })

//         //check if response is ok
//         if (response.ok) {
//           const result = await response.json(); //get the result
//           setAllPosts(result.data.reverse()); //set the result to allPosts. Reverse the array so the latest post is first
//         }
//         setAllPosts(data)
//       } catch (error) {
//         alert(error.message)
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchPosts();
//   }, [])

//   const handleSearchChange = (e) => {
//     //clear the timeout
//     clearTimeout(searchTimeout)

//     setSearchText(e.target.value)

//     setSearchTimeout(
//       //debouce the search allowing us to avoid making repeated requests for every single letter typed.
//       setTimeout(() => {
//         const searchResults = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase())) //looks in the name and prompt of the post for the search text

//         setSearchedResults(searchResults)
//       }, 500),
//     )
//   }

//   return (
//     <section className="max-w-7xl mx-auto">
//       <div>
//         <h1 className="font-extrabold text-[#222328] text-[32px]">
//           Community Showcase
//         </h1>
//         <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">
//           Browse the latest visually stunning creations & collections from our imaginative community members
//         </p>
//       </div>

//       <div className="mt-16">
//         <FormField 
//           labelName="Search Posts"
//           type="text"
//           name="text"
//           placeholder="Search Posts"
//           value={searchText}
//           handleChange={handleSearchChange}
//         />
//       </div>

//       <div className="mt-10">
//         {/* check if we are loading. If so render a div with the loader component */}
//         {loading ? (
//           <div className="flex justify-center">
//             <Loader />
//           </div>
//         ) : (
//           <>
//             {/* check if we have a search term. If we do, render an h2 */}
//             {searchText && (
//               <h2 className="font-medium text-[#666e75] text-xl mb-3">
//                 Showing results for <span className="text-[#222328]">
//                   {searchText}
//                 </span>
//               </h2>
//             )}

//             {/* render images */}
//             <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
//               {/* check if search text exits */}
//               {/* if we are not searching for something just render all the posts */}
//               {searchText ? (
//                 <RenderCards
//                   data={searchedResults} //if there is a search text then render through searched results
//                   title="No search results found"
//                 />
//               ) : (
//                 <RenderCards
//                   data={allPosts}
//                   title="No posts found"
//                 />
//               )}
//             </div>
//           </>
//         )}
//       </div>
//     </section>
//   )
// }

// export default Home

import React, { useEffect, useState } from 'react';

import { Card, FormField, Loader } from '../components';

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return (
      data.map((post) => <Card key={post._id} {...post} />)
    );
  }

  return (
    <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
  );
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);

  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch('https://dall-e2.onrender.com/api/v1/post', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        setAllPosts(result.data.reverse());
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
        setSearchedResults(searchResult);
      }, 500),
    );
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">The Community Showcase</h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">Browse through a collection of imaginative and visually stunning images generated by DALL-E AI</p>
      </div>

      <div className="mt-16">
        <FormField
          labelName="Search posts"
          type="text"
          name="text"
          placeholder="Search something..."
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Showing Resuls for <span className="text-[#222328]">{searchText}</span>:
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title="No Search Results Found"
                />
              ) : (
                <RenderCards
                  data={allPosts}
                  title="No Posts Yet"
                />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;