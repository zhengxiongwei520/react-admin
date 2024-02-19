import {
  Input, Row, Col, Select, Button, Table, message, Modal,
  TreeSelect
} from 'antd';
import { useState, useEffect, useCallback } from 'react';
import { DictType } from '@/mock/dicts'
import { DictToLabel } from '@/utils/filters'
import { fetchDict } from '@/utils/dicts'
import { dictDetail as getDictDetail } from '@/api/dicts'
import { menuListPage, menuList, handleMenuStatus, addMenu, editMenu } from '@/api/menu'
import type { ColumnsType } from 'antd/es/table';
import MenuModal from '@/views/Menu/MenuModal';
import { menulistParamsType } from '@/types/menu'
import { MenuType } from '@/types/menu'

const statusList = await fetchDict({ dictCode: 'menuStatus' })
const Menu: React.FC = function () {
  const [searchForm, setSearchForm] = useState<menulistParamsType>({
    menuname: '',
    pageNum: 1,
    pageSize: 10
  })
  const [tableData, setTableData] = useState<MenuType[]>([])
  const [fetchMenuListEffect, setGoEffect] = useState<boolean>(false)
  const [editForm, setEditForm] = useState<Partial<MenuType>>({})
  const [isUserModalOpen, setIsUserModalOpen] = useState<boolean>(false)
  const [treeIsChangeEffect, setTreeIsChangeEffect] = useState<boolean>(false)
  const [parentTreeData, setParentTreeData] = useState<(MenuType | {})[]>([])
  const [total, setTotal] = useState<number>(0)
  const [messageApi, contextHolder] = message.useMessage();
  const columns: ColumnsType<MenuType> = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '菜单名称',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => <a onClick={(e) => handleEdit(e, record)}>{text}</a>,
    },
    {
      title: '上级菜单',
      dataIndex: 'parentName',
      key: 'parentName',
      render: (text) => <span>{text}</span>
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text) => <span>{DictToLabel(text, statusList)}</span>
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <div>
          <Button type="link" onClick={e => handleEdit(e, record)}>编辑</Button>
          {
            record.status === '1'
              ?
              <Button type="link" onClick={e => handleStatus(e, record)}>停用</Button>
              :
              <Button type="link" onClick={e => handleStatus(e, record)}>启用</Button>
          }
        </div>
      ),
    },
  ]

  function haondleAdd() {
    setIsUserModalOpen(true)
    setEditForm({})
  }

  function handleEdit(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>,
    record: MenuType): void {
    console.log(event, record)
    setIsUserModalOpen(true)
    setEditForm(record)
  }

  function handleStatus(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>,
    record: MenuType): void {
    // console.log(event, record)
    Modal.confirm({
      title: '修改菜单状态',
      content: '是否修改菜单状态？',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        handleMenuStatus({ id: record.id, status: record.status === '1' ? '2' : '1' }).then(() => {
          messageApi.open({
            type: 'success',
            content: '修改成功',
          });
          setGoEffect(!fetchMenuListEffect)
        })
      },
    })
  }

  function handleSubmit() {
    // console.log('go submit')
    setGoEffect(!fetchMenuListEffect)
    setTreeIsChangeEffect(!treeIsChangeEffect)
  }

  useEffect(() => {
    console.log('分页菜单请求')
    menuListPage({
      pageNum: searchForm.pageNum,
      pageSize: searchForm.pageSize,
      menuname: searchForm.menuname,
      parentId: searchForm.parentId,
      status: searchForm.status,
    }).then(res => {
      // console.log(res, 'res')
      setTableData([...res.list])
      setTotal(res.total)
      console.log(res, 'rerererer')
    })
  }, [fetchMenuListEffect])

  useEffect(() => {
    // console.log(111)
    const fetchParentTreeData = async () => {
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
      setParentTreeData(parentTreeData)
    }
    fetchParentTreeData()
  }, [treeIsChangeEffect]);


  return (
    <div className="user-box">
      {contextHolder}
      <MenuModal
        open={isUserModalOpen}
        formSubmit={handleSubmit}
        setOpen={e => setIsUserModalOpen(e)}
        editform={editForm}></MenuModal>
      <div className="search-box">
        <Row gutter={12}>
          <Col span={8}>
            <Input showCount maxLength={20} placeholder="请输入菜单名称" value={searchForm.menuname} onChange={e => {
              setSearchForm({ ...searchForm, menuname: e.target.value });
            }} />
          </Col>
          <Col>
            <TreeSelect
              showSearch
              style={{ width: '100%' }}
              value={searchForm.parentId}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto', minWidth: 250 }}
              placeholder="上级菜单"
              allowClear
              treeDefaultExpandAll
              onChange={e => {
                // console.log(e, 'e')
                setSearchForm({ ...searchForm, parentId: e });
              }}
              treeData={parentTreeData}
            />
          </Col>
          <Col>
            <Select
              placeholder="菜单状态"
              style={{ width: 120 }}
              value={searchForm.status}
              allowClear={true}
              onChange={e => {
                setSearchForm({ ...searchForm, status: e });
              }}
              options={
                statusList.map(e => ({ value: e.dictValue, label: e.dictName }))
              }
            />
          </Col>
          <Col>
            <Button type="primary" onClick={() => { setGoEffect(!fetchMenuListEffect) }}>搜索</Button>
          </Col>
          <Col>
            <Button type="primary" onClick={haondleAdd}>新增</Button>
          </Col>
        </Row>
      </div>
      <div className="list-box">
        <Table
          columns={columns}
          dataSource={tableData}
          pagination={{
            defaultCurrent: searchForm.pageNum,
            defaultPageSize: searchForm.pageSize,
            showSizeChanger: true,
            total: total,
            onChange: (page, pageSize) => {
              setSearchForm({ ...searchForm, pageNum: page, pageSize: pageSize })
              setGoEffect(!fetchMenuListEffect)
            }
          }}
          rowKey="id" />
      </div>
    </div>
  )
}
export default Menu