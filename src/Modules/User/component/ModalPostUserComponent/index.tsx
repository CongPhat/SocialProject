import React, { useCallback, Suspense } from 'react'
import styles from './style.module.scss'
import { IModalPostUserComponent } from './ModalPostUserComponent.Interface'
import useMemoSelector from '@Common/useMemoSelector'
import { Modal, Button } from 'antd'
const { StyleModalPostUserComponent } = styles
const ItemPostUserComponent = React.lazy(() => import('./../ItemPostUserComponent'))
interface Iprops {
  closeModal: () => void
}

const ModalPostUserComponent = (props: Iprops) => {
  const {
    postUser: { showModal },
  } = useMemoSelector('user', ['postUser'])
  const handleCancelModal = useCallback(() => {
    props.closeModal()
  }, [])

  return (
    <div className={`${StyleModalPostUserComponent}`}>
      <Modal
        title=""
        visible={showModal}
        // onOk={this.handleOk}
        onCancel={handleCancelModal}
        footer={null}
        className="modal-post-user"
      >
        {showModal && (
          <Suspense fallback={<div></div>}>
            <ItemPostUserComponent />
          </Suspense>
        )}
      </Modal>
    </div>
  )
}

export default React.memo(ModalPostUserComponent)
