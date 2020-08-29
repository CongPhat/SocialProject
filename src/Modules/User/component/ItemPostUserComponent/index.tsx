import React, { useRef, useEffect, useCallback } from 'react'
import styles from './style.module.scss'
import { IItemPostUserComponent } from './ItemPostUserComponent.Interface'
import useMemoSelector from '@Common/useMemoSelector'
import SkeletonImageComponent from '@Common/SkeletonImageComponent'
import { Skeleton, Tooltip } from 'antd'
import AddCommentComponent from '../AddCommentComponent'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { commentReply } from '@Store/Reducer/User/User.Action'
const dateFormat = require('dateformat')
const {
  Item,
  ItemImage,
  ItemContent,
  ItemContentHeader,
  ItemContentMain,
  ItemContentComment,
  ItemsComment,
  ItemsCommentChild,
  ItemContentBottom,
  ItemsAddComment,
  ItemsCommentAction,
} = styles

interface Iprops {}

const differTimeToDays = (dateString: string) => {
  const d = Math.floor((new Date().getTime() - new Date(dateString).getTime()) / 1000 / (3600 * 24))
  if (d === 0) return ''
  return `${d}d`
}

const ItemPostUserComponent = (props: Iprops) => {
  const refElementContent = useRef(null)
  const dispatch = useDispatch()
  const {
    postUser: { postUser },
  } = useMemoSelector('user', ['postUser'])

  console.log(postUser)

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
                  {postUser.comments.map((itemComment: any, index: string) => {
                    return (
                      <div className={`${ItemsComment} ${ItemsCommentChild}`} key={index}>
                        <img src={itemComment.user.image} alt={itemComment.user.name} />
                        <div>
                          <div>
                            <Link to={`/user/${itemComment.user._id}`}>
                              {itemComment.user.name}
                            </Link>
                            <span>{itemComment.content}</span>
                          </div>
                          <div className={`${ItemsCommentAction}`}>
                            {differTimeToDays(itemComment.date) !== '' && (
                              <Tooltip
                                placement="bottom"
                                title={dateFormat(new Date(itemComment.date), 'fullDate')}
                              >
                                <span>{differTimeToDays(itemComment.date)}</span>
                              </Tooltip>
                            )}
                            <strong onClick={() => handleReplyComment(itemComment)}>Trả lời</strong>
                          </div>
                        </div>
                      </div>
                    )
                  })}
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
