import { Button, Checkbox, Form, Input, message } from 'antd';
import React, { useState, useEffect, FC } from "react"
import { userLogin } from '@/api/login'
import { useNavigate } from 'react-router-dom' // 只能用在组件里 不能用在函数
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import type { AxiosResType } from '@/types/utils';

import Cookies from 'js-cookie'
interface FCProps {
  resetFields?: boolean
}
const trueLogin: React.FC<FCProps> = (props) => {
  const [form] = Form.useForm()
  const navTo = useNavigate()
  const [passwordCheck, setPasswordCheck] = useState<boolean>(false)

  const onFinish = (values: any) => {
    // 提交
    const user = {
      userName: values.username,
      userPassword: values.password
    }
    userLogin(user).then((res: AxiosResType) => {
      message.success(`登陆成功...跳转页面中.....`)

      if (passwordCheck) {
        // console.log('记住密码')
        Cookies.set('userName', user.userName)
        Cookies.set('userPassword', user.userPassword)
      }
      Cookies.set('token', 'test token~ music!')
      navTo('/')
    })
  }

  const onFinishFailed = (errorInfo: any) => {
    message.warning(`
    请检查是否填写正确！
    '错误代码：${errorInfo}' 
    `)
  }

  const remenberPasswordCheckChange = (e: CheckboxChangeEvent) => {
    const checked = e.target.checked
    setPasswordCheck(checked)
    Cookies.set('remenberPasswordCheck', checked)
    if (!checked) {
      Cookies.set('userName', '')
      Cookies.set('userPassword', '')
    }
  }

  const initForm = () => {
    const checked = Cookies.get('remenberPasswordCheck')
    checked === 'true' ? setPasswordCheck(true) : false
    if (checked) {
      form.setFieldsValue({
        username: Cookies.get('userName') || '',
        password: Cookies.get('userPassword') || '',
      })
    }
  }

  useEffect(() => {
    initForm()
  }, [true])

  useEffect(() => {
    console.log(props.resetFields, 'props')
    if (props.resetFields) {
      form.resetFields()
    }
  }, [props.resetFields])

  return (
    <div>
      <Form
        name="basic"
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: '请输入用户名！' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
          <Button type="primary" htmlType="submit" style={{ marginRight: '20px' }}>
            登录
          </Button>

          <Checkbox checked={passwordCheck} onChange={remenberPasswordCheckChange}>记住密码</Checkbox>
        </Form.Item>
      </Form>
    </div>
  )
}
export default trueLogin