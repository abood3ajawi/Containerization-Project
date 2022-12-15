const express = require('express');
const bodyParser = require('body-parser');
var request = require('request');
var connection = require('./db')
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname));

function do_POST( bodyr ){
  var options = {
    url: "http://10.2.0.2:3000/Auth",
    method: "POST",
    json: true,  
    body: bodyr
  };
  return new Promise((resolve,reject)=>{
    request( options, function(err, response, body){
      if (err) reject(err);
      resolve(response.body);
  });
  }) 
}
async function notificationToAnalyticsServer(){
  var options = {
    url: "http://10.2.0.5:7000/",
    method: "GET",
  };
  return new Promise((resolve,reject)=>{
    request( options, function(err, response, body){
      if (err) reject(err);
      resolve(response);
  });
  }) 
}

app.get('/',(req, res) => {

  res.sendFile(__dirname + "/index.html");
});
    
app.post("/", async(req, res) => {

    var myJSONObject = { 
      yourname :req.body.yourname,
      pass : req.body.pass
     };
    console.log(myJSONObject)
     var auth = await do_POST(myJSONObject);
       console.log(await auth);
   
     if(auth.auth)
     res.sendFile(__dirname + "/grades.html");
     else
     res.sendFile(__dirname + "/index.html");
});

app.post("/grades", async (req, res) => {
  var grades = {
    name: req.body.name,
    grade1: parseInt(req.body.grade1),
    grade2: parseInt(req.body.grade2),
    grade3: parseInt(req.body.grade3),
    grade4: parseInt(req.body.grade4),
    grade5: parseInt(req.body.grade5)
  }
  console.log(grades)
  connection.connect(async function (err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
    connection.query(`CREATE DATABASE IF NOT EXISTS todoDB`);
    let createTableGrades = `create table if not exists grades(
        name varchar(255) not null,
        grade1 int not null,
        grade2 int not null,
        grade3 int not null,
        grade4 int not null,
        grade5 int not null
    )`;

    connection.query(createTableGrades, function (err, results, fields) {
      if (err) {
        console.log(err.message);
      }
    });

    connection.changeUser({ database: 'todoDB' }, function (err) {if (err) throw err;});
    let sql = `INSERT INTO grades(name,grade1,grade2,grade3,grade4,grade5) VALUES('${grades.name}',${grades.grade1},${grades.grade2},${grades.grade3},${grades.grade4},${grades.grade5})`;
    connection.query(sql);
    });

  setTimeout(() => {
    await notificationToAnalyticsServer();  
  },10);
  
  res.sendFile(__dirname + "/grades.html");
});

app.listen(9000,() =>{
    console.log('Server started on port 9000...');
  });