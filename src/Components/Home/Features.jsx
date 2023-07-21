import React from 'react'

const Features = () => {
  return (
    <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-wrap -m-4">
      <div className="p-4 md:w-1/3">
        <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
          <img
            className="lg:h-48 md:h-36 w-full object-cover object-center"
            src="Images/responsive.jpeg"
            alt="blog"
          />
          <div className="p-6">
        
            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
              Responsive Design
            </h1>
            <p className="leading-relaxed mb-3">
            Our chat app's responsive layout is designed to ensure a seamless and enjoyable user experience across various devices, screen sizes, and orientations
            </p>
            
          </div>
        </div>
      </div>
      <div className="p-4 md:w-1/3">
        <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
          <img
            className="lg:h-48 md:h-36 w-full object-cover object-center"
            src="Images/emoji.jpeg"
            alt="blog"
          />
          <div className="p-6">
            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
              Emoji Picker
            </h1>
            <p className="leading-relaxed mb-3">
            Our chat app's emoji picker is a fun and expressive feature designed to enhance communication and bring emotions to life in every conversation
            </p>
            
          </div>
        </div>
      </div>
      <div className="p-4 md:w-1/3">
        <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
          <img
            className="lg:h-48 md:h-36 w-full object-cover object-center"
            src="Images/userprofile.jpeg"
            alt=""
          />
          <div className="p-6">
            
            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
              User Profile Dashboard
            </h1>
            <p className="leading-relaxed mb-3">
              Our chat app's user profile dashboard is a powerful and personalized hub that allows users to manage their account settings, showcase their identity, and connect with others on a deeper level.
            </p>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  )
}

export default Features