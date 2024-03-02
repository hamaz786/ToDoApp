import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage from './component/TodoList'
import LoginPage from './component/LoginPage'
import SignInPage from './component/SignInPage'
import Error from './component/Error'

// Routing the react application.
const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
    errorElement: <Error />,
  },
  {
    path: '/signIn',
    element: <SignInPage />,
    errorElement: <Error />,
  },
  {
    path: '/home',
    element: <HomePage />,
    errorElement: <Error />,
  },
])

function App() {
  return (
    <div className="App">
      {/* Connecting router with app.jsx */}
      <RouterProvider router={router}></RouterProvider>
    </div>
  )
}

export default App
