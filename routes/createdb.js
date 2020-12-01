const express =require('express');
const router=express.Router();
const db =require('../config');
const bodyparser=require('body-parser');
var jsonParser = bodyparser.json()

router.get('/', (req, res) => {
    db.query("CREATE DATABASE node_api;", (err, rows, fields) => {
 
       if (!err) {
            console.log("error founded !")
            res.send('Database created...');
        } else {
        console.log("success !")
          res.status(404).send({
             "error": 0
          });
          //console.log(err)
       }
    })
 });

    
 module.exports=router;   