import React, { Suspense } from 'react'
import styles from './style.module.scss'
import { Modal, Button } from 'antd'
import useMemoSelector from '@Common/useMemoSelector'
const { modal } = styles
const CreatePost = React.lazy(() => import('./../CreatePost'))
interface Iprops {
  closeModal: () => void
}

const ModalCreatePost = (props: Iprops) => {
  const { showModalCreatePost } = useMemoSelector('HomeReducer', ['showModalCreatePost'])
  return (
    <Modal
      title="Tạo bài viết"
      visible={showModalCreatePost}
      onCancel={() => props.closeModal()}
      className={`${modal}`}
      footer={null}
    >
      {showModalCreatePost && (
        <Suspense fallback={<div></div>}>
          <CreatePost />
        </Suspense>
      )}
    </Modal>
  )
}

export default ModalCreatePost
