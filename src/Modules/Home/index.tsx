import React, { useState, useEffect, Suspense, useRef } from 'react'
import { getAll } from './service'
import styles from './style.module.scss'
import PostsContainer from './container/Posts/Posts.container'

const { home } = styles

interface Props {}

const Home: React.FC<Props> = () => {
  // const [visiblePost, setVisiblePost] = useState(false)
  // const [Post, setPost] = useState<React.FC | null>(null)
  // const ref = useRef()

  // const handle = () => {
  //   setVisiblePost(pre => !pre)
  // }
  // useEffect(() => {
  //   setVisiblePost(true)
  //   getAll().then(res => {
  //     console.log(res)
  //   })

  //   const constrain = { video: true }
  //   const success = (stream: any) => {
  //     ref.current.srcObject = stream
  //   }
  //   const error = (e: any) => {
  //     console.log('error', e)
  //   }
  //   navigator.getUserMedia(constrain, success, error)
  // }, [])

  return (
    <div className={`${home}`}>
      <PostsContainer />
    </div>
  )
}

export default Home
