import { configureStore } from '@reduxjs/toolkit'
import tagReducer from './modules/tagSlice'


export default configureStore({
  reducer: {
    tag: tagReducer
  }
})