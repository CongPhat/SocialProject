import { gql } from '@apollo/client'
const message = `
    content
    _id
    like
    isSend
    date
    userSend {
        name
        image
        _id
    }
    userReceive {
        name
        image
        _id
    }
`
// export const GET_MESSAGE = gql`
//   query GetMessages($id: String!, $idUser: String!, $payload: Int!) {
//     messages(id: $id, idUser: $idUser, payload: $payload) {
//       ${message}
//     }
//   }
// `

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
