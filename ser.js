#!/usr/bin/env node
const { request } = require('express')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 18787
app.get('/', (req, res) => {
    res.send('ok')
})
app.listen(port, () => {
    console.log(`listening on port: ${port}`)
})
app.use(express.static(`${__dirname}`))
app.use(bodyParser.urlencoded({
    extended:false
}))
app.use(bodyParser.json())
app.post('/post',(req,res)=>{
    res.send(`response ${req.body.stu_id} ${req.body}`)
})