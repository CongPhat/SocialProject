import React, { useState, useEffect, Suspense, useRef, useCallback } from 'react'
import styles from './style.module.scss'
import SearchComponent from './components/Search'
import { useDispatch } from 'react-redux'
import { SearchData, NoSearch } from '@Store/Reducer/Header/Header.Action'
import useMemoSelector from '@Common/useMemoSelector'
import UserHeaderComponent from './components/UserHeaderComponent'
import { withRouter } from 'react-router-dom'

const { header, headerMain, headerImage } = styles
const DropdownComponent = React.lazy(() => import('./components/Dropdown'))

const logo = require('@assets/images/logo_drop.png').default

interface Props {
  history: any
}

const Header: React.FC<Props> = ({ history }) => {
  const { search } = useMemoSelector('HeaderReducer', ['search'])
  const dispatch = useDispatch()
  const handleSearch = useCallback(values => {
    dispatch(SearchData(values))
  }, [])
  const handleNoSearch = useCallback(() => {
    dispatch(NoSearch())
  }, [])
  const handleClick = useCallback(() => {
    dispatch(NoSearch())
  }, [])
  return (
    <div className={`${header} d-flex align-items-center`}>
      <div className={`${headerMain} text-right d-flex align-items-center justify-content-between`}>
        <div className={`${headerImage}`} onClick={() => history.push('/')}>
          <img src={logo} alt="Tiny" />
        </div>
        <div className="position-relative">
          <SearchComponent actionSearch={handleSearch} actionNoSearch={handleNoSearch} />
          {search !== '' && (
            <Suspense fallback={<div></div>}>
              <DropdownComponent actionClick={handleClick} />
            </Suspense>
          )}
        </div>
        <UserHeaderComponent />
      </div>
    </div>
  )
}

export default withRouter(Header)
