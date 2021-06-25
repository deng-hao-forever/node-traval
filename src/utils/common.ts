const UUID = require('uuid')

class Utils {
  createUUID() {
    return UUID.v1()
  }
  httpSuccess({
    code = 200,
    data,
    msg = '请求成功',
  }: {
    code?: number
    data: any
    msg?: string
  }) {
    return {
      code,
      data,
      msg,
    }
  }
  httpFail({
    code = 500,
    data,
    msg = '请求失败',
  }: {
    code?: number
    data: any
    msg?: string
  }) {
    return {
      code,
      data,
      msg,
    }
  }
}
export default new Utils()
