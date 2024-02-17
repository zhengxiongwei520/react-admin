const defaultState = {
  num: 10
}

// 创建数据仓储
const reducer = (state = defaultState) => {
  const newState = JSON.parse(JSON.stringify(state))
  return newState
}
export default reducer