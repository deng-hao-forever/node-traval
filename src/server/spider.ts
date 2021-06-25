import Driver from '../utils/interface'

const { Builder, By, Key, until } = require('selenium-webdriver')
const fs = require('fs')

export default class Spider {
  // selenium webdriver
  driver: Driver = {}
  // 获取的数据数组
  list: Array<Object> = []
  currentPage: number = 0
  constructor() {}

  //获取driver 对象
  async getDriver() {
    this.driver = await new Builder().forBrowser('chrome').build()
    return this.driver
  }

  // 获取HTMl
  async getHtml(url: string) {
    return this.driver.get!(url)
  }

  // 查找元素
  async findElement(callback: any) {
    return this.driver.findElement!(callback)
  }
  // 等待
  async wait(fun: Function) {
    return this.driver.wait!(fun())
  }

  waitTime(n: number) {
    return new Promise((resolve: Function) =>
      setTimeout(() => {
        resolve()
      }, n)
    )
  }

  async getIntro() {
    await this.getDriver()
    await this.getHtml('http://www.sunzhongshanguli.com/')
    await this.waitTime(3000)
    var tab = await this.findElement(By.id('formTabButton1332'))
    tab.click()
  }
}

const spider = new Spider()
spider.getIntro()
