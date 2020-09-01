import React, { useRef, useEffect, useCallback } from 'react'
import styles from './style.module.scss'
import useMemoSelector from '@Common/useMemoSelector'
import SkeletonImageComponent from '@Common/SkeletonImageComponent'
import { Skeleton, Collapse } from 'antd'
import AddCommentComponent from '../AddCommentComponent'
import { useDispatch } from 'react-redux'
import { commentReply } from '@Store/Reducer/User/User.Action'
import ItemCommentComponent from '../ItemCommentComponent'
const {
  Item,
  ItemImage,
  ItemContent,
  ItemContentHeader,
  ItemContentMain,
  ItemContentComment,
  ItemsComment,
  ItemContentBottom,
  ItemsAddComment,
} = styles

interface Iprops {}

const ItemPostUserComponent = (props: Iprops) => {
  const refElementContent = useRef(null)
  const dispatch = useDispatch()
  const {
    postUser: { postUser },
  } = useMemoSelector('user', ['postUser'])

  useEffect(() => {
    refElementContent.current.scrollIntoView({ block: 'end' })
  }, [postUser])

  const handleReplyComment = useCallback(
    (itemComment: any) => {
      dispatch(commentReply(itemComment))
    },
    [postUser],
  )

  return (
    <>
      <div className={`${Item} d-flex`}>
        <div className={`${ItemImage}`}>
          {postUser ? <img src={postUser.image} alt="" /> : <SkeletonImageComponent />}
        </div>
        <div className={`${ItemContent}`}>
          <div className={`${ItemContentHeader}`}>
            {postUser ? (
              <>
                <img src={postUser && postUser.user.image} alt={postUser.user.name} />
                <h6>{postUser && postUser.user.name}</h6>
              </>
            ) : (
              <Skeleton avatar paragraph={{ rows: 0 }} title={{ width: '87%' }} />
            )}
          </div>
          <div className={`${ItemContentMain}`}>
            <div className={`${ItemContentComment}`}>
              {postUser && (
                <>
                  <div className={`${ItemsComment}`}>
                    <img src={postUser && postUser.user.image} alt={postUser.user.name} />
                    <div>
                      <strong>{postUser && postUser.user.name}</strong>
                      <span>{postUser.content}</span>
                    </div>
                  </div>
                  {postUser.comments.map((itemComment: any, index: string) => (
                    <ItemCommentComponent
                      itemComment={itemComment}
                      key={index}
                      onReply={handleReplyComment}
                    />
                  ))}
                </>
              )}
            </div>
            <div ref={refElementContent} />
          </div>
          <div className={`${ItemContentBottom}`}>{postUser && <AddCommentComponent />}</div>
        </div>
      </div>
    </>
  )
}

export default React.memo(ItemPostUserComponent)
