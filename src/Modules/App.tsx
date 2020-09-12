import React, { Suspense, useEffect } from 'react'
import { Provider } from 'react-redux'
import { store } from './../Store/store'
import PrivateLogin from '@HOC/PrivateLogin/PrivateLogin'
import { routerApp } from '@Router/router.app'
import { ShowRouter } from '@Router/showRouter'
import socketIOClient from 'socket.io-client'
export const BASE_URL_SOCKET = 'http://localhost:3001'

const AppLogin = React.lazy(() => import('./AppLogin'))

interface Props {
  privateLogin?: boolean
}

const App: React.FC<Props> = ({ privateLogin }) => {
  // useEffect(() => {
  //   const socket = socketIOClient(BASE_URL_SOCKET)
  //   console.log(socket)

  //   socket.on('connect', () => {
  //     socket.emit('new user', '1234', '123123')
  //   })
  //   socket.on('disconnect', () => {
  //     console.log('dis-connect')
  //   })
  // }, [])
  return (
    <>
      {privateLogin ? (
        <Suspense fallback={<div></div>}>
          <AppLogin />
        </Suspense>
      ) : (
        ShowRouter(routerApp)
      )}
    </>
  )
}

export default PrivateLogin(App)
