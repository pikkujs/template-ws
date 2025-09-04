import { wireHTTP } from '../pikku-gen/pikku-types.gen.js'
import { pikkuSessionlessFunc } from '../pikku-gen/pikku-types.gen.js'

export const rpcCaller = pikkuSessionlessFunc<{ name: string; data: unknown }>(
  async ({ rpc }, { name, data }) => {
    return await rpc.invokeExposed(name, data)
  }
)

wireHTTP({
  method: 'post',
  route: '/rpc',
  func: rpcCaller,
})
