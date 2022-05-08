const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const saleSchema = new Schema({
  itemname: {type: String, required: true},
  description:{type: String, required: true},
  quantity:{type: Number, required: true},
  price:{type: Number, required: true},
  date:{type: Date, required: true}, 
  deleted:{type: Boolean}
}, {
  timestamps: true,
});

const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;