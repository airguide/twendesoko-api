/**
 * Created by vhn on 13/02/2017.
 */

var mongoose    = require('mongoose');
var bcrypt      = require('bcrypt-nodejs');
var Schema      = mongoose.Schema;

var BuyerSchema = new Schema({
    username        : { type: String, required: true, index: { unique: true }},
    password        : { type: String, required: true, select: false },
    firstName       : String,
    lastName        : String,
    dateCreated     : Date,
    billingDate     : Date
});

// Hash passwords
BuyerSchema.pre('save', function (next) {
   var Buyer = this;

   // Hash if new user OR password has been changed
    if(!Buyer.isModified('password'))
        return next();

    // Generate the HASH
    bcrypt.hash(Buyer.password, null, null, function (err, hash) {
        if (err)
            return next(err);
        Buyer.password = hash;

        next();
    })
});

// Match the password
BuyerSchema.methods.comparePassword = function (password) {
    var Buyer = this;
    return bcrypt.compareSync(password, Buyer.password);
};

module.exports = mongoose.model('Buyers', BuyerSchema);
