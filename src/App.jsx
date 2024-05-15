import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Manager from './components/Manager'

function App() {

  return (
    <>
      <div className="absolute top-0 z-[-2] md:h-screen h-[100%] w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
        <Navbar />
        <Manager/>
        <Footer/>
      </div>
    </>
  )
}

export default App
