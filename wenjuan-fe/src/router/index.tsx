import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import MainLayout from '../layouts/MainLayout'
import ManageLayout from '../layouts/ManageLayout'
import QuestionLayout from '../layouts/QuestionLayout'
import Home from '../pages/Home'
import Login from '../pages/Login'
import NotFoundPage from '../pages/NotFoundPage'
import Register from '../pages/Register'
import Edit from '../pages/question/Edit'
import Stat from '../pages/question/Stat'
import Trash from '../pages/manage/Trash'
import List from '../pages/manage/List'
import Star from '../pages/manage/Star'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'manage',
        element: <ManageLayout />,
        children: [
          {
            path: 'trash',
            element: <Trash />,
          },
          {
            path: 'list',
            element: <List />,
          },
          {
            path: 'star',
            element: <Star />,
          },
        ],
      },

      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: 'question',
    element: <QuestionLayout />,
    children: [
      {
        path: 'edit/:id',
        element: <Edit />,
      },
      {
        path: 'stat/:id',
        element: <Stat />,
      },
    ],
  },
])

export default router

// 常用的路由，常量
export const HOME_PATHNAME = '/'
export const LOGIN_PATHNAME = '/login'
export const REGISTER_PATHNAME = '/register'
export const MANAGE_INDEX_PATHNAME = '/manage/list'

export function isLoginOrRegister(pathname: string) {
  return [LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)
}

export function isNeedLogin(pathname: string) {
  return [HOME_PATHNAME, LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)
}
