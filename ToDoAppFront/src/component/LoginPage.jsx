import React, { useState } from 'react'

const LoginPage = () => {
  // Initial user state valur
  const [user, setUser] = useState({ email: '', password: '' })

  // change state value of user when user change the value of input
  const handleForm = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  // When username and password submitted by user handleSubmitData is called
  const handleSubmitData = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData(e.currentTarget)
      const newUser = Object.fromEntries(formData)

      // Send data to server for authentication
      await fetch('http://localhost:5000/login-user', {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: { 'Content-Type': 'application/json' },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 'ok') {
            window.localStorage.setItem('token', data.data)
            window.localStorage.setItem('loggedIn', true)

            window.location.href = './home'
          } else {
            alert(data.error)
          }
        })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="login-form">
      {/* // ---Login Page Started */}
      <h1>Welcome to TodoSter</h1>
      <h3>Organize your tasks effortlessly with our intuitive todoSter app</h3>
      <div className="container">
        <div className="main">
          <div className="content">
            <h2>Log In</h2>
            <form onSubmit={handleSubmitData} id="forms">
              <div>
                <label htmlFor="email">Username</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={handleForm}
                  placeholder="Enter your Email Id"
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
                  value={user.password}
                  onChange={handleForm}
                  placeholder="Password"
                  autoComplete="off"
                  required
                />
              </div>
              <div>
                <button className="btn" type="submit">
                  Log In
                </button>
              </div>
            </form>
            <p className="account">
              Don't have an account? <a href="/signIn">SignIn</a>
            </p>
          </div>
        </div>
      </div>
      {/* //Login Page Ended */}
    </div>
  )
}

export default LoginPage
