var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SanPhamSchema = new Schema({
    name: { type: String, required: true },
    color: { type: String },
    sex: { type: String },
    brand: { type: String },
    promotion: { type: Number, default: 0 },
    price: { type: Number, required: true },
    image: { type: String, },
    image2: { type: String, },
    image3: { type: String, },
    image4: { type: String, },
});
// return the model
module.exports = mongoose.model('SanPham', SanPhamSchema);