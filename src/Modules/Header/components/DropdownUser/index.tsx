import React, { useCallback } from 'react'
import styles from './style.module.scss'
import useMemoSelector from '@Common/useMemoSelector'
import { Link } from 'react-router-dom'

const { dropdown, dropdownAfter, dropdownBefore, dropdownItem } = styles

interface Props {
  actionClick?: () => void
  logOut: () => void
  className?: string
  dataUser?: any
}

const DropdownUserComponent: React.FC<Props> = props => {
  const handleClickRedirect = useCallback(() => {
    props.actionClick()
  }, [])
  const handleClickLogout = useCallback(() => {
    props.logOut()
  }, [])
  return (
    <div className={`${dropdown} ${props.className}`}>
      <div className={`${dropdownAfter}`}></div>
      <ul>
        <li>
          <Link
            to={`/user/${props.dataUser.id}`}
            className={`${dropdownItem} d-flex align-items-center`}
            onClick={handleClickRedirect}
          >
            <i className="fa fa-user" aria-hidden="true"></i>
            <span>Profile</span>
          </Link>
        </li>
        <li>
          <Link
            to={`/login`}
            className={`${dropdownItem} d-flex align-items-center`}
            onClick={handleClickLogout}
          >
            <i className="fa fa-sign-out" aria-hidden="true"></i>
            <span>Log out</span>
          </Link>
        </li>
      </ul>
      <div className={`${dropdownBefore}`}></div>
    </div>
  )
}

export default React.memo(DropdownUserComponent)
