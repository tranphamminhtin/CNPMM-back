var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DonHangSchema = new Schema({
    date: { type: Date, default: Date.now() },
    username: { type: String, required: true },
    price: { type: Number },
    state: { type: String, required: true },
});
// return the model
module.exports = mongoose.model('DonHang', DonHangSchema);