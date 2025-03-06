import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from "./pages/Login.jsx"
import Signup from './pages/Signup.jsx'
import Home from "./pages/Home.jsx"
import AllPosts from "./pages/AllPosts.jsx"
import AddPost from "./pages/AddPost.jsx"
import EditPost from "./pages/EditPost.jsx"
import Post from "./pages/Post.jsx"
import {AuthLayout} from './components/index.js'

const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/",
        element:<Home />
      }, {
        path:"/signup",
        element:(
          <AuthLayout authentication = {false}>
            <Signup/>
          </AuthLayout>
        )
      }, {
        path:"/login",
        element:(
          <AuthLayout authentication = {false}>
            <Login/>
          </AuthLayout>
        )
      },
      {
        path:"/all-posts",
        element:(
          <AuthLayout authentication = {true}>
            <AllPosts/>
          </AuthLayout>
        )
      },{
        path:"/edit-post/:slug",
        element:(
          <AuthLayout authentication>
            <EditPost />
          </AuthLayout>
        )
      },{
        path:"/add-post",
        element:(
          <AuthLayout authentication>
          <AddPost />
          </AuthLayout>
        )
      },{
        path:"/post/:slug",
        element:(
          <AuthLayout authentication>
            <Post />
          </AuthLayout>
        )
      }

    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store} >
    <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
