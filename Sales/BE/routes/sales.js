const router = require('express').Router();
let Sale = require('../models/sale.model');
const db = require("../models/db");
let moment = require('moment');
var ObjectId = require('mongodb').ObjectId;
const saleCollection = "sales";

// router.route('/').get((req, res) => {
//   Sale.find()
//     .then(sales => res.json(sales))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

router.post('/add', (req, res) => {

    // Payload from the request
    let data = req.body;

    let newPayment = new Sale();
    newPayment.itemname = data.itemname;
    newPayment.description = data.description;
    newPayment.quantity = data.quantity;
    newPayment.price = data.price;
    newPayment.date = data.date;
    newPayment.deleted = false;
    newPayment.timestamp = moment().utc(false);

    // Inserting into DB
    db.getDB().collection(saleCollection).insertOne(newPayment, (err, result) => {
        if (err) {
            return res.status(500).json({
                success: true,
                message: "failed to insert document to DB",
                document: null,
                messageDetails: err
            });
        }
        else
            return res.status(201).json({
                success: true,
                message: "successfully inserted document to DB",
                messageDetails: "no error"
            });
    });
});

router.get('/sales', (req, res) => {

    db.getDB().collection(saleCollection).find().toArray((err, result) => {
        if (err) {
            res.status(404).json({
                success: false,
                message: "failed to find documents in DB",
                document: null,
                messageDetails: err
            });
        }
        else {
            if (result && result.length != 0) {

                let items = result;
                items = items.filter(res => {
                    return !res.deleted;
                });

                res.status(200).json({
                    success: true,
                    message: "successfully retrieved the documents from DB",
                    document: items,
                    messageDetails: "no error"
                });

            } else {
                res.status(404).json({
                    success: false,
                    message: "failed to find documents in DB",
                    document: null,
                    messageDetails: err
                });
            }
        }
    });
});

router.post('/saleUpdate', (req, res) => {

    // Payload from the request
    let data = req.body;
    if (!data || !data._id) {
        return res.status(400).send({ error: true, errorMessage: "cannot find sales id" });
    }

    db.getDB().collection(saleCollection).find({ "_id": ObjectId(data._id) }).toArray((err, result) => {
        if (err) {
            return res.status(404).json({
                success: false,
                message: "failed to find document in DB",
                document: null,
                messageDetails: err
            });
        }
        else {
            if (result) {

                updateSale = result[0];
                if (updateSale.deleted == true) {
                    return res.status(400).json({
                        success: false,
                        message: "failed to update. Object is flagged as deleted in DB",
                        document: null,
                        messageDetails: err
                    });
                } else {
                    updateSale.itemname = data.itemname;
                    updateSale.description = data.description;
                    updateSale.quantity = data.quantity;
                    updateSale.price = data.price;
                    updateSale.date = data.date;
                    updateSale.deleted = false;
                    updateSale.timestamp = moment().utc(false).toDate();

                    // Inserting into DB
                    db.getDB().collection(saleCollection).updateOne({ "_id": ObjectId(data._id) }, { $set: updateSale }, { upsert: true }, (err, result) => {
                        if (err) {
                            return res.status(500).json({
                                success: true,
                                message: "failed to insert document to DB",
                                document: null,
                                messageDetails: err
                            });
                        }
                        else
                            return res.status(200).json({
                                success: true,
                                message: "successfully updated document in DB",
                                messageDetails: "no error"
                            });
                    });
                }

            } else {
                console.log("cannot find existing result ind DB");
                res.status(404).json({
                    success: false,
                    message: "failed to find document in DB",
                    document: null,
                    messageDetails: err
                });
            }

        }

    });
});


