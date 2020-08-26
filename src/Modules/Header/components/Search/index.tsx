import React, { useCallback } from 'react'
import { Input } from 'antd'
import './style.scss'
import useMemoSelector from '@Common/useMemoSelector'
import LoadingSearchComponent from '@Common/LoadingSearchComponent'

const { Search } = Input

interface Props {
  actionSearch: (data: string) => void
  actionNoSearch: () => void
}

const SearchComponent: React.FC<Props> = props => {
  const { loadingSearch, search } = useMemoSelector('HeaderReducer', ['loadingSearch', 'search'])
  const handleChangeSearch = useCallback(e => {
    props.actionSearch(e.target.value)
  }, [])
  return (
    <div className="d-flex justify-content-end">
      <div className="search-wrapper">
        <Input
          className="search"
          placeholder="Search"
          onChange={handleChangeSearch}
          value={search}
        />
        {loadingSearch ? (
          <LoadingSearchComponent />
        ) : (
          <i className="fa fa-search" aria-hidden="true"></i>
        )}
      </div>
    </div>
  )
}

export default React.memo(SearchComponent)
