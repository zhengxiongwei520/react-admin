import { Input, Row, Col, Select, Button, Table, message, Modal } from 'antd';
import { useState, useEffect } from 'react';
import { DictType } from '@/mock/dicts'
import { DictToLabel } from '@/utils/filters'
import { dictDetail as getDictDetail } from '@/api/dicts'
import { userList as getUserList, delUser, addUser, updateUser } from '@/api/user'
import type { ColumnsType } from 'antd/es/table';
import { UserType } from '@/types/user'
import UserModal from '@/views/User/UserModal';

async function fetchDict(params: { dictCode: string }): Promise<DictType[]> {
	const data = await getDictDetail(params)
	return data.dicts
}
const roleList = await fetchDict({ dictCode: 'role' })
const cityList = await fetchDict({ dictCode: 'city' })



interface SearchForm {
	keyword: string | undefined,
	role: string | undefined,
	city: string | undefined,
	pageNum: number,
	pageSize: number
}

const User: React.FC = function () {
	const [searchForm, setSearchForm] = useState<SearchForm>({
		keyword: '',
		role: undefined,
		city: undefined,
		pageNum: 1,
		pageSize: 10
	})
	const [tableData, setTableData] = useState<UserType[]>([])
	const [goEffect, setGoEffect] = useState<boolean>(false)
	const [editForm, setEditForm] = useState<Partial<UserType>>({})
	const [isUserModalOpen, setIsUserModalOpen] = useState<boolean>(false)
	const [total, setTotal] = useState<number>(0)
	const [messageApi, contextHolder] = message.useMessage();
	const columns: ColumnsType<UserType> = [
		{
			title: 'id',
			dataIndex: 'id',
			key: 'id',
		},
		{
			title: 'username',
			dataIndex: 'userName',
			key: 'userName',
			render: (text, record) => <a onClick={e => handleEdit(e, record)}>{text}</a>,
		},
		{
			title: 'role',
			dataIndex: 'role',
			key: 'role',
			render: (text) => <span>{DictToLabel(text, roleList)}</span>
		},
		{
			title: 'city',
			dataIndex: 'city',
			key: 'city',
			render: (text) => <span>{DictToLabel(text, cityList)}</span>
		},
		{
			title: 'Action',
			key: 'action',
			render: (_, record) => (
				<div>
					<Button type="link" onClick={e => handleEdit(e, record)}>编辑</Button>
					<Button type="link" onClick={e => handleDel(e, record)}>删除</Button>
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
		record: UserType): void {
		// console.log(event, record)
		setIsUserModalOpen(true)
		setEditForm(record)
	}

	function handleDel(
		event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
			| React.MouseEvent<HTMLButtonElement, MouseEvent>,
		record: UserType): void {
		// console.log(event, record)
		Modal.confirm({
			title: '删除确认',
			content: '是否确认删除该用户？',
			okText: '确认',
			cancelText: '取消',
			onOk() {
				delUser({ userId: record.id }).then(() => {
					messageApi.open({
						type: 'success',
						content: '删除成功',
					});
					setGoEffect(!goEffect)
				})
			},
		})
	}

	function handleSubmit() {
		// console.log('go submit')
		setGoEffect(!goEffect)
	}

	useEffect(() => {
		// console.log('submit effct?')
		getUserList({
			pageNum: searchForm.pageNum,
			pageSize: searchForm.pageSize,
			keyword: searchForm.keyword,
			city: searchForm.city,
			role: searchForm.role
		}).then(res => {
			setTableData([...res.list])
			setTotal(res.total)
		})
	}, [goEffect])

	return (
		<div className="user-box">
			{contextHolder}
			<UserModal
				open={isUserModalOpen}
				formSubmit={handleSubmit}
				setOpen={e => setIsUserModalOpen(e)}
				editform={editForm}></UserModal>
			<div className="search-box">
				<Row gutter={12}>
					<Col span={8}>
						<Input showCount maxLength={20} placeholder="请输入用户名" value={searchForm.keyword} onChange={e => {
							setSearchForm({ ...searchForm, keyword: e.target.value });
						}} />
					</Col>
					<Col>
						<Select
							placeholder="请选择角色"
							style={{ width: 120 }}
							value={searchForm.role}
							allowClear={true}
							onChange={e => {
								setSearchForm({ ...searchForm, role: e });
							}}
							options={
								roleList.map(e => ({ value: e.dictValue, label: e.dictName }))
							}
						/>
					</Col>
					<Col>
						<Select
							placeholder="请选择城市"
							style={{ width: 120 }}
							value={searchForm.city}
							allowClear={true}
							onChange={e => {
								setSearchForm({ ...searchForm, city: e });
							}}
							options={
								cityList.map(e => ({ value: e.dictValue, label: e.dictName }))
							}
						/>
					</Col>
					<Col>
						<Button type="primary" onClick={() => { setGoEffect(!goEffect) }}>搜索</Button>
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
							// console.log(searchForm, 'SearchForm')
							// console.log(JSON.stringify(page), 'page, pageSize')
							setGoEffect(!goEffect)
						}
					}}
					rowKey={record => record.id || record.userName} />
			</div>
		</div>
	)
}
export default User