import React from 'react'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className='p-4 min-h-screen bg-gradient-to-b from-blue-500 to-teal-500'>
        <div className='border-4 p-4 text-center flex flex-col items-center'>
          <img src="Images/avatar1.jpeg" alt="" className='w-20 h-20 rounded-full' />
          <header className='font-bold text-3xl'>About Us</header>
        </div>
        <div className='text-center'>
          
          <main className='my-20 first-letter:text-5xl'>
          
            <p>
            Welcome to our Chat App, your go-to platform for global chatting across the internet. Our app has been designed to provide a seamless experience for all your communication needs, whether it’s for personal or professional purposes.
            </p>

            <p>
            Our Chat App is not just another messaging platform, it's a community. We believe in fostering positive relationships and creating a space for people to connect and communicate with each other from all over the world. We strive to make our app a safe and welcoming space for everyone, no matter where they come from or what their background is.
            </p>

          </main>
          <footer>
            <Link to="/home" className='bg-blue-500 p-4 text-white rounded-lg hover:bg-blue-800 cursor-pointer '>
              Contact Us
            </Link>
          </footer>
        </div>
    </div>
  )
}

export default About