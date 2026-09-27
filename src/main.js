import { createApp } from 'vue'
import * as Sentry from '@sentry/vue'
import App from './App.vue'


const app = createApp(App)
const releaseName = 'sentry-vue@1.0.1'

Sentry.init({
  app,
  dsn: 'https://4e8c20fe4fd75c81d9046852bd6fff70@o4512134249119744.ingest.us.sentry.io/4512134364528640',
  environment: import.meta.env.MODE,
  release: releaseName,
  integrations: [
    Sentry.browserTracingIntegration(),
  ],
  // 测试阶段采集全部性能数据；生产环境建议降低比例
  tracesSampleRate: import.meta.env.PROD ? 0.1 : 1.0,
  tracePropagationTargets: [
    'localhost',
    /^https:\/\/api\.example\.com/,
  ],
})
Sentry.setUser({
    id: 'demo-user-001',
    username: '测试用户',
})

app.mount('#app')
