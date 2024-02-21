var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

mongoose.connect("mongodb://localhost:27017/Database_reg_form");
var db = mongoose.connection;
db.on("error", () =>
  HTMLFormControlsCollection.log("error in connecting to database :(.")
);
db.once("open", () => console.log("connected to database successfully :)."));
app.post("/sign_up",(req,res)=>{
    var name = req.body.name ;
    var age = req.body.age ;
    var email = req.body.email ;
    var phno = req.body.phno ;
    var password = req.body.password ;

    var data = {
        "name" : name ,
        "age" : age ,
        "email" : email ,
        "phno" : phno ,
        "password" : password 
    }
    db.collection("users").insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully")
    })
    return res.redirect("signup_success.html");
})

app.get("/", (req, res) => {
  res.set({
    "Access-Control-Allow-Origin": "*",
  })
  return res.redirect("index.html");
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
