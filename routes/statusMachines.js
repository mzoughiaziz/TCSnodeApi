const express =require('express');
const router=express.Router();
const db =require('../config');
const bodyparser=require('body-parser');
const jsonParser = bodyparser.json()

    
    
router.get('/:codeStat', (req, res) => {
    db.query("SELECT codeStat FROM statusMachines where codeStat = ?"
      , req.params.codeStatus, (err, rows, fields) => {
 
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
    db.query("SELECT statusMachines.codeStat FROM statusMachines ;", (err, rows, fields) => {
 
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


 router.post('/', jsonParser, (req, res) => {
   let ins = req.body
       console.log(ins);
      db.query(`INSERT INTO statusMachines (name) VALUE (?) ;`, ins.codeStat

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
              console.log(err)
            }
         })
});

router.delete('/:name', (req, res) => {
   db.query(`DELETE FROM statusMachines  WHERE name = ?;`, req.params.codeStatus, (err, rows, fields) => {
         if (rows.affectedRows == 0) {
            res.send({
               "error": 1
            })
         } else if (rows.affectedRows == 1) {
            res.send({
               "message": "status was deleted"
            })
         }
   })

});

router.put('/:oldCode/:newCode', (req, res) => {
   db.query(`update statusMachines  set codeStat=?  WHERE codeStat =? ;`,[req.params.newCode,req.params.oldCode] , (err, rows, fields) => {
         if (rows.affectedRows == 0) {
            res.send({
               "error": 1 
            })
         } else if (rows.affectedRows == 1) {
            res.send({
               "message": "status was updated"
            })
         }
   })

});

 
 
 module.exports=router;   