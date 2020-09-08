import React, { useCallback, useRef, useState, useEffect } from 'react'
import styles from './style.module.scss'
import { ICreatePost } from './CreatePost.Interface'
import useMemoSelector from '@Common/useMemoSelector'
import { Form, Input, InputNumber, Button } from 'antd'
import { useDispatch } from 'react-redux'
import { createPostAction } from '@Store/Reducer/Home/Home.Action'
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
  const [image, setImage] = useState<any>({
    file: null,
    fileReader: '',
  })
  const [elementHeight, setElementHeight] = useState<string>('100px')
  const dispatch = useDispatch()
  const refFile = useRef(null)
  const refTextArea = useRef(null)
  const [form] = Form.useForm()
  const handleChooseImage = useCallback(() => {
    refFile.current.click()
  }, [image])
  const handleFile = (e: any) => {
    const file = e.target.files[0]
    const fileReader = file
    var reader = new FileReader()
    reader.onload = function(e) {
      setImage({
        file,
        fileReader: e.target.result,
      })
    }
    reader.readAsDataURL(fileReader)
  }
  console.log(image)

  const handleResize = (element: any) => {
    setElementHeight(element.target.scrollHeight + 'px')
  }
  const onFinish = (values: any) => {
    const formDataCreatPost = new FormData()
    formDataCreatPost.append('content', values.contentNewPost)
    formDataCreatPost.append('image', image.file)
    dispatch(createPostAction(formDataCreatPost))
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
        <Form
          name="nest-messages"
          style={{ width: '100%' }}
          className="form-new-post"
          onFinish={onFinish}
        >
          <div className={`${createPostWrapper}`}>
            <Form.Item name="contentNewPost">
              <Input.TextArea
                placeholder="Bạn đang nghĩ gì?"
                onChange={handleResize}
                ref={refTextArea}
                style={{ height: elementHeight }}
              />
            </Form.Item>
            {image.fileReader !== '' && (
              <div className={`${createPostContentImg} position-relative`}>
                <img src={image.fileReader} alt="" />
                <i
                  className="fa fa-times-circle position-absolute"
                  aria-hidden="true"
                  onClick={() =>
                    setImage({
                      file: null,
                      fileReader: '',
                    })
                  }
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
