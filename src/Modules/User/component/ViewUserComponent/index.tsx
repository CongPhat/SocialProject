import React, { useCallback } from 'react'
import useMemoSelector from '@Common/useMemoSelector'
import styles from './style.module.scss'
import ButtonComponent from '@Common/ButtonComponent'
import { Modal, Button } from 'antd'

const {
  viewUser,
  viewUserImage,
  viewUserInfor,
  viewUserInforTop,
  viewUserInforCenter,
  viewUserInforBottom,
  viewUserInforCenterItem,
  viewUserModal,
  viewUserModalMain,
  viewUserModalButton,
  viewUserModalButtonConfig,
  viewUserModalButtonConfigRed,
} = styles

interface Props {
  addFriend: (id: string) => void
  closeFriend: (id: string) => void
  modalFriend: () => void
  addFriendSuccess: (id: string) => void
}

interface RootState {
  user: any
}

const ViewUserComponent: React.FC<Props> = props => {
  const { detailUser, loadingBtn, showModalFriend } = useMemoSelector('user', [
    'detailUser',
    'loadingBtn',
    'showModalFriend',
  ])
  const handleClickAddFriend = useCallback(() => {
    props.addFriend(detailUser._id)
  }, [detailUser])
  const handleClickAddFriendSuccess = useCallback(() => {
    props.addFriendSuccess(detailUser._id)
  }, [detailUser])
  const handleClickCloseFriend = useCallback(() => {
    props.closeFriend(detailUser._id)
  }, [detailUser])
  const handleClickModal = useCallback(() => {
    props.modalFriend()
  }, [detailUser])
  return (
    <>
      {detailUser && (
        <div className={`${viewUser}`}>
          <div className={`${viewUserImage}`}>
            <img src={detailUser.image} alt={detailUser.name} />
          </div>
          <div className={`${viewUserInfor}`}>
            <div className={`${viewUserInforTop} d-flex`}>
              <h6>{detailUser.name}</h6>
              {!detailUser.isFriend && (
                <ButtonComponent
                  text="Kết bạn"
                  typeColor="blue"
                  onClick={handleClickAddFriend}
                  loading={loadingBtn}
                />
              )}
              {detailUser.isFriend && detailUser.isFriend.status === 1 && (
                <ButtonComponent text="Bạn bè" onClick={handleClickModal} />
              )}
              {detailUser.isFriend && detailUser.isFriend.status === 0 && (
                <ButtonComponent
                  text="Chờ xác nhận"
                  onClick={handleClickModal}
                  // loading={loadingBtn}
                />
              )}
            </div>
            <div className={`${viewUserInforCenter}`}>
              <div className={`${viewUserInforCenterItem}`}>
                <strong>{detailUser.totalPost}</strong>
                <span>posts</span>
              </div>
              <div className={`${viewUserInforCenterItem}`}>
                <strong>{detailUser.totalFriend}</strong>
                <span>friends</span>
              </div>
            </div>
            <div className={`${viewUserInforBottom}`}>
              <span>{detailUser.description}</span>
            </div>
          </div>
          <Modal
            title=""
            visible={showModalFriend}
            onCancel={() => props.modalFriend()}
            footer={null}
            className={`${viewUserModal}`}
          >
            <div className={`${viewUserModalMain}`}>
              <img src={detailUser.image} alt={detailUser.name} />
              {detailUser.isFriend && detailUser.isFriend.status === 1 && (
                <h6>
                  Bạn và <strong>{detailUser.name}</strong> đang là bạn bè của nhau
                </h6>
              )}
              {detailUser.isFriend &&
                !detailUser.isFriend.isOwner &&
                detailUser.isFriend.status === 0 && (
                  <h6>
                    Yêu cầu kết bạn đang chờ <strong>{detailUser.name}</strong> xác nhận. Bạn có
                    muốn hủy yêu cầu ?
                  </h6>
                )}
              {detailUser.isFriend &&
                detailUser.isFriend.isOwner &&
                detailUser.isFriend.status === 0 && (
                  <h6>
                    <strong>{detailUser.name}</strong> đang gửi yêu cầu kết bạn. Bạn có đồng ý?
                  </h6>
                )}
              <div className={`${viewUserModalButton}`}>
                {detailUser.isFriend && detailUser.isFriend.status === 1 && (
                  <ButtonComponent
                    text="Hủy bạn bè"
                    onClick={handleClickCloseFriend}
                    loading={loadingBtn}
                    className={`${viewUserModalButtonConfig} ${viewUserModalButtonConfigRed}`}
                  />
                )}
                {detailUser.isFriend &&
                  !detailUser.isFriend.isOwner &&
                  detailUser.isFriend.status === 0 && (
                    <ButtonComponent
                      text="Hủy yêu cầu"
                      onClick={handleClickCloseFriend}
                      loading={loadingBtn}
                      className={`${viewUserModalButtonConfig} ${viewUserModalButtonConfigRed}`}
                    />
                  )}
                {detailUser.isFriend &&
                  detailUser.isFriend.isOwner &&
                  detailUser.isFriend.status === 0 && (
                    <ButtonComponent
                      text="Chấp nhận"
                      onClick={handleClickAddFriendSuccess}
                      loading={loadingBtn}
                      className={`${viewUserModalButtonConfig} ${viewUserModalButtonConfigRed}`}
                    />
                  )}
              </div>
              <div className={`${viewUserModalButton}`}>
                {detailUser.isFriend &&
                  (!detailUser.isFriend.isOwner || detailUser.isFriend.status === 1) && (
                    <ButtonComponent
                      text="Đóng"
                      onClick={() => props.modalFriend()}
                      className={`${viewUserModalButtonConfig}`}
                    />
                  )}
                {detailUser.isFriend &&
                  detailUser.isFriend.isOwner &&
                  detailUser.isFriend.status === 0 && (
                    <ButtonComponent
                      text="Hủy yêu cầu"
                      onClick={handleClickCloseFriend}
                      loading={loadingBtn}
                      className={`${viewUserModalButtonConfig}`}
                    />
                  )}
              </div>
            </div>
          </Modal>
        </div>
      )}
    </>
  )
}

export default React.memo(ViewUserComponent)
