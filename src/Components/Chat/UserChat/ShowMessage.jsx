import React from 'react'


// Responsible for showing messages

const ShowMessage = (props) => {

    const messageDate = props.message[0];
    const messageValue = props.message[1];

  return (
    <div>
        <div className='text-center'>
            <div className='text-center bg-gray-400 rounded p-1 inline-block my-4'>{messageDate}</div>
        </div>
        <div className='flex flex-col'>
            {messageValue.map((message, index) => 
                    <div key={index} className="w-fit p-2 bg-blue-300 border-black border-2 m-1 rounded-lg rounded-tl-none">{message}</div>
            )}
        </div>
    </div>
  )
}

export default ShowMessage