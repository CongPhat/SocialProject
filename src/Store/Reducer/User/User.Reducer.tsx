import { ACTION_USER } from './User.Action'
import jwt from 'jsonwebtoken'

const {
  GET_USER_BEFORE,
  GET_USER_SUCCESS,
  GET_USER_AFTER,
  GET_USER_FAILED,
  DELETE_USER,
  LOADING_BTN,
  MODAL_FRIEND,
  SET_DATA_USER,
  SET_DATA_LIST_POST,
  SET_DATA_LIST_POST_INIT,
  LOADING_POST,
  SHOW_MODAL_POST_USER,
  SET_DATA_POST_USER,
  SET_DATA_POST_USER_MEMO,
  SET_DATA_LIST_COMMENT,
  SUCCESS_COMMENT,
  LOAD_ADD_COMMENT,
  REPLY_COMMENT,
  NO_REPLY_COMMENT,
} = ACTION_USER

interface IInitState {
  loading: boolean
  data: Array<any>
  detailUser: {
    _id: string
    email: string
    image: string
    name: string
    description: string
    totalPost: number
    totalFriend: number
  } & null
  loadingBtn: boolean
  showModalFriend: boolean
  listPostUser: any
  page: number
  statusLoadPost: boolean
  loadingCallPost: boolean
  postUser: {
    showModal: boolean
    dataMemoPostUser: Array<any>
    postUser: any
    listComment: Array<any>
  }
  loadAddComment: boolean
  commentReply: any
}

export interface IDataUserDecode {
  name: string
  iat: number
  sub: string
}

export const initStateUser: IInitState = {
  loading: false,
  data: [],
  detailUser: null,
  loadingBtn: false,
  showModalFriend: false,
  listPostUser: [], // list post
  page: 0, // page call api
  statusLoadPost: true, // false === not call api continue
  loadingCallPost: false,
  postUser: {
    showModal: false,
    dataMemoPostUser: [],
    postUser: null,
    listComment: [],
  },
  loadAddComment: false,
  commentReply: null,
}

export const UserReducer = (state = initStateUser, action: any) => {
  switch (action.type) {
    case SET_DATA_USER:
      return {
        ...state,
        detailUser: action.payload,
        loadingBtn: false,
        showModalFriend: false,
      }
    case SET_DATA_LIST_POST:
      return {
        ...state,
        listPostUser: [...state.listPostUser, ...action.payload],
        page: state.page + 1,
        statusLoadPost: action.payload.length === 0 ? false : true,
        loadingCallPost: !state.loadingCallPost,
      }
    case LOADING_POST:
      return {
        ...state,
        loadingCallPost: !state.loadingCallPost,
      }
    case SET_DATA_LIST_POST_INIT:
      return {
        ...state,
        listPostUser: action.payload,
        page: 1,
        statusLoadPost: true,
      }
    case LOADING_BTN:
      return {
        ...state,
        loadingBtn: !state.loadingBtn,
      }
    case MODAL_FRIEND:
      return {
        ...state,
        showModalFriend: !state.showModalFriend,
      }
    case SHOW_MODAL_POST_USER:
      return {
        ...state,
        postUser: {
          ...state.postUser,
          showModal: !state.postUser.showModal,
          postUser: null,
          listComment: [],
        },
      }
    case SET_DATA_POST_USER:
      return {
        ...state,
        postUser: {
          ...state.postUser,
          dataMemoPostUser: [...state.postUser.dataMemoPostUser, action.payload],
          postUser: action.payload,
        },
      }
    case SET_DATA_LIST_COMMENT:
      return {
        ...state,
        postUser: {
          ...state.postUser,
          listComment: action.payload,
        },
      }
    case SET_DATA_POST_USER_MEMO:
      return {
        ...state,
        postUser: {
          ...state.postUser,
          postUser: action.payload,
        },
      }
    case LOAD_ADD_COMMENT:
      return {
        ...state,
        loadAddComment: true,
      }
    case REPLY_COMMENT:
      return {
        ...state,
        commentReply: action.payload,
      }
    case NO_REPLY_COMMENT:
      return {
        ...state,
        commentReply: null,
      }
    case SUCCESS_COMMENT:
      const { payload: dataComment } = action
      const { dataMemoPostUser, postUser } = state.postUser

      let dataMemoPushComment, postUserPushComment

      if (dataComment.idCommentParrent !== '') {
        dataMemoPushComment = dataMemoPostUser.map(item => {
          if (item._id === dataComment.postId) {
            const commentChild = item.comments.map((itemComment: any) => {
              if (itemComment._id === dataComment.idCommentParrent) {
                return {
                  ...itemComment,
                  childs: [...itemComment.childs, dataComment],
                }
              }
              return itemComment
            })
          }
          return item
        })
        postUserPushComment = {
          ...postUser,
          comments: postUser.comments.map((itemPostUser: any) => {
            if (itemPostUser._id === dataComment.idCommentParrent) {
              return {
                ...itemPostUser,
                childs: [...itemPostUser.childs, dataComment],
              }
            }
            return itemPostUser
          }),
        }
      } else {
        dataMemoPushComment = dataMemoPostUser.map(item => {
          if (item._id === dataComment.postId) {
            return {
              ...item,
              comments: [...item.comments, dataComment],
            }
          }
          return item
        })
        postUserPushComment = {
          ...postUser,
          comments: [...postUser.comments, dataComment],
        }
      }
      return {
        ...state,
        postUser: {
          ...state.postUser,
          dataMemoPostUser: dataMemoPushComment,
          postUser: postUserPushComment,
        },
        loadAddComment: false,
      }

    default:
      return state
  }
}
