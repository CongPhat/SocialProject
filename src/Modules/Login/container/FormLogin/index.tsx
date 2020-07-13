import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import {ACTION_LOGIN} from '@Store/Reducer/Login/Login.Action';
import LoginFaceBook from '@Modules/Login/components/LoginFacebook/LoginFaceBook';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import {Token} from '@Config/variable';
import styles from './style.module.scss';

interface Props {

}

const {formLogin,
      formLoginTitle
    } = styles;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const FormLogin: React.FC<Props> = ({history}: RouteComponentProps) => {
  const [user, setUser] = useState<string>('');
  const dispath = useDispatch();

  const onFinish = (values: any) => {
    console.log('Success:', values);
    //goi api ve nhan token
    dispath({type: ACTION_LOGIN.LOGIN, value: Token});
    history.push('/');
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={`${formLogin} text-center`}>
      <div className={formLoginTitle}>
        <h4>Chào mừng bạn đến với Tiny</h4>
      </div>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Vui lòng nhập số điện thoại hoặc email!' }]}
        >
          <Input placeholder='Số điện thoại hoặc email'/>
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
        >
          <Input.Password placeholder='Mật khẩu'/>
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit">
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
      <LoginFaceBook />
    </div>
  )
}

export default withRouter(FormLogin)
