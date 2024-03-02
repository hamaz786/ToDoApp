import React from 'react'
import img2 from '../images/todo-logo.jpg'

export default function Navbar() {
  return (
    <div>
      <nav className="navbar">
        <div className="logo">
          <img src={img2} alt="" />
          <span>TodoSter</span>
        </div>
        <ul className="nav-list">
          <li>Home</li>
          <li>Your Task</li>
        </ul>
      </nav>
    </div>
  )
}
