import { ACTION_POSTS, fetchDataPosts } from './Posts.Action'

interface IInitState {
  listPosts: Array<any>
}

export const initStatePosts: IInitState = {
  listPosts: [],
}

export const PostsReducer = (state = initStatePosts, action: any) => {
  switch (action.type) {
    case ACTION_POSTS.GET_LIST_SUCCESS:
      return {
        ...state,
        listPosts: action.data,
      }
    case ACTION_POSTS.INSERT_POST_NEW:
      return {
        ...state,
        listPosts: [action.payload, ...state.listPosts],
      }
    default:
      return state
  }
}
