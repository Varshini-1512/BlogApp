import React, { useEffect } from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router'
import RootLayout from './components/RootLayout'
import Register from './components/Register'
import Home from './components/Home'
import Login from './components/Login'
import UserDashboard from'./components/UserDashboard'
import AdminDashboard from './components/AdminDashboard'
import AuthorDashboard from './components/AuthorDashboard'
import {Toaster} from 'react-hot-toast'
import ProtectedRoute from './components/ProtectedRoute'
import AddArticle from './components/AddArticle'
import Unauthorized from './components/Unauthorized'
import ErrorBoundary from './components/ErrorBoundary'
import AuthorArticles from './components/AuthorArticles'
import ArticleByID from './components/ArticleByID'
import EditArticle from './components/EditArticleForm'
import ChangePassword from './components/ChangePassword'
import { useAuth } from "./store/authStore";


function App() {
  const routerObj=createBrowserRouter([
    {
      path:"/",
      element:<RootLayout/>,
      errorElement:<ErrorBoundary/>,
      children:[
        {
          path:"",
          element:<Home/>
        },
        {
          path:"register",
          element:<Register/>
        },
        {
          path:"login",
          element:<Login/>
        },
        {
          path:"user-dashboard",
          element:
          <ProtectedRoute>
          <UserDashboard/>
          </ProtectedRoute>
        },
        {
          path:"admin-dashboard",
          element:<AdminDashboard/>
        },
        {
          path:"author-dashboard",
          element:
          <ProtectedRoute>
          <AuthorDashboard/>
          </ProtectedRoute>,
          children:[
            {
              index: true,
              element: <AuthorArticles />,
            },
            {
              path: "articles",
              element: <AuthorArticles />,
            },
            {
              path:"add-article",
              element:<AddArticle/>
            }
          ]
        },
        {
          path: "article/:id",
          element: <ArticleByID />,
        },
        {
          path:"edit-article",
          element:<EditArticle />
        },
        {
          path:"unauthorized",
          element:<Unauthorized/>
        },
        {
          path:"change-password",
          element:<ChangePassword/>
        }
      ]
    }
  ])
  const checkAuth = useAuth((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <>
        <Toaster position='top-center' reverseOrder={false}/>
        <RouterProvider router={routerObj}/>
    </>
  )
}

export default App



