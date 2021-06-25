import Utils from '../utils/common'
const fs = require('fs')
fs.readFile('way.json', (err: any, data: any) => {
  if (data) {
    let list = JSON.parse(data.toString())
    list.forEach((item: any) => {
      item.id = Utils.createUUID()
      if (item.main) {
        item.main.forEach((item1: any) => {
          item1.id = Utils.createUUID()
        })
      }
    })

    fs.writeFile('way.json', JSON.stringify(list), () => {})
  }
})
