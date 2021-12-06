var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var cors = require('cors');
const { response } = require('express');
const { query } = require('@angular/animations');

//configuring Api 

var app = express();

//configuration bodyparser

app.use(bodyParser.urlencoded({

    extended:true

}));

app.use(bodyParser.json());

//configuration cors

app.use(cors());

//database create 

var con = mysql.createConnection({
    user:"root",
    password: "",
    database:"task",
    host:"localhost"
})

//check connection of database

con.connect(function(err, result){
    if(!err){
        console.log("connected to mysql");
    }else{
        console.log("check database connection");
    }
})


//create Api Reguest

// app.post("/product", function(req, res){


//         var name = req.body.name;
//         var descip = req.body.description;


//    var q = "select *from crudoperation where name ='"+name+"' and description='"+descip+"'";
//     console.log(q)
//    con.query(q, function(e, r){
//        if(!e && r && r.length>0){
//            console.log(JSON.stringify(r))
//            console.log("record fetch");
//            res.json({
//                success:true 
        
//            })
//        }else{
//            console.log("record not fetch");
//            res.status(400).json({success:false})
//        }
//    })

// })

app.post("/server/products", function(req, res){

    var data = {
        id:req.body.id,
        name:req.body.name,
        description:req.body.description,
        
    };

    con.query("insert into crudoperation SET?", data, function(err){
        if(!err){
            console.log("Record inserted");
           res.json({
               message:"sucess"
           })
        }else{
            console.log("record fail");
         
           res.json({
            message:"error"
        })
        }
    })



})

app.get("/server/products", function(req, res){
    con.query("select *from crudoperation", function(err, result){
        if(!err) {
          
           res.json(result);
        }else {
            res.json(err);
            console.log("error hai")
        }
    })
})


app.delete("/server/products", function(req, res){
    var id =  req.query.id;
    if(id){
        var q = "delete from crudoperation where id = '"+id+"'";
    }else {
        var q = "delete from crudoperation";
    }
    
    con.query(q, function(e, r){
        if(!e){
            res.send(r);
            console.log("deleted 1 row")
        }else {
            res.send(e);
        }
    })
})


app.get("/server/products/:id", function(req, res){
    var ReadId = req.params.id;
    var q = "select *from crudoperation where id ='"+ReadId+"'";
    con.query(q, function(e, r){
        if(!e) {
            res.json(r);
            console.log(r);
        }else {
            res.json(e);
            console.log("error hai");
        }
    })
})

app.put("/server/products/:id", function(req, res){
    var id = req.body.id;
    var name = req.body.name;
   var descript = req.body.description;
   var q = "UPDATE `crudoperation` SET `name`='"+name+"',`description`='"+descript+"' WHERE id='"+id+"'";
   con.query(q, function(e, r){
       if(!e){
           res.send(r);
           console.log("updated record");
       }else {
        res.send(e);
        console.log("not update");
       }
   })
})


app.delete("/server/products/:id", function(req, res){
    var id =  req.query.id;
    
        var q = "delete from crudoperation where id = '"+id+"'";
    
    con.query(q, function(e, r){
        if(!e){
            res.send(r);
            console.log("deleted 1 row")
        }else {
            res.send(e);
        }
    })
})

app.listen(2021);
console.log("server Started: http//127.0.0.1:2021"); 