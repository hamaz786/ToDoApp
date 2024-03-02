import React, { useState } from 'react'

const SignInPage = () => {
  // Initial state
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  })

  // Change State Value
  const handleSignInForm = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  //  When Data Submitted submitted data is called to submit data to server
  const submittedData = async (e) => {
    e.preventDefault()
    try {
      // To fetch all data from form
      const formData = new FormData(e.currentTarget)
      const newUser = Object.fromEntries(formData)

      //  send form data to server
      await fetch('http://localhost:5000/register', {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: { 'Content-Type': 'application/json' },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status == 'ok') {
            window.location.href = './home'
          }
        })
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="signIn-form">
      {/* SignIn Page Started */}
      <div className="container">
        <div className="main">
          <div className="content">
            <h2>Sign Up</h2>
            <h4>Its quick and easy.</h4>
            <form onSubmit={submittedData} id="forms">
              <div>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={userData.name}
                  onChange={handleSignInForm}
                  placeholder="Enter your name"
                  autoComplete="off"
                  required
                />
              </div>
              <div>
                <label htmlFor="email">Email Id</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userData.email}
                  onChange={handleSignInForm}
                  placeholder="Enter your email Id"
                  autoComplete="off"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone">Mobile Number</label>
                <input
                  type="number"
                  id="phone"
                  name="phone"
                  value={userData.phone}
                  onChange={handleSignInForm}
                  placeholder="Enter your Mobile Number"
                  autoComplete="off"
                  required
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={userData.password}
                  onChange={handleSignInForm}
                  placeholder="Password"
                  autoComplete="off"
                  required
                />
              </div>
              <div>
                <button className="btn" type="submit">
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Sign In Page Ended */}
    </div>
  )
}

export default SignInPage
