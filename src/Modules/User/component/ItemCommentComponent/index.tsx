import React from 'react'
import styles from './style.module.scss'
import { IItemCommentComponent } from './ItemCommentComponent.Interface'
import { Collapse, Tooltip } from 'antd'
import { Link } from 'react-router-dom'
const dateFormat = require('dateformat')
const { ItemsComment, ItemsCommentChild, ItemsCommentAction, ItemsCommentChildActive } = styles
const { Panel } = Collapse
interface Iprops {
  itemComment: any
  onReply: (itemComment: any) => void
}
const differTimeToDays = (dateString: string) => {
  const d = Math.floor((new Date().getTime() - new Date(dateString).getTime()) / 1000 / (3600 * 24))
  if (d === 0) return ''
  return `${d}d`
}

const ItemCommentComponent = (props: Iprops) => {
  const { itemComment } = props
  return (
    <div className={`${ItemsComment} ${ItemsCommentChild}`}>
      <img src={itemComment.user.image} alt={itemComment.user.name} />
      <div>
        <div>
          <Link to={`/user/${itemComment.user._id}`}>{itemComment.user.name}</Link>
          <span>{itemComment.content}</span>
        </div>
        <div className={`${ItemsCommentAction}`}>
          {differTimeToDays(itemComment.date) !== '' && (
            <Tooltip placement="bottom" title={dateFormat(new Date(itemComment.date), 'fullDate')}>
              <span>{differTimeToDays(itemComment.date)}</span>
            </Tooltip>
          )}
          <strong onClick={() => props.onReply(itemComment)}>Trả lời</strong>
        </div>
        {itemComment.childs.length > 0 && (
          <Collapse className="view-comment-reply">
            <Panel header="View replies" key="1">
              {itemComment.childs.map((itemCommentChild: any, index: number) => (
                <div
                  className={`${ItemsComment} ${ItemsCommentChild} ${ItemsCommentChildActive}`}
                  key={index}
                >
                  <img src={itemCommentChild.user.image} alt={itemCommentChild.user.name} />
                  <div>
                    <div>
                      <Link to={`/user/${itemCommentChild.user._id}`}>
                        {itemCommentChild.user.name}
                      </Link>
                      <span>{itemCommentChild.content}</span>
                    </div>
                    <div className={`${ItemsCommentAction}`}>
                      {differTimeToDays(itemCommentChild.date) !== '' && (
                        <Tooltip
                          placement="bottom"
                          title={dateFormat(new Date(itemCommentChild.date), 'fullDate')}
                        >
                          <span>{differTimeToDays(itemCommentChild.date)}</span>
                        </Tooltip>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </Panel>
          </Collapse>
        )}
      </div>
    </div>
  )
}

export default React.memo(ItemCommentComponent)
