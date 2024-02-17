import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App'
import '@/index.css'
import '@/assets/styles/global.scss'
// import Router from '@/router'
import App from '@/App'
import { BrowserRouter } from 'react-router-dom'
import { mockXHR } from '@/mock'
import '@/utils/global'
mockXHR()

// 状态管理
import { Provider } from 'react-redux'
import store from '@/store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <React.StrictMode>
      {/* <Router /> */}
      <BrowserRouter>
        <React.Suspense fallback={<div>Loading...</div>}>
          <App />
        </React.Suspense>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
)
