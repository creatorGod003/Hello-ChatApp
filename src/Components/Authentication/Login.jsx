import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <div className='min-h-screen bg-gradient-to-b to-teal-300 from-indigo-500 flex flex-col justify-center items-center'>
            <div className="flex flex-col w-[70%] sm:w-[40%] md:w-[30%] lg:w-[25%] mx-auto p-2">
                <Link 
                    className='bg-blue-700 text-white m-4 text-center p-2 shadow-2xl font-bold'
                    to={"/login-with-email"}
                >
                    Sign In with Email
                </Link>
                <Link
                    className='bg-blue-700 text-white m-4 text-center p-2 shadow-2xl font-bold'
                    to={"/login-with-phone"}
                >
                    Sign In with Phone
                </Link>
            </div>
        </div>
    )
}

export default Login