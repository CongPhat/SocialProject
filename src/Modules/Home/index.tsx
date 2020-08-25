import React, { useState, useEffect, Suspense, useRef } from 'react'
import { getAll } from './service'
import styles from './style.module.scss'
import PostsContainer from './container/Posts/Posts.container'

const { home } = styles

interface Props {}

const Home: React.FC<Props> = () => {
  return (
    <div className={`${home}`}>
      <PostsContainer />
    </div>
  )
}

export default Home
