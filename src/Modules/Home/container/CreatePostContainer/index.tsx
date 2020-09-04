import React, { useCallback } from 'react'
import styles from './style.module.scss'
import { ICreatePostContainer } from './CreatePostContainer.Interface'
import ModalCreatePost from '@Modules/Home/components/ModalCreatePost'
import ButtonCreatePost from '@Modules/Home/components/ButtonCreatePost'
import { useDispatch } from 'react-redux'
import { actionShowModal } from '@Store/Reducer/Home/Home.Action'
const { StyleCreatePostContainer } = styles
interface Iprops {}

const CreatePostContainer = (props: Iprops) => {
  const dispatch = useDispatch()
  const handleShowModal = useCallback(() => {
    dispatch(actionShowModal())
  }, [])
  const handleCloseModal = useCallback(() => {
    dispatch(actionShowModal())
  }, [])
  return (
    <div className={`${StyleCreatePostContainer}`}>
      <ButtonCreatePost showModalCreatePost={handleShowModal} />
      <ModalCreatePost closeModal={handleCloseModal} />
    </div>
  )
}

export default CreatePostContainer
