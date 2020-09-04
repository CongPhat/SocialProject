import React, { useCallback } from 'react'
import styles from './style.module.scss'
import useMemoSelector from '@Common/useMemoSelector'
import { Link } from 'react-router-dom'

const { dropdown, dropdownAfter, dropdownBefore, dropdownItem } = styles

interface Props {
  actionClick?: () => void
  className?: string
}

const DropdownComponent: React.FC<Props> = props => {
  const { dataSearch } = useMemoSelector('HeaderReducer', ['dataSearch'])
  const handleClickRedirect = useCallback(() => {
    props.actionClick()
  }, [])
  return (
    <div className={`${dropdown} ${props.className}`}>
      <div className={`${dropdownAfter}`}></div>
      <ul>
        {dataSearch.map((item: any, index: number) => {
          return (
            <li key={index}>
              <Link
                to={`/user/${item._id}`}
                className={`${dropdownItem}`}
                onClick={handleClickRedirect}
              >
                <img src={item.image} alt={item.name} />
                <span>{item.name}</span>
              </Link>
            </li>
          )
        })}
      </ul>
      <div className={`${dropdownBefore}`}></div>
    </div>
  )
}

export default React.memo(DropdownComponent)
