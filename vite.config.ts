import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { viteMockServe } from "vite-plugin-mock"

// 引入的path模块可能会报错，是因为缺少ts的生命配置
// npm i -d @types/node

// 安装了如果还有红色警告
// import * as path from 'path

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteMockServe({
      supportTs: false,
      logger: false,
      mockPath: "./src/mock/"
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src')
    }
  }
})
