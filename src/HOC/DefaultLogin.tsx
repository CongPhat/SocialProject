import React, { useState, useEffect } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import Header from '@Modules/Header'

function DefaultLogin(Component: React.ComponentType<any | string>) {
  return withRouter(({ history }: RouteComponentProps) => {
    return (
      <>
        <Header />
        <div className="pt-5" />
        <div className="pt-5">
          <Component />
        </div>
      </>
    )
  })
}

export default DefaultLogin
