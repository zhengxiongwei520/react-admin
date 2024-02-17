import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Input, Select, message } from 'antd'
import { dictDetail as getDictDetail } from '@/api/dicts'
import { DictType } from '@/mock/dicts'
import { UserType } from '@/types/user'
import { addUser, updateUser } from '@/api/user';

async function fetchDict(params: { dictCode: string }): Promise<DictType[]> {
  const data = await getDictDetail(params)
  return data.dicts
}
const roleList = await fetchDict({ dictCode: 'role' })
const cityList = await fetchDict({ dictCode: 'city' })

interface FCProps {
  open: boolean,
  setOpen: (oepnStatus: boolean) => void,
  editform?: Partial<UserType>,
  formSubmit: () => void
}

const UserModal: React.FC<FCProps> = (props) => {
  // const [ruleForm, setRuleForm] = useState<UserType>({
  //   userName: '',
  //   userPassword: '',
  //   role: '',
  //   city: ''
  // })
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(true)
  const [form] = Form.useForm()

  useEffect(() => {
    // console.log(props, 'go')
    setModalOpen(props.open)
    props.editform?.id
      ?
      form.setFieldsValue({ ...props.editform })
      :
      form.setFieldsValue({ userName: undefined, userPassword: undefined, role: undefined, city: undefined })
  }, [props.open])

  const showModal = () => {
    // setModalOpen(true)
    props.setOpen(true)
  }

  const hideModal = () => {
    // setModalOpen(false)
    props.setOpen(false)
  }

  const onFinish = (values: any) => {
    // console.log(values);
    if (values.id) {
      updateUser(values).then(() => {
        message.success('编辑成功')
        hideModal()
      })
    } else {
      addUser(values).then(() => {
        message.success('新增成功')
        hideModal()
      })
    }
    props.formSubmit()
  };

  // const onFinishFailed = () => {
  //   console.log(form, 'form')
  // }

  return (
    <div>
      <Modal
        title="Modal"
        getContainer={false}
        open={modalOpen}
        onOk={showModal}
        onCancel={hideModal}
        okText="确认"
        cancelText="取消"
        footer={[
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button onClick={hideModal}>
              取消
            </Button>
            <Button type="primary" onClick={() => {
              form.submit()
            }}>
              保存
            </Button>
          </Form.Item>
        ]}
      >
        <Form
          name="basic"
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="id"
            name="id"
            style={{ display: 'none' }}
          >
          </Form.Item>

          <Form.Item
            label="用户名"
            name="userName"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>

          <Form.Item
            label="用户密码"
            name="userPassword"
            rules={[{ required: true, message: '请输入用户密码!' }]}
          >
            <Input.Password placeholder="请输入用户密码" />
          </Form.Item>

          <Form.Item
            name="role"
            label="角色"
            rules={[{ required: true, message: '请选择角色!' }]}
          >
            <Select
              placeholder="请选择角色"
              // value={searchForm.role}
              allowClear={true}
              // onChange={e => {
              //   setSearchForm({ ...searchForm, role: e });
              // }}
              options={
                roleList.map(e => ({ value: e.dictValue, label: e.dictName }))
              }
            />
          </Form.Item>

          <Form.Item
            name="city"
            label="城市"
            rules={[{ required: true, message: '请选择城市!' }]}
          >
            <Select
              placeholder="请选择城市"
              // value={searchForm.city}
              allowClear={true}
              // onChange={e => {
              //   setSearchForm({ ...searchForm, city: e });
              // }}
              options={
                cityList.map(e => ({ value: e.dictValue, label: e.dictName }))
              }
            />
          </Form.Item>

        </Form>
      </Modal>
    </div>
  )
}

export default UserModal