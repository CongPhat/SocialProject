import { ACTION_CHATS } from './Chats.Action'

const { ADD_USER_CHAT, SET_CONTENT_CHAT } = ACTION_CHATS

interface IInitState {
  showChats: boolean
  listChat: Array<any>
}

export const initStateChats: IInitState = {
  showChats: true,
  listChat: [],
}

export const ChatsRuducer = (state = initStateChats, action: any) => {
  switch (action.type) {
    case ADD_USER_CHAT:
      const dataFind = state.listChat.find(item => item._id === action.payload._id)
      if (dataFind) {
        return {
          ...state,
        }
      }
      return {
        ...state,
        listChat: [...state.listChat, { ...action.payload, data: [] }],
      }
    case SET_CONTENT_CHAT:
      return {
        ...state,
        listChat: state.listChat.map(item => {
          if (item._id === action.payload.idUser) {
            return {
              ...item,
              data: action.payload.data,
            }
          }
          return item
        }),
      }
    default:
      return state
  }
}
