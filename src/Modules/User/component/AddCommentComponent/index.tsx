import React, { useCallback, useState, useEffect, useRef } from 'react'
import styles from './style.module.scss'
import LoadingSearchComponent from '@Common/LoadingSearchComponent'
import { addComment, noCommentReply } from '@Store/Reducer/User/User.Action'
import { useDispatch } from 'react-redux'
import useMemoSelector from '@Common/useMemoSelector'
const { AddComment } = styles
interface Iprops {}

const AddCommentComponent = (props: Iprops) => {
  const refText = useRef(null)
  const { loadAddComment, commentReply } = useMemoSelector('user', [
    'loadAddComment',
    'commentReply',
  ])
  const dispatch = useDispatch()
  const [values, setValues] = useState<string>('')
  useEffect(() => {
    !loadAddComment && setValues('')
  }, [loadAddComment])
  const handleChangeComment = useCallback(e => {
    setValues(e.target.value)
    e.target.value === '' && dispatch(noCommentReply())
  }, [])
  const handleClickAddComment = useCallback(() => {
    dispatch(addComment(values))
  }, [values])
  useEffect(() => {
    if (commentReply) {
      setValues(`${`@${commentReply.user.name}`} `)
      refText.current.focus()
    }
  }, [commentReply])
  return (
    <div className={`${AddComment} d-flex align-items-center`}>
      <textarea
        name=""
        id=""
        placeholder="Nhập bình luận"
        onChange={handleChangeComment}
        value={values}
        ref={refText}
      ></textarea>
      <div className="d-flex justify-content-center">
        {loadAddComment ? (
          <LoadingSearchComponent />
        ) : (
          <button onClick={handleClickAddComment} disabled={values === ''}>
            Đăng
          </button>
        )}
      </div>
    </div>
  )
}

export default React.memo(AddCommentComponent)
