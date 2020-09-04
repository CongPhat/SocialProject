import React, { useCallback, useRef, useState, useEffect } from 'react'
import styles from './style.module.scss'
import { ICreatePost } from './CreatePost.Interface'
import useMemoSelector from '@Common/useMemoSelector'
import { Form, Input, InputNumber, Button } from 'antd'
const {
  createPost,
  createPostHeader,
  createPostHeaderUser,
  createPostContent,
  createPostWrapper,
  createPostContentAdd,
  createPostContentImg,
} = styles
interface Iprops {}

const CreatePost = (props: Iprops) => {
  const { dataUser } = useMemoSelector('LoginReducer', ['dataUser'])
  const [image, setImage] = useState<any>('')
  const [elementHeight, setElementHeight] = useState<string>('100px')
  const refFile = useRef(null)
  const refTextArea = useRef(null)
  const handleChooseImage = useCallback(() => {
    refFile.current.click()
  }, [image])
  const handleFile = (e: any) => {
    console.log(124)
    const file = e.target.files[0]
    var reader = new FileReader()
    reader.onload = function(e) {
      console.log(e.target.result)
      setImage(e.target.result)
    }
    reader.readAsDataURL(file)
  }
  useEffect(() => {
    console.log(image)
  }, [image])
  const handleResize = (element: any) => {
    setElementHeight(element.target.scrollHeight + 'px')
  }
  return (
    <div className={`${createPost}`}>
      <div className={`${createPostHeader} d-flex`}>
        <img src={dataUser.image} alt="" />
        <div className={`${createPostHeaderUser}`}>
          <h6>{dataUser.name}</h6>
          <p>
            <i className="fa fa-globe" aria-hidden="true"></i> Công khai
          </p>
        </div>
      </div>
      <div className={`${createPostContent} d-flex`}>
        <Form name="nest-messages" style={{ width: '100%' }} className="form-new-post">
          <div className={`${createPostWrapper}`}>
            <Form.Item name="contentNewPost">
              <Input.TextArea
                placeholder="Bạn đang nghĩ gì?"
                onChange={handleResize}
                ref={refTextArea}
                style={{ height: elementHeight }}
              />
            </Form.Item>
            {image !== '' && (
              <div className={`${createPostContentImg} position-relative`}>
                <img src={image} alt="" />
                <i
                  className="fa fa-times-circle position-absolute"
                  aria-hidden="true"
                  onClick={() => setImage('')}
                ></i>
              </div>
            )}
          </div>
          <div className={`${createPostContentAdd}`}>
            <span>Thêm vào bài viết</span>
            <div>
              <i className="fa fa-picture-o" aria-hidden="true" onClick={handleChooseImage}></i>
              <input type="file" ref={refFile} style={{ display: 'none' }} onInput={handleFile} />
            </div>
          </div>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Đăng
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default React.memo(CreatePost)
