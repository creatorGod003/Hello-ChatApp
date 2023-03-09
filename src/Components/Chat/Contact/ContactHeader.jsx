import React, { useState } from 'react'

const ContactHeader = () => {

    const [showSearch, setShowSearch] = useState(true);
    function removeSearchIcon(){
        setShowSearch(false);
    }
    function addSearchIcon(){
        setShowSearch(true);
    }

  return (
    <div className="p-4 border-b-4 border-white">
        <header className="text-2xl text-white p-2 mb-4">Chats</header>
        <label htmlFor="" className="  relative">
          <input
            className="w-[80%] h-12 p-2 rounded-md placeholder:text-gray-600 bg-gray focus:outline-none border-b-4 border-b-purple-600"
            type="search"
            name=""
            id=""
            placeholder="Enter contact name"
            onFocus={removeSearchIcon}
            onBlur={addSearchIcon}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
                className={((showSearch)?"w-6 h-6 absolute right-0 top-0":"hidden")}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </label>
      </div>
  )
}

export default ContactHeader