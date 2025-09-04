import { wireChannel, wireHTTP } from '../pikku-gen/pikku-types.gen.js'
import { progressiveEnhancementExample } from './http-progressive-enhancement.functions.js'

wireHTTP({
  auth: false,
  method: 'get',
  route: '/status/sse',
  func: progressiveEnhancementExample,
})

wireChannel({
  name: 'progressive-enhancement',
  route: '/status/websocket',
  auth: false,
  onMessageWiring: {
    action: {
      status: progressiveEnhancementExample,
    },
  },
})

wireHTTP({
  auth: false,
  method: 'get',
  route: '/status/http',
  func: progressiveEnhancementExample,
  sse: true,
})
