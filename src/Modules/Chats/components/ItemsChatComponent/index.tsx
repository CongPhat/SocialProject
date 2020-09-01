import React from 'react'
import styles from './style.module.scss'
import { IItemsChatComponent } from './ItemsChatComponent.Interface'
import { divide } from 'lodash'
const {
  Item,
  ItemHeader,
  ItemHeaderUser,
  ItemContent,
  ItemContentRecord,
  ItemContentRecordGroup,
  ItemContentRecordReverd,
  ItemContentRecordImage,
} = styles
interface Iprops {
  itemChat: any
}

const ItemsChatComponent = (props: Iprops) => {
  const { itemChat } = props
  console.log(itemChat)

  return (
    <div className={`${Item}`}>
      <div className={`${ItemHeader}`}>
        <div className={`${ItemHeaderUser}`}>
          <img src={itemChat.image} alt={itemChat.name} />
          <h6>{itemChat.name}</h6>
        </div>
        <i className="fa fa-times" aria-hidden="true"></i>
      </div>
      <div className={`${ItemContent}`}>
        {itemChat.data.map((item: any, index: number) => {
          return (
            <div
              className={`${ItemContentRecord} ${item.isSend && ItemContentRecordReverd}`}
              key={index}
            >
              <div className={`${ItemContentRecordImage}`}>
                {!itemChat.data[index + 1] ? (
                  <img src={item.userSend.image} alt={item.userSend.name} />
                ) : (
                  item.userSend._id !== itemChat.data[index + 1].userSend._id && (
                    <img src={item.userSend.image} alt={item.userSend.name} />
                  )
                )}
              </div>
              <span>{item.content}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default React.memo(ItemsChatComponent)
