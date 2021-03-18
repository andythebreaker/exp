#!/usr/bin/env node

// Step 1 and step 2 code goes here
const express = require('express')
const app = express()

const port = 18787
app.get('/step1', (req, res) => {
    // response browser
    // 回應瀏覽器
    res.send('hello world')
  })
  app.listen(port, () => {
    console.log(`listening on port: ${port}`)
  })
// Step 3 code goes here
app.use(express.static(`${__dirname}/dist`))

// Step 4 code goes here
let nRequests = 0
app.get('/step4', (req, res) => {
  res.send(`this is request #${++nRequests}`)
})

// Step 5 code goes here
app.get('/step5', (req, res) => {
    res.send(`Hello, ${req.query.fname} ${req.query.lname}`)
  })

// Step 7 code goes here
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/step7', (req, res) => {
    // `bady-parser` stores parsed data in `req.body`
    // `bady-parser` 將解析好的資料存放在 `req.body`
    res.send(`Hello, ${req.body.fname} ${req.body.lname}`)
  })