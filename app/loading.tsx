import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";


const loading:React.FC = () => {
  return (
    <div className='bg-color h-[100vh] w-[100vw] absolute top-0 grid place-items-center'>
        <ClipLoader color="#e94154" loading size={100}/>
    </div>
  )
}

export default loading
