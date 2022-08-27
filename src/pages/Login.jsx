import React from 'react'
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {Link, useNavigate} from 'react-router-dom'
import "./less/Login.less"
import logoImg from '../assets/logo.png'
import {LoginApi} from '../request/api'

export default function Login() {
  const navigate = useNavigate()

  const onFinish = (values) => {
    LoginApi({
      username: values.username,
      password: values.password
    }).then(res=>{
      if(res.errCode===0){
        message.success(res.message)
        // 存储数据
        localStorage.setItem('avatar', res.data.avatar)
        localStorage.setItem('cms-token', res.data['cms-token'])
        localStorage.setItem('editable', res.data.editable)
        localStorage.setItem('player', res.data.player)
        localStorage.setItem('username', res.data.username)
        // 跳转到根路径
        setTimeout(()=>{
          navigate('/')
        }, 1500)
      }else{
        message.error(res.message)
      }
    })
  };

  return (
    <div className="login">
      <div className='login_box'>
        <img src={logoImg} alt="" />
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username',
              },
            ]}
          >
            <Input size="large" prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password',
              },
            ]}
          >
            <Input.Password size="large" prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Link to="/register">I am not registered — Sign Up</Link>
          </Form.Item>

          <Form.Item>
            <Button size='large' type="primary" htmlType="submit" block>Log In</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
