import React, { useEffect, Suspense, useRef, useCallback } from 'react'
import styles from './style.module.scss'
import { IUserContainer } from './UserContainer.Interface'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  getListPostUser,
  getListPostUserInit,
  showModalPostUser,
  closeModalPostUser,
} from '@Store/Reducer/User/User.Action'
import useMemoSelector from '@Common/useMemoSelector'
import { debounce } from 'lodash'
import LoadingPostComponent from '@Common/LoadingPostComponent'
import ModalPostUserComponent from '@Modules/User/component/ModalPostUserComponent'
const { StyleUserContainer, StyleUserContainerLoading } = styles
const PostUserComponent = React.lazy(() => import('@Modules/User/component/PostUserComponent'))
interface Iprops {}

const UserContainer = (props: Iprops) => {
  const ref = useRef(null)
  const { listPostUser, statusLoadPost, loadingCallPost } = useMemoSelector('user', [
    'listPostUser',
    'statusLoadPost',
    'loadingCallPost',
  ])
  const { id } = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getListPostUserInit(id))
  }, [id])
  useEffect(() => {
    document.removeEventListener('scroll', ScrollPage)
    if (statusLoadPost) {
      document.addEventListener('scroll', ScrollPage)
    }
    return () => {
      document.removeEventListener('scroll', ScrollPage)
    }
  }, [listPostUser, statusLoadPost])

  const awaitLoadData = debounce(id => {
    dispatch(getListPostUser(id))
  }, 100)

  const ScrollPage = useCallback(() => {
    const offset = ref.current.getBoundingClientRect().height - window.pageYOffset
    if (offset > 500 && offset < 700) {
      awaitLoadData(id)
    }
  }, [])
  const handleShowModalUserPost = useCallback(
    idPost => {
      dispatch(showModalPostUser(idPost))
    },
    [listPostUser],
  )
  const handleCloseModal = useCallback(() => {
    dispatch(closeModalPostUser())
  }, [])
  return (
    <div className={`${StyleUserContainer}`} ref={ref}>
      {listPostUser.length > 0 && (
        <div className="row">
          {listPostUser.map((item: any, index: number) => {
            return (
              <div className="col-md-4" key={index}>
                <Suspense fallback={<div></div>}>
                  <PostUserComponent postItem={item} onModalUserPost={handleShowModalUserPost} />
                </Suspense>
              </div>
            )
          })}
        </div>
      )}
      <div
        className={`d-flex justify-content-center ${StyleUserContainerLoading} ${loadingCallPost &&
          'opacity-100'}`}
      >
        <LoadingPostComponent />
      </div>
      <ModalPostUserComponent closeModal={handleCloseModal} />
    </div>
  )
}

export default UserContainer
