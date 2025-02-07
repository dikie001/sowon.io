import React from 'react'
import { Navbar } from './components/Navbar'
import Chatbot from './components/chatbot'

const App = () => {
  return (
    <><Navbar/>
    <Chatbot/>
      <h1 className='text-6xl text-orange-800 font-extrabold'>Dickens Omondi</h1>
    </>
  )
}
export default App