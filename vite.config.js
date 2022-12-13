import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 引用使用less的库要配置一下
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  build: {
    lib: {
      entry: './packages/index.js',
      name: 'wattpc-ui'
    },
    rollupOptions: {
      external: ['vue', 'axios', 'js-cookie'],
      output: {
        exports: 'named',
        globals: {
          'vue': 'Vue',
          'axios': 'axios',
          'js-cookie': 'Cookies'
        }
      }
    }
  }
})
