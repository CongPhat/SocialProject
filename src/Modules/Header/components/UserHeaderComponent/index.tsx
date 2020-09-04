import React, { useState, Suspense, useCallback } from 'react'
import styles from './style.module.scss'
import { IUserHeaderComponent } from './UserHeaderComponent.Interface'
import useMemoSelector from '@Common/useMemoSelector'
import { Dropdown, Menu } from 'antd'
import { useDispatch } from 'react-redux'
import { logout } from '@Store/Reducer/Login/Login.Action'
const { UserHeader, UserHeaderImage } = styles
interface Iprops {}
const DropdownUserComponent = React.lazy(() => import('../DropdownUser'))
const UserHeaderComponent = (props: Iprops) => {
  const { dataUser } = useMemoSelector('LoginReducer', ['dataUser'])
  const [showDropDown, setShowDropDown] = useState<boolean>(false)
  const dispatch = useDispatch()
  const handleClickItem = useCallback(() => {
    setShowDropDown(false)
  }, [dataUser])
  const handleLogOut = useCallback(() => {
    setShowDropDown(false)
    dispatch(logout())
  }, [dataUser])
  return (
    <div className={`${UserHeader} position-relative`}>
      <img
        src={dataUser.image}
        alt={dataUser.name}
        className={`${UserHeaderImage}`}
        onClick={() => setShowDropDown(!showDropDown)}
      />
      {showDropDown && (
        <Suspense fallback={<div></div>}>
          <DropdownUserComponent
            dataUser={dataUser}
            actionClick={handleClickItem}
            logOut={handleLogOut}
          />
        </Suspense>
      )}
    </div>
  )
}

export default UserHeaderComponent
