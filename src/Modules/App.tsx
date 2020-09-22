import React, { Suspense, useEffect } from 'react'
import { Provider } from 'react-redux'
import { store } from './../Store/store'
import PrivateLogin from '@HOC/PrivateLogin/PrivateLogin'
import { routerApp } from '@Router/router.app'
import { ShowRouter } from '@Router/showRouter'
import socketIOClient from 'socket.io-client'
import { ApolloProvider } from '@apollo/client'
import client from '@Apolo/index'

export const BASE_URL_SOCKET = 'http://localhost:3001'

const AppLogin = React.lazy(() => import('./AppLogin'))

interface Props {
  privateLogin?: boolean
}

const App: React.FC<Props> = ({ privateLogin }) => {
  return (
    <>
      {privateLogin ? (
        <Suspense fallback={<div></div>}>
          <ApolloProvider client={client}>
            <AppLogin />
          </ApolloProvider>
        </Suspense>
      ) : (
        ShowRouter(routerApp)
      )}
    </>
  )
}

export default PrivateLogin(App)
