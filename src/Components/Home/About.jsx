import React from 'react'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className='flex flex-col justify-around items-center p-4 min-h-screen bg-gradient-to-b to-teal-300 from-indigo-500'>
        <div className='border-blue-600 border-4 inline-block rounded-full p-4'>
          <img src="Images/hello.gif" alt="" className='w-40 h-40 rounded-full' />
        </div>
        <div className='text-center'>
          <header className='font-bold text-3xl'>About Us</header>
          <main className='my-20 first-letter:text-5xl text-2xl'><span className="font-mono text-3xl">Hello</span> a text based chatting app. Implementing latest technologies. Connect you with our world. <br /><span className='my-8 block'>Have fun!</span></main>
          <footer>
            <Link to="/home" className='bg-blue-400 p-4 text-white rounded-lg hover:bg-white hover:text-black hover:border-blue-700 hover:border-4 cursor-pointer '>
              Contact Us
            </Link>
          </footer>
        </div>
    </div>
  )
}

export default About