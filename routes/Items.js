const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const Item = require('../models/Item');

//route middleware
const router = express.Router();

// save item

router.post('/item/save',(req,res)=>{
    let newItem = new Item(req.body);
    newItem.save((err) => {
        if(err){
            return res.status(400).json({
                error:err
            })
        }
        return res.status(200).json({
            success:"Item Saved Successfully"
        });
    });
});

//get item

router.get('/item',(req,res) => {
    Item.find().exec((err,Item) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingItem:Item
        });
    });
});

// get a specific Item

router.get("/item/:id",(req,res) =>{
    let postId = req.params.id;

    Item.findById(postId,(err,post)=>{
        if(err){
            return res.status(400).json({success:false,err});
        }

        return res.status(200).json({
            success:true,
            post
        });
    });
});

//update item
router.put('/item/update/:id',(req,res)=>{
    Item.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,post)=>{
            if(err){
                res.status(400).json({error:err});
            }

            return res.status(200).json({
                success:"Update Item Successfully"
            });
        }
    );
});

//delete item

router.delete('/item/delete/:id',(req,res) =>{
    Item.findByIdAndRemove(req.params.id).exec((err,deleteItem) =>{

        if(err) return res.status(400).json({
            message:"Delete Item Unsuccessful",err
        });
        return res.json({
            message:"Delete Item Successfull",deleteItem
        });
    });
});


module.exports = router;