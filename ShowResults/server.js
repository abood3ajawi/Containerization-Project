const express = require('express');
const bodyParser = require('body-parser');
var request = require('request');
const {MongoClient} = require('mongodb');
const app = express();

var database

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
function notificationToAnalyticsServer(){
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
app.get('/',async (req, res) => {
  
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
     {
      database.collection('grades').find({}).toArray((error,result)=>{
        if( error )throw error
         res.send(result)
      })
    }
     else
     res.sendFile(__dirname + "/index.html");
  });



  app.listen(5000,() =>{
    console.log('Server started on port 5000...');
    MongoClient.connect('mongodb://10.2.0.3:27017',{useNewUrlParser:true},(error,result)=>{
        if(error) throw error
        database =result.db('mydb')
        console.log("connection sucessful!")
    })
  });