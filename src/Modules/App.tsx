import React, { Suspense } from 'react'
import { Provider } from 'react-redux'
import { store } from './../Store/store'
import PrivateLogin from '@HOC/PrivateLogin/PrivateLogin'
import { routerApp } from '@Router/router.app'
import { ShowRouter } from '@Router/showRouter'

const AppLogin = React.lazy(() => import('./AppLogin'))

interface Props {
  privateLogin?: boolean
}

const App: React.FC<Props> = ({ privateLogin }) => {
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
