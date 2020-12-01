
const jwt=require("jsonwebtoken")
const util = require('util')


module.exports=function verifyToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) { res.status(401).send({ "message": 20 })
    } else {
        try{
            
             const verifier=jwt.verify(token,"node_api")
             req.user=verifier
            next();
             }catch(err){
               res.status(401).send({
                "message": 20
             })
            }
    }
   
}

