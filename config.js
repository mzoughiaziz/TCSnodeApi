const mysql =require('mysql');
const bodyParser= require('body-parser');
const express =require('express');
const app = express();


app.use(bodyParser.json())
const mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'node_api',
    multipleStatements:true
 });

 try{
   mysqlConnection.connect((err)=>{
      if(!err){
         console.log("Database connection Succeded !")
      }else {
         console.log("failed to connect to Database  ");
      }
   })
 }catch(e){
    console.log("error catched !")
 }
 
 module.exports=mysqlConnection