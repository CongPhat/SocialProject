import React, { useState, useEffect, Suspense, useRef, useCallback } from 'react'
import styles from './style.module.scss'
import SearchComponent from './components/Search'
import { useDispatch } from 'react-redux'
import { SearchData, NoSearch } from '@Store/Reducer/Header/Header.Action'
import useMemoSelector from '@Common/useMemoSelector'

const { header, headerMain } = styles
const DropdownComponent = React.lazy(() => import('./components/Dropdown'))

interface Props {}

const Header: React.FC<Props> = () => {
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
      <div className={`${headerMain} text-right`}>
        <SearchComponent actionSearch={handleSearch} actionNoSearch={handleNoSearch} />
        {search !== '' && (
          <Suspense fallback={<div></div>}>
            <DropdownComponent actionClick={handleClick} />
          </Suspense>
        )}
      </div>
    </div>
  )
}

export default Header
