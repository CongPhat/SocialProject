import React, { useState, useEffect, Suspense, useRef } from 'react'
import { getAll } from './service'
import styles from './style.module.scss'
import PostsContainer from './container/Posts/Posts.container'
import CreatePostContainer from './container/CreatePostContainer'

const { home, homePost } = styles

interface Props {}

const Home: React.FC<Props> = () => {
  return (
    <div className={`${home}`}>
      <div className={`${homePost}`}>
        <CreatePostContainer />
        <PostsContainer />
      </div>
    </div>
  )
}

export default Home
