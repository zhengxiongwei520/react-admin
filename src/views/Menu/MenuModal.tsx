import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Input, Select, message, TreeSelect } from 'antd'
import { fetchDict } from '@/utils/dicts'
import { menuList, addMenu, editMenu } from '@/api/menu'
import {  MenuType } from '@/types/menu'


async function fetchMenuList(): Promise<MenuType[]> {
  const data = await menuList()
  return data.menus
}
const menusList = await fetchMenuList()

function handleMenus(menusList: MenuType[]): (MenuType | {})[] {
  return menusList.map(e => ({
    value: e.id,
    ...e,
    children: e?.children.length > 0
      ? handleMenus(e.children)
      : undefined,
  }))
}
const parentTreeData = handleMenus(menusList)

const roleList = await fetchDict({ dictCode: 'role' })
const statusList = await fetchDict({ dictCode: 'menuStatus' })

interface FCProps {
  open: boolean,
  setOpen: (oepnStatus: boolean) => void,
  editform?: Partial<MenuType>,
  formSubmit: () => void
}

const MenuModal: React.FC<FCProps> = (props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(true)
  const [form] = Form.useForm()

  const originalForm: Partial<MenuType> | {role: string[]} = {
    id: '',
    title: undefined,
    url: undefined,
    element: undefined,
    role: [],
    status: undefined,
    parentId: undefined,
    parentName: undefined,
    children: []
  }

  useEffect(() => {
    // console.log(props, 'go')
    setModalOpen(props.open)
    if (props.open) {
      props.editform?.id
      ?
      form.setFieldsValue({ ...props.editform, role: props.editform.role && props.editform.role?.split(',') || [] })
      :
      form.setFieldsValue(originalForm)
    }
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
    const menu = {
      ...values,
      role: values.role.join(','),
      id: props.editform?.id
    }
    if (menu.id) {
      editMenu(menu).then(() => {
        message.success('编辑菜单成功')
        hideModal()
      })
    } else {
      addMenu(menu).then(() => {
        message.success('新增菜单成功')
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
            hidden={true}
          >
          </Form.Item>

          <Form.Item
            label="菜单名称"
            name="title"
            rules={[{ required: true, message: '请输入菜单名称!' }]}
          >
            <Input placeholder="请输入菜单名称" />
          </Form.Item>

          <Form.Item
            label="上级菜单"
            name="parentId"
            rules={[{ required: true, message: '请选择上级菜单!' }]}
          >
            <TreeSelect
              showSearch
              style={{ width: '100%' }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto', minWidth: 250 }}
              placeholder="上级菜单"
              allowClear
              treeDefaultExpandAll
              treeData={parentTreeData}
            />
          </Form.Item>

          <Form.Item
            label="菜单路由"
            name="url"
            rules={[{ required: true, message: '请输入菜单路由!' }]}
          >
            <Input placeholder="请输入菜单路由" />
          </Form.Item>

          <Form.Item
            label="组件名称"
            name="element"
            rules={[{ required: false, message: '请输入组件名称!' }]}
          >
            <Input placeholder="请输入组件名称" />
          </Form.Item>

          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态!' }]}
          >
            <Select
              placeholder="请选择状态"
              // value={searchForm.city}
              allowClear={true}
              // onChange={e => {
              //   setSearchForm({ ...searchForm, city: e });
              // }}
              options={
                statusList.map(e => ({ value: e.dictValue, label: e.dictName }))
              }
            />
          </Form.Item>

          <Form.Item
            name="role"
            label="角色"
            rules={[{ required: true, message: '请选择角色!' }]}
          >
            <Select
              placeholder="请选择角色"
              // value={searchForm.role}
              mode="multiple"
              allowClear={true}
              // onChange={e => {
              //   setSearchForm({ ...searchForm, role: e });
              // }}
              options={
                roleList.map(e => ({ value: e.dictValue, label: e.dictName }))
              }
            />
          </Form.Item>

        </Form>
      </Modal>
    </div>
  )
}

export default MenuModal