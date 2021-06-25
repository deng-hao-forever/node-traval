import express from 'express'
import fs from 'fs'
import { Attentions } from '../types'
import Utils from '../utils/common'

const router = express.Router()

router.get('/get', (req, res, next) => {
  const { pageNo, pageSize }: any = req.query
  const stream = fs.readFileSync('attention_introduction.json')
  if (stream) {
    let list = JSON.parse(stream.toString())
    let arr: Array<Attentions> = []
    let apiList = []
    list.forEach((item: Attentions) => {
      arr.push(...item.comments)
    })

    if (pageNo * pageSize > arr.length) {
      apiList = arr.slice((pageNo - 1) * pageSize, arr.length)
    } else {
      apiList = arr.slice((pageNo - 1) * pageSize, pageNo * pageSize)
    }
    res.json(
      Utils.httpSuccess({
        data: {
          totalPage: Math.ceil(arr.length / pageSize),
          list: apiList,
          pageNo,
        },
      })
    )
  }
})

router.delete('/delete', (req, res, next) => {
  const { id } = req.body
  let stream = fs.readFileSync('attention_introduction.json')
  let shouldDeleteIndex: any = ''
  let parent: any = ''
  if (!id) {
    res.json(
      Utils.httpFail({
        data: null,
        msg: 'id不存在',
      })
    )
  }
  if (stream) {
    let list = JSON.parse(stream.toString())
    list.forEach((item: Attentions, index1: number) => {
      parent = index1
      if (item.comments) {
        item.comments.splice(
          item.comments.findIndex((item) => item.id === id),
          1
        )
        item.comment_count--
      }
    })

    fs.writeFileSync('attention_introduction.json', JSON.stringify(list))
    res.json(
      Utils.httpSuccess({
        data: true,
      })
    )
  }
})

export default router
