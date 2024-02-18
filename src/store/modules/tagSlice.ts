import { createSlice } from '@reduxjs/toolkit'
import { debug } from 'console'

export const tagSlice = createSlice({
  name: 'tag',
  initialState: {
    value: [
      {
        title: '首页',
        url: '/dashboard'
      },
      // {
      //   title: '菜单管理',
      //   url: '/system/menu'
      // },
      // {
      //   title: '按钮',
      //   url: '/comp/button'
      // },
    ]
  },
  reducers: {
    addTag: (state, actions) => {
      const router = actions.payload
      const index = state.value.findIndex(_ => _.url === router.url)
      if (index === -1) {
        state.value.push(router)
      }
    },
    removeTag: (state, actions) => {
      const url = actions.payload.url
      const value = state.value
      const index = value.findIndex(_ => _.url === url)
      if (index !== -1) {
        state.value.splice(index, 1)
      }
    }
  }
})

export const { addTag, removeTag } = tagSlice.actions

export default tagSlice.reducer