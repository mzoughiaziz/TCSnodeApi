const express = require('express');
const router=express.Router();
const db =require('../config');
const bodyparser=require('body-parser');
const jsonParser = bodyparser.json()


router.get('/:name', (req, res) => {
    db.query("SELECT machines.name FROM machines where name = ?"
      , req.params.name, (err, rows, fields) => {
 
       if (!err) {
            console.log("error founded !")
          res.send(rows)
       } else {
        console.log("success !")
          res.status(404).send({
             "error": 0
          });
          console.log(err)
       }
    })
 });



 router.get('/', (req, res) => {
    db.query("SELECT machines.name FROM machines ;", (err, rows, fields) => {
 
       if (!err) {
            console.log("error founded !")
          res.send(rows)
       } else {
        console.log("success !")
          res.status(404).send({
             "error": 0
          });
          //console.log(err)
       }
    })
 });


 router.post('/', jsonParser, (req, res) => {
   let ins = req.body
       console.log(ins);
      db.query(`INSERT INTO machines (name) VALUE (?) ;`, ins.name

 , (err, rows, fields) => {
            console.log(err);
            if (!err) {
               res.send(rows)
            } else if (err.errno == 1062) {
               res.status(404).send({
                  "error": 2
               });
            } else {
               res.status(404).send({
                  "error": 0
               });
              // console.log(err)
            }
         })
});

router.delete('/:name', (req, res) => {
   db.query(`DELETE FROM machines  WHERE name = ?;`, req.params.name, (err, rows, fields) => {
         if (rows.affectedRows == 0) {
            res.send({
               "error": 1
            })
         } else if (rows.affectedRows == 1) {
            res.send({
               "message": "machine a été supprimer"
            })
         }
   })

});

router.put('/:oldName/:newName', (req, res) => {
   db.query(`update machines  set name=?  WHERE name =? ;`,[req.params.newName,req.params.oldName] , (err, rows, fields) => {
         if (rows.affectedRows == 0) {
            res.send({
               "error": 1 
            })
         } else if (rows.affectedRows == 1) {
            res.send({
               "message": "machine a été modifier"
            })
         }
   })

});


 
 module.exports=router;