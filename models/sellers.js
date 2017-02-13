/**
 * Created by vhn on 13/02/2017.
 */

var mongoose    = require('mongoose');
var bcrypt      = require('bcrypt-nodejs');
var Schema      = mongoose.Schema;

var SellersSchema = new Schema({
    username        : { type: String, required: true, index: { unique: true }},
    password        : { type: String, required: true, select: false },
    agentName       : String,
    firstName       : String,
    lastName        : String,
    dateCreated     : Date,
    billingDate     : Date
});

// Hash passwords
SellersSchema.pre('save', function (next) {
    var Seller = this;

    // Hash if new user OR password has been changed
    if(!Seller.isModified('password'))
        return next();

    // Generate the HASH
    bcrypt.hash(Seller.password, null, null, function (err, hash) {
        if (err)
            return next(err);
        Seller.password = hash;

        next();
    })
});

// Match the password
SellersSchema.methods.comparePassword = function (password) {
    var Seller = this;
    return bcrypt.compareSync(password, Seller.password);
};

module.exports = mongoose.model('Sellers', SellersSchema);
