export type User = { psw: string; code: string; phone: string }

export type Attentions = {
  id: string
  attention_name: string
  cover_img: string
  detail_img: Array<string>
  city: string
  comments: Array<any>
  count: number
  comment_count: number
  liked: boolean
}
