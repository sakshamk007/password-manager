import React from 'react'

const Footer = () => {
    return (
        <div className='bg-green-800 w-full text-center text-md text-slate-900 flex justify-center items-center p-[2px] absolute bottom-0 font-medium gap-1'>
            <span className='text-white'>&lt;</span>Made with<lord-icon
                src="https://cdn.lordicon.com/ulnswmkk.json"
                trigger="hover"
                colors="primary:#e83a30"
                style={{"width":"25px", "height":"25px"}}>
            </lord-icon>by Saksham Kohli<span className='text-white'>/ &gt;</span> 
        </div>
    )
}

export default Footer
