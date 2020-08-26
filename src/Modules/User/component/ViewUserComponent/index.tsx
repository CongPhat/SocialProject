import React from 'react'
import useMemoSelector from '@Common/useMemoSelector'
import styles from './style.module.scss'

const {
  viewUser,
  viewUserImage,
  viewUserInfor,
  viewUserInforTop,
  viewUserInforCenter,
  viewUserInforBottom,
  viewUserInforCenterItem,
} = styles

interface Props {}

interface RootState {
  user: any
}

const ViewUserComponent: React.FC<Props> = ({}) => {
  const { detailUser } = useMemoSelector('user', ['detailUser'])
  return (
    <>
      {detailUser && (
        <div className={`${viewUser}`}>
          <div className={`${viewUserImage}`}>
            <img src={detailUser.image} alt={detailUser.name} />
          </div>
          <div className={`${viewUserInfor}`}>
            <div className={`${viewUserInforTop}`}>
              <h6>{detailUser.name}</h6>
            </div>
            <div className={`${viewUserInforCenter}`}>
              <div className={`${viewUserInforCenterItem}`}>
                <strong>{detailUser.totalPost}</strong>
                <span>posts</span>
              </div>
              <div className={`${viewUserInforCenterItem}`}>
                <strong>{detailUser.totalFriend}</strong>
                <span>posts</span>
              </div>
            </div>
            <div className={`${viewUserInforBottom}`}>
              <span>{detailUser.description}</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default React.memo(ViewUserComponent)
