import React from 'react'
import Loadable from 'react-loadable'
import { LoadingPage } from '@Common/LoadingPage'

const Home = Loadable({
  loader: () => import('@Modules/Home'),
  loading: LoadingPage,
})
const ToDoList = Loadable({
  loader: () => import('@Modules/ToDoList'),
  loading: LoadingPage,
})
const User = Loadable({
  loader: () => import('@Modules/User'),
  loading: LoadingPage,
})
const Market = Loadable({
  loader: () => import('@Modules/Market/market'),
  loading: LoadingPage,
})

export const routerAppLogin: Object[] = [
  {
    path: '/',
    exact: true,
    main: ({ match, location, history }: any) => <Home />,
  },
  {
    path: '/todolist',
    exact: true,
    main: ({ match, location, history }: any) => <ToDoList />,
  },
  {
    path: '/user/:id',
    exact: true,
    main: ({ match, location, history }: any) => <User />,
  },
  {
    path: '/market',
    exact: true,
    main: ({ match, location, history }: any) => <Market />,
  },
  {
    path: '',
    exact: true,
    main: () => <div>404</div>,
  },
]
