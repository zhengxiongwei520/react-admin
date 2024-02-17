import React, { useEffect, useState } from "react"
import { Button, Checkbox, Form, Input, message, Space, } from 'antd';
import { userRegi } from '@/api/login'
import type { AxiosResType } from '@/types/utils';

interface FCProps {
  resetFields?: boolean
}
const register: React.FC<FCProps> = (props) => {
  const [form] = Form.useForm()
  const [codeDisabled, setCodeDisabled] = useState<boolean>(true)


  const onFinish = (values: any) => {
    // 提交
    // console.log('submit', values)
    const user = {
      userName: values.username,
      userPassword: values.password,
      phonenumber: values.phonenumber,
    }
    userRegi(user).then(() => {
      message.success('账号已经注册成功，快去登录吧~')
    })
  }

  const onFinishFailed = (errorInfo: any) => {
    // console.log('submit', 1212)
    message.warning(`
    请检查是否填写正确！
    '错误代码：${errorInfo}' 
    `)
  }
  const phonenumberRule = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
  const phonenumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCodeDisabled(true)
    // console.log(phonenumberRule.test(value), 'phonenumberRule.test(value)')
    if (phonenumberRule.test(value)) {
      setCodeDisabled(false)
    }
  }

  const getCode = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!codeDisabled) {
      message.success('随便输个4位数字的验证码~')
    } else {
      message.warning('请先输入手机号码')
    }
  }

  useEffect(() => {
    // reset
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
          <Input placeholder="设置你的用户名账号" />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input.Password placeholder="用于登录" />
        </Form.Item>

        <Form.Item
          label="手机号"
          name="phonenumber"
          rules={[{
            required: true,
            validator(rule, value, callback) {
              phonenumberRule.test(value)
                ?
                // Promise.resolve()
                callback()
                :
                // Promise.reject(new Error('请输入正确的手机号码'))
                callback('请输入正确的手机号码')
            },
          }]}
        >
          <Input placeholder="用于收取验证码和找回" onChange={phonenumberChange} />
        </Form.Item>

        <Form.Item
          label="验证码"
        >
          <Form.Item
            name="code"
            rules={[
              { required: true, message: '请输入收到的验证码！' },
              { min: 4, max: 4, message: '请输入正确的验证码!' },
            ]}
            style={{ display: 'inline-block', width: 'calc(70% - 8px)' }}
          >
            <Input placeholder="请输入验证码" />
          </Form.Item>
          <Form.Item
            style={{ display: 'inline-block', width: 'calc(30% - 8px)', marginLeft: '8px' }}
          >
            <Button onClick={getCode}>获取验证码</Button>
          </Form.Item>

        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
          <Button type="primary" htmlType="submit" style={{ marginRight: '20px' }}>
            注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
export default register