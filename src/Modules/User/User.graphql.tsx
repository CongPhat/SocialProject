import { gql } from '@apollo/client'
const friend = `
    name
    image
    _id
    description
`
export const GET_FRIEND = gql`
  query GetFriends($id: String!) {
    friends(id: $id){
      ${friend}
    }
  }
`
export const GET_FRIEND_ONLINE = gql`
  query GetFriendsOnline {
    friendsOnline{
      ${friend}
    }
  }
`

// export const COMMENTS_SUBSCRIPTION_CONTENT = gql`
//   subscription OnCommentAdded($id: String!, $idUser: String!) {
//     newMessage(id: $id, idUser: $idUser) {
//         ${message}
//     }
//   }
// `

// export const COMMENTS_SUBSCRIPTION_CONTAINER = gql`
//   subscription OnCommentAdded($idUser: String!) {
//     newMessage(idUser: $idUser) {
//         ${message}
//     }
//   }
// `

// export const CREATE_MESSAGE = gql`
//   mutation CreateMessages($text: String!, $id: String!, $idUser: String!) {
//     createMessage(text: $text, id: $id, idUser: $idUser) {
//         ${message}
//     }
//   }
// `
