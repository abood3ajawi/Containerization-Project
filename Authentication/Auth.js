const express = require('express');
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/",(req,res)=>{
    res.send("Welcome")
})

app.post("/Auth", (req, res) => {
    const responseData = {auth:false}
    console.log(req.body.yourname)
    if(req.body.yourname == "admin" && req.body.pass == "flag" )
    responseData.auth=true;
    const jsonContent = JSON.stringify(responseData);
    res.end(jsonContent);
  });



app.listen(3000,() =>{

    console.log('Server started on port 4000...');
  
  });