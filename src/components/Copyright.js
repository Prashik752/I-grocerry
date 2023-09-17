import React from 'react'
import { Link } from 'react-router-dom'

const Copyright = () => {
  return (
    <div>
      <footer className="bg-light text-center text-lg-start mt-3">
      
      <div className="text-center text-dark p-3 bg-light">
        © 2020 Copyright : 
        <Link className="text-dark" href="/"> instagroccery.com</Link>
      </div>
   
      </footer>
    </div>
  )
}

export default Copyright