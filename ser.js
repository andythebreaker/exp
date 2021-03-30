#!/usr/bin/env node
//data
const filename_stu = "./students.json"

//include
const { request } = require('express')
const express = require('express')
var tableify = require('tableify');
const JsonFind = require("json-find");
const bodyParser = require('body-parser')
const multer = require('multer')
var stripchar = require('stripchar').StripChar;
var time = require('time');
var ta = require('time-ago')  // node.js

//host
const app = express()
const port = 18787

//glob.
var nowtime = new time.Date();
var last_time = nowtime.toString();

//app
app.get('/', (req, res) => {
    res.send('ok')
})
app.listen(port, () => {
    console.log(`listening on port: ${port}`)
})
app.use(express.static(`${__dirname}`))
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
app.post('/post', (req, res) => {
    res.send(`response ${req.body.stu_id} ${req.body}`)
})
app.post('/tableify_all_stu', (req, res) => {
    // Read the file and print its contents.
    var fs = require('fs');
    fs.readFile(filename_stu, 'utf8', function (err, data) {
        if (err) {
            res.send(`error 403`);
            throw err;
        } else {
            console.log('OK: ' + filename_stu);
            console.log(data);
            var stuff_to_send_to_cli = tableify(JSON.parse(data));
            console.log(stuff_to_send_to_cli);
            res.send(stuff_to_send_to_cli);
        }
    });
})

app.post('/post_find_stu', (req, res) => {
    // Read the file and print its contents.
    var fs = require('fs');
    fs.readFile(filename_stu, 'utf8', function (err, data) {
        if (err) {
            res.send(`error 403`);
            throw err;
        } else {
            console.log('fetch: ' + filename_stu);
            var usr_input = String(req.body.stu_id);
            var res_inp = stripchar.RSExceptUnsAlpNum(usr_input);
            //console.log('find: ' + usr_input + " " + res_inp);
            //console.log(data);
            var stu_find_doc;
            try {
                stu_find_doc = JsonFind(JSON.parse(data));
                if (stu_find_doc.checkKey(res_inp) == false) {
                    res.send(`can't find student`);

                } else {
                    res.send(stu_find_doc.checkKey(res_inp));
                }
            } catch (error) {
                console.log("ERROR@JsonFind.......");
                res.send(`error 403`);
            }
        }
    });
})

app.post('/post_add_stu', (req, res) => {
    console.log("post_add_stu");
    // Read the file and print its contents.
    var fs = require('fs');
    fs.readFile(filename_stu, 'utf8', function (err, data) {
        if (err) {
            res.send(`error 403`);
            throw err;
        } else {
            console.log('fetch: ' + filename_stu);
            var usr_input_id = String(req.body.stu_id);
            var res_inp_id = stripchar.RSExceptUnsAlpNum(usr_input_id);
            var usr_input_name = String(req.body.stu_name);
            var res_inp_name = stripchar.RSExceptUnsAlpNum(usr_input_name);
            var stu_find_doc;
            /*try {*/
            var data_json = JSON.parse(data)
            stu_find_doc = JsonFind(data_json);
            console.log("json ED");
            if (stu_find_doc.checkKey(usr_input_id) == false) {
                data_json[res_inp_id] = res_inp_name; //add some data
                json_back = JSON.stringify(data_json); //convert it back to json
                fs.writeFile(filename_stu, json_back, 'utf8', function (parms_call_back_fucn) {
                    //nomove
                }); // write it back
                res.send(`添加資料...`);
            } else {
                //res.send(stu_find_doc.checkKey(res_inp));
                console.log("user input error @ Added an existing data ......");
                res.send("已經存在這筆資料");
            }
            /*} catch (error) {
                console.log("ERROR@JsonFind.......");
                res.send(`error 403`);
            }*/
        }
    });
})

app.post('/post_rm_stu', (req, res) => {
    console.log("post_rm_stu");
    // Read the file and print its contents.
    var fs = require('fs');
    fs.readFile(filename_stu, 'utf8', function (err, data) {
        if (err) {
            res.send(`error 403`);
            throw err;
        } else {
            console.log('fetch: ' + filename_stu);
            var usr_input_id = String(req.body.stu_id);
            var res_inp_id = stripchar.RSExceptUnsAlpNum(usr_input_id);
            var stu_find_doc;
            /*try {*/
            var data_json = JSON.parse(data)
            stu_find_doc = JsonFind(data_json);
            console.log("json ED");
            if (stu_find_doc.checkKey(usr_input_id) == false) {
                console.log("user input error @ RM! an UNexist data ......");
                res.send("不存在這筆資料");
            } else {
                delete data_json[res_inp_id];
                json_back = JSON.stringify(data_json); //convert it back to json
                fs.writeFile(filename_stu, json_back, 'utf8', function (parms_call_back_fucn) {
                    //nomove
                }); // write it back
                res.send(`添加資料...`);
            }
            /*} catch (error) {
                console.log("ERROR@JsonFind.......");
                res.send(`error 403`);
            }*/
        }
    });
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './audio/public');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.mp3');
    }
})

var upload = multer({ storage: storage })

app.post('/upload', upload.single("audio"), function (req, res, next) {
    //檔案路徑
    var audio_up = req.file.path;
    //res.render('index', { title : 'Express' ,image:image});
    res.status(200).send();
    nowtime = new time.Date();
    console.log(nowtime.toString());
    last_time = nowtime.toString();
});

app.post('/audio/last_time_up', (req, res) => {
    //console.log(ta.ago(last_time));
    res.send(ta.ago(last_time));
})