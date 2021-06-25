import { Attentions } from './../types'
import express from 'express'
import fs from 'fs'
import Utils from '../utils/common'
const router = express.Router()

router.get('/get', async (req, res, next) => {
  const { pageSize, pageNo, city }: any = req.query
  if (!pageSize) {
    return res.json(Utils.httpFail({ data: [], msg: 'pageSize 不存在' }))
  }
  if (!pageNo) {
    return res.json(Utils.httpFail({ data: [], msg: 'pageNo 不存在' }))
  }
  if (!city) {
    return res.json(Utils.httpFail({ data: [], msg: 'city 不存在' }))
  }
  let list,
    arrCityAttentionList = []
  selectAttention({
    pageSize,
    pageNo,
    city,
    callback: (res1: any) => {
      arrCityAttentionList = res1.arrCityAttentionList
      list = res1.list
      res.json(
        Utils.httpSuccess({
          data: {
            pageNo: pageNo,
            pageSize,
            city,
            list,
            totalPage: Math.ceil(arrCityAttentionList.length / pageSize),
          },
        })
      )
    },
  })
})

router.get('/banner', async (req, res, next) => {
  const { city, count = 4 }: any = req.query
  if (!city) {
    return res.json(Utils.httpFail({ data: [], msg: 'city 不存在' }))
  }
  let arrCityAttentionList = []
  selectAttention({
    city,
    callback: (res1: any) => {
      arrCityAttentionList = res1.arrCityAttentionList
      var list = []
      var indexArr: number[] = []
      list = getListByAttentionsList(count, arrCityAttentionList, indexArr)
      res.json(
        Utils.httpSuccess({
          data: { list },
        })
      )
    },
  })
})

router.get('/detail', (req, res, next) => {
  const { id }: any = req.query
  if (!id) {
    return res.json(Utils.httpFail({ data: [], msg: 'id 不存在' }))
  }
  fs.readFile('attention_introduction.json', (err, data) => {
    if (err) {
      return
    }
    if (data) {
      let list = JSON.parse(data.toString())
      const arr = list.filter((item: Attentions) => item.id == id)
      if (!arr.length) {
        return res.json(Utils.httpFail({ data: [], msg: 'id有误' }))
      }
      res.json(
        Utils.httpSuccess({
          data: arr[0],
        })
      )
    }
  })
})

router.get('/intro', (req, res, next) => {
  const { city }: any = req.query
  let resp: { city?: string } = {}
  let file = fs.readFileSync('attentions.json')
  if (file) {
    let list = JSON.parse(file.toString())
    list.forEach((item: { city?: string }) => {
      if (item.city === city) {
        resp = item
      }
    })
  }
  if (resp.city) {
    res.json(
      Utils.httpSuccess({
        data: resp,
      })
    )
  } else {
    res.json(
      Utils.httpFail({
        data: false,
        msg: 'city 不存在',
      })
    )
  }
})

router.post('/post', (req, res, next) => {
  const { id, content }: any = req.body
  const userId = req.get('token') || ''
  if (!userId) {
    return res.json(
      Utils.httpFail({
        code: 403,
        data: false,
        msg: 'token无效',
      })
    )
  }
  if (!content) {
    return res.json(
      Utils.httpFail({
        data: false,
        msg: '评论内容不能为空',
      })
    )
  }
  if (!id) {
    return res.json(
      Utils.httpFail({
        data: false,
        msg: '找不到对应景点',
      })
    )
  }
  fs.readFile('user.json', (err, data) => {
    if (err) {
      return res.json(
        Utils.httpFail({
          data: false,
        })
      )
    }
    if (data) {
      const userList = JSON.parse(data.toString())
      const arr = userList.filter((item: any) => item.id === userId)
      if (!arr.length) {
        return res.json(
          Utils.httpFail({
            code: 403,
            data: [],
            msg: 'token无效',
          })
        )
      }
      fs.readFile('attention_introduction.json', (err1, data1) => {
        if (err1) {
          return res.json(
            Utils.httpFail({
              data: false,
            })
          )
        }
        if (data1) {
          const attentions_list = JSON.parse(data1.toString())
          attentions_list.forEach((item: Attentions) => {
            if (item.id === id) {
              item.comments = (item.comments && item.comments) || []
              item.comments.push({
                value: content,
                id: Utils.createUUID(),
                user: arr[0],
              })
              item.comment_count = item.comments.length
            }
          })

          fs.writeFile(
            'attention_introduction.json',
            JSON.stringify(attentions_list),
            () => {
              return res.json(
                Utils.httpSuccess({
                  data: true,
                  msg: '评论成功',
                })
              )
            }
          )
        }
      })
    }
  })
})

router.post('/liked', (req, res, next) => {
  const { liked, id }: any = req.body
  fs.readFile('attention_introduction.json', (err, data) => {
    if (err) {
      console.log(err)
    }
    if (data) {
      let flag = false
      let list = JSON.parse(data.toString())
      list.forEach((item: Attentions) => {
        if (item.id === id) {
          flag = true
          item.liked = liked
          if (liked) {
            item.count++
          } else {
            item.count--
          }
        }
      })
      if (flag) {
        res.json(
          Utils.httpSuccess({
            data: true,
          })
        )
      } else {
        res.json(
          Utils.httpFail({
            data: false,
            msg: 'id 错误',
          })
        )
      }
      fs.writeFile(
        'attention_introduction.json',
        JSON.stringify(list),
        () => {}
      )
    }
  })
})

router.get('/way', (req, res, next) => {
  const { city } = req.query
  fs.readFile('way.json', (err, data) => {
    if (err) {
      console.log(err)
    }
    if (data) {
      let list = JSON.parse(data.toString())
      res.json(
        Utils.httpSuccess({
          data: list,
        })
      )
    }
  })
})

function selectAttention({ pageNo = '', pageSize = '', city, callback }: any) {
  const arrCityAttentionList: Array<Attentions> = []
  let list: Array<Attentions> = []
  fs.readFile('attention_introduction.json', (err, data) => {
    if (err) {
      return callback({ list, arrCityAttentionList })
    }
    if (data) {
      const arr = JSON.parse(data.toString())
      arr.forEach((item: Attentions) => {
        if (item.city === city) {
          arrCityAttentionList.push(item)
        }
      })
      if (!pageNo || !pageSize)
        return callback({
          list,
          arrCityAttentionList,
        })
      //pn: 1  pageS 5
      if (pageNo * pageSize > arrCityAttentionList.length) {
        list = arrCityAttentionList.slice(
          (pageNo - 1) * pageSize,
          arrCityAttentionList.length
        )
      } else {
        list = arrCityAttentionList.slice(
          (pageNo - 1) * pageSize,
          pageNo * pageSize
        )
      }
      return callback({
        list,
        arrCityAttentionList,
      })
    }
  })
}

function randomNum({ min, max }: { min: number; max: number }) {
  return ~~(Math.random() * max + min)
}

const getListByAttentionsList = (
  count: number,
  arrCityAttentionList: Array<Attentions>,
  indexArr: Array<number>
) => {
  let list: Array<Attentions> = []
  if (indexArr.length < count) {
    let index = randomNum({
      min: 0,
      max: arrCityAttentionList.length - 1,
    })

    if (!~indexArr.indexOf(index)) {
      indexArr.push(index)
    }
    list = getListByAttentionsList(count, arrCityAttentionList, indexArr)
    return list
  } else {
    indexArr.forEach((flag) => {
      list.push(arrCityAttentionList[flag])
    })
    return list
  }
}

export default router
