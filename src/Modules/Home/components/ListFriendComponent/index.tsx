import React from 'react'
import styles from './style.module.scss'
import { IListFriendComponent } from './ListFriendComponent.Interface'
import { Tooltip } from 'antd'
import ButtonComponent from '@Common/ButtonComponent'
const { friend, friendItem, friendItemImage, friendTooltip, itemTooltip, button, wrapper } = styles
interface Iprops {
  dataFriend: {
    friendsOnline: Array<any>
  }
  showMessage: (item: any) => void
}

const ListFriendComponent = ({ dataFriend, showMessage }: Iprops) => {
  console.log(dataFriend)

  const ItemTooltip = ({ item }: any) => {
    return (
      <div>
        <div className={`${itemTooltip} d-flex`}>
          <img src={item.image} alt={item.name} className="bo-ra-50" />
          <div>
            <h6>{item.name}</h6>
            <span>{item.description}</span>
          </div>
        </div>
        <div className="mt-3">
          <ButtonComponent text="Nhắn tin" className={`${button}`} />
        </div>
      </div>
    )
  }

  const ItemFriend = (item: any, index: number) => {
    return (
      <li key={index} className={wrapper} onClick={() => showMessage(item)}>
        <Tooltip
          placement="right"
          title={<ItemTooltip item={item} />}
          overlayClassName={`tooltip-friend-online`}
        >
          <div className={`${friendItem}`}>
            <div className={`${friendItemImage}`}>
              <img src={item.image} alt="" />
            </div>
            <h6>{item.name}</h6>
          </div>
        </Tooltip>
      </li>
    )
  }
  return (
    <ul className={`${friend}`}>
      {dataFriend.friendsOnline.map((item: any, index: number) => ItemFriend(item, index))}
    </ul>
  )
}

export default React.memo(ListFriendComponent)
