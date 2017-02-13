/**
 * Created by vhn on 13/02/2017.
 */

var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var ProductSchema = new Schema({
    sku         : {type: String, required: true, index: {unique: true} },
    name        : String,
    picture     : { data: Buffer, ContentType: String },
    type        : String,
    units       : String,
    unitPrice   : String,
    price       : String
});

module.exports = mongoose.model('Products', ProductSchema);