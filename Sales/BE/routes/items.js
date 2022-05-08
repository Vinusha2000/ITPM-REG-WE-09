const router = require('express').Router();
const db = require("../models/db");
let Item = require('../models/item.model');

const itemCollection = "lists";

router.get('/lists',(req,res)=>{

    db.getDB().collection(itemCollection).find().toArray((err,result)=>{
        if(err){
            res.status(404).json({
                success : false,
                message : "failed to find documents in DB",
                document : null,
                messageDetails : err
            });
        }
        else{
            if(result && result.length != 0){

                let items = result;
                items = items.filter( res => {
                    return !res.deleted;
                });

                res.status(200).json({
                    success : true,
                    message : "successfully retrieved the documents from DB",
                    document : items,
                    messageDetails : "no error"
                });

            }else{
                res.status(404).json({
                    success : false,
                    message : "failed to find documents in DB",
                    document : null,
                    messageDetails : err
                });
            }
        }
    });
});


module.exports = router;