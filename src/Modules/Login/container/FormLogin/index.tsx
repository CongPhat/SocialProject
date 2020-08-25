import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ACTION_LOGIN, login } from '@Store/Reducer/Login/Login.Action'
import LoginFaceBook from '@Modules/Login/components/LoginFacebook/LoginFaceBook'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Form, Input, Button } from 'antd'
import { Token } from '@Config/variable'
import styles from './style.module.scss'
import useMemoSelector from '@Common/useMemoSelector'

interface Props {}

const { formLogin, formLoginTitle } = styles

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
}

const FormLogin: React.FC<Props> = ({ history }: RouteComponentProps) => {
  const { loading } = useMemoSelector('LoginReducer', ['loading'])
  const dispatch = useDispatch()

  const onFinish = (values: any) => {
    dispatch(login(values, history))
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className={`${formLogin} text-center ant-form-item`}>
      <div className={formLoginTitle}>
        <h4>Chào mừng bạn đến với Tiny</h4>
      </div>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        // className="ant-form ant-form-horizontal"
      >
        <Form.Item name="email" rules={[{ required: true, message: 'Vui lòng nhập số email!' }]}>
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}>
          <Input.Password placeholder="Mật khẩu" />
        </Form.Item>

        <div className="text-center">
          <Button htmlType="submit" loading={loading}>
            Đăng nhập
          </Button>
        </div>
      </Form>
      {/* <LoginFaceBook /> */}
    </div>
  )
}

export default withRouter(FormLogin)
