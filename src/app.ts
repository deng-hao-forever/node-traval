import express from 'express'
import login from './router/login'
import attentions from './router/attentions'
import user from './router/user'
import comments from './router/comments'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/login', login)

app.use('/attentions', attentions)

app.use('/user', user)

app.use('/comments', comments)

//设置跨域访问
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

app.listen(3099, () => {})
