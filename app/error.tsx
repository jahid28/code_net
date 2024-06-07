"use client"
import React from 'react'
import Image from 'next/image'
const error:React.FC = () => {
  return (
    <div className='grid place-items-center '>
    <Image className='mt-10 mb-4' src='/404.png' width={300} height={300} alt='404' />
      <p className='text-2xl font-bold'>SOME ERROR OCCURED</p>
    </div>
  )
}

export default error
