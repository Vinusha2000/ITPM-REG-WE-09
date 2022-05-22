//http request for crud

const express = require("express");
const Leaves = require("../models/leaves");

const router = express.Router();

//save posts (path/url (call back func) => )   -->> CREATE
router.post("/leave/save", (req, res) => {
  let newLeave = new Leaves(req.body);

  //save
  newLeave.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    //if no error to save this
    //key and value
    return res.status(200).json({
      success: "Leave saved successfully",
    });
  });
});

//get posts     -----> READ

router.get("/leaves", (req, res) => {
  Leaves.find().exec((err, leaves) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }

    return res.status(200).json({
      success: true,
      existingLeaves: leaves,
    });
  });
});

// //get a specific post
router.get("/postLeave/:id", (req, res) => {
  let leaveId = req.params.id;

  Leaves.findById(leaveId, (err, leave) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    return res.status(200).json({
      success: true,
      leave,
    });
  });
});

//update posts      ----> UPDATE

router.put("/leave/update/:id", (req, res) => {
  Leaves.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, leave) => {
      if (err) {
        return res.status(400).json({ error: err });
      }

      return res.status(200).json({
        success: "Updated Successfully",
      });
    }
  );
});

//delete posts      -----> DELETE

router.delete("/leave/delete/:id", (req, res) => {
  Leaves.findByIdAndRemove(req.params.id).exec((err, deletedLeave) => {
    if (err)
      return res.status(400).json({
        message: "Delete unsuccessful",
        err,
      });

    return res.json({
      message: "Delete Successful",
      deletedLeave,
    });
  });
});

//export above details
module.exports = router;