router.get('/saleById', (req, res) => {

    // Payload from the request
    let id = req.query["_id"];
    if (!id) {
        return res.status(400).send({ error: true, errorMessage: "cannot find sales id" });
    }

    db.getDB().collection(saleCollection).find({ "_id": ObjectId(id) }).toArray((err, result) => {
        if (err) {
            return res.status(404).json({
                success: false,
                message: "failed to find document in DB",
                document: null,
                messageDetails: err
            });
        }
        else {
            if (result) {
                updateSale = result[0];
                if (updateSale.deleted == true) {
                    return res.status(400).json({
                        success: false,
                        message: "failed to update. Object is flagged as deleted in DB",
                        document: null,
                        messageDetails: err
                    });
                } else {
                    return res.status(200).json({
                        success: true,
                        message: "successfully updated document in DB",
                        document: result[0],
                        messageDetails: "no error"
                    });
                }
            } else {
                console.log("cannot find existing result ind DB");
                res.status(404).json({
                    success: false,
                    message: "failed to find document in DB",
                    document: null,
                    messageDetails: err
                });
            }

        }

    });
});

router.post('/saleDelete', (req, res) => {

    // Payload from the request
    let data = req.body;
    if (!data || !data._id) {
        return res.status(400).send({ error: true, errorMessage: "cannot find sales id" });
    }

    db.getDB().collection(saleCollection).find({ "_id": ObjectId(data._id) }).toArray((err, result) => {
        if (err) {
            return res.status(404).json({
                success: false,
                message: "failed to find document in DB",
                document: null,
                messageDetails: err
            });
        }
        else {
            if (result) {

                updateSale = result[0];
                if (updateSale.deleted == true) {
                    return res.status(400).json({
                        success: false,
                        message: "failed to update. Object is flagged as deleted in DB",
                        document: null,
                        messageDetails: err
                    });
                } else {
                    if (data.deleted && data.deleted !== "") {
                        updateSale.deleted = data.deleted;
                    }
                    updateSale.timestamp = moment().utc(false);

                    // Inserting into DB
                    db.getDB().collection(saleCollection).updateOne({ "_id": ObjectId(data._id) }, { $set: updateSale }, { upsert: true }, (err, result) => {
                        if (err) {
                            return res.status(500).json({
                                success: true,
                                message: "failed to insert document to DB",
                                document: null,
                                messageDetails: err
                            });
                        }
                        else
                            return res.status(200).json({
                                success: true,
                                message: "successfully updated document in DB",
                                messageDetails: "no error"
                            });
                    });
                }

            } else {
                console.log("cannot find existing result ind DB");
                res.status(404).json({
                    success: false,
                    message: "failed to find document in DB",
                    document: null,
                    messageDetails: err
                });
            }

        }

    });
});

router.post('/undoSale', (req, res) => {

    // Payload from the request
    let data = req.body;
    if (!data || !data._id) {
        return res.status(400).send({ error: true, errorMessage: "cannot find sales id" });
    }

    db.getDB().collection(saleCollection).find({ "_id": ObjectId(data._id) }).toArray((err, result) => {
        if (err) {
            return res.status(404).json({
                success: false,
                message: "failed to find document in DB",
                document: null,
                messageDetails: err
            });
        }
        else {
            if (result) {

                updateSale = result[0];
                updateSale.deleted = data.deleted;
                updateSale.timestamp = moment().utc(false);

                // Inserting into DB
                db.getDB().collection(saleCollection).updateOne({ "_id": ObjectId(data._id) }, { $set: updateSale }, { upsert: true }, (err, result) => {
                    if (err) {
                        return res.status(500).json({
                            success: true,
                            message: "failed to insert document to DB",
                            document: null,
                            messageDetails: err
                        });
                    }
                    else
                        return res.status(200).json({
                            success: true,
                            message: "successfully updated document in DB",
                            messageDetails: "no error"
                        });
                });

            } else {
                console.log("cannot find existing result ind DB");
                res.status(404).json({
                    success: false,
                    message: "failed to find document in DB",
                    document: null,
                    messageDetails: err
                });
            }

        }

    });
});




router.route('/:id').get((req, res) => {
    Sale.findById(req.params.id)
        .then(sale => res.json(sale))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Sale.findByIdAndDelete(req.params.id)
        .then(() => res.json('sale deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Sale.findById(req.params.id)
        .then(sale => {
            sale.itemname = req.body.itemname;
            sale.description = req.body.description;
            sale.quantity = Number(req.body.quantity);
            sale.price = Number(req.body.price);
            sale.date = Date.parse(req.body.date);

            sale.save()
                .then(() => res.json('Exercise updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;