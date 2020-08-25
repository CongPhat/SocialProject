import React, { useEffect } from 'react'
import styles from './Posts.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDataPosts } from '@Store/Reducer/Posts/Posts.Action'
import ItemsPost from '@Modules/Home/components/ItemsPost'

const { posts } = styles

interface Props {}

const PostsContainer: React.FC<Props> = () => {
  const { listPosts } = useSelector((state: any) => state.PostsReducer)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchDataPosts())
  }, [])

  return (
    <section className={posts}>
      {listPosts.map((item: any, index: number) => (
        <ItemsPost itemPost={item} key={index} />
      ))}
    </section>
  )
}

export default PostsContainer
