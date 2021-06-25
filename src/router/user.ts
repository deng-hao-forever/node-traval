import express from 'express'
import fs from 'fs'
import Utils from '../utils/common'
const router = express.Router()

router.get('/get', (req, res, next) => {
  const token = req.get('token') || ''
  if (!token) {
    return res.json(
      Utils.httpFail({
        data: false,
        msg: 'token 无效',
      })
    )
  }
  let stream = fs.readFileSync('user.json')
  if (stream) {
    let list = JSON.parse(stream.toString())
    let arr = list.filter((item: any) => item.id === token)
    if (arr.length) {
      res.json(
        Utils.httpSuccess({
          data: arr[0],
        })
      )
    } else {
      res.json(
        Utils.httpFail({
          data: false,
          msg: '用户无效',
        })
      )
    }
  }
})
export default router
