var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuyenSchema = new Schema({
    admin: { type: Boolean, default: false },
    client: { type: Boolean, default: false },
    product: { type: Boolean, default: false },
    order: { type: Boolean, default: false },
    description: { type: String, }
});
// return the model
module.exports = mongoose.model('Quyen', QuyenSchema);