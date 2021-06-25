import express from 'express'
import fs from 'fs'
import { User } from '../types'
import Utils from '../utils/common'

const router = express.Router()

router.post('/createUser', (req, res, next) => {
  const { psw, phone, code, userInfo } = req.body
  if (code && code.length != 32 && (!psw || !phone)) {
    console.log(123)

    return res.json(Utils.httpFail({ data: null }))
  }

  if (psw === 'admin' && phone === 'admin') {
    let userList = JSON.parse(fs.readFileSync('user.json').toString())
    userList.forEach((item: { psw: any; id: any; userInfo: any }) => {
      if (item.psw === psw && phone === item.psw) {
        res.json(
          Utils.httpSuccess({
            data: { token: item.id, userInfo: item.userInfo.userInfo },
          })
        )
      }
    })
    return
  }

  fs.readFile('user.json', (err, data) => {
    if (err) {
      console.log('user.json读取失败')
    }
    if (data) {
      let id: string = ''
      const userList: Array<User> = JSON.parse(data.toString())
      let flag = false
      for (let index = 0; index < userList.length; index++) {
        const element = userList[index]
        if (element.code == code) {
          flag = true
          id = element.code
        }
      }

      if (!flag) {
        id = Utils.createUUID()
        const obj = { psw, phone, code, id, userInfo }
        userList.push(obj)
      }
      fs.writeFile('user.json', JSON.stringify(userList), () => {
        res.json(
          Utils.httpSuccess({
            data: { token: id, userInfo: userInfo.userInfo },
          })
        )
      })
    }
  })
})

export default router
