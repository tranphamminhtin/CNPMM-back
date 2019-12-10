var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChiTietDonHangSchema = new Schema({
    orderId: { type: String, required: true },
    productId: { type: String, required: true },
    size: { type: Number, required: true },
    amount: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true },
});
// return the model
module.exports = mongoose.model('ChiTietDonHang', ChiTietDonHangSchema);