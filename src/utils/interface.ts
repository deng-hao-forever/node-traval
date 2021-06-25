export default interface Driver {
  get?: Function
  findElement?: Function
  wait?: Function
  findElements?: Function
  executeScript?: Function
}

export interface WxRobot {
  say?: any
  Friendship?: any
  on?: Function
  start?: Function
  Message?: any
  Room?: any
  Contact?: any
}

export interface CouponTemplate {
  like?: string
  historyPrice?: string
  currentPrice?: string
  coupon_link?: string
  title?: string
}
