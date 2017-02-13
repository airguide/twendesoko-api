/**
 * Created by vhn on 13/02/2017.
 */

var express     = require('express');
var router      = express.Router();
var Sellers     = require('../models/sellers');

/* GET sellers listing. */
router.get('/', function(req, res) {
    Sellers.find({}, function (err, sellers) {
        if (err)
            res.json({ success: false, message: err });
        res.json(sellers);
    })
});

// Get a Seller
router.get('/:sellers_id', function (req, res) {
    Sellers.findById(req.params.sellers_id, function (err, seller) {
        if (err) res.send(err);
        res.json(seller);
    })
});

/* POST */
// Add a new Seller
router.post('/',function (req, res) {

    var seller = new Sellers();

    seller.username          = req.body.username;
    seller.password          = req.body.password;
    seller.agentName         = req.body.agentName;
    seller.firstName         = req.body.firstName;
    seller.lastName          = req.body.lastName;
    seller.dateCreated       = req.body.dateCreated;
    seller.billingDate       = req.body.billingDate;

    seller.save( function (err) {
        if (err) {
            // duplicate Entry
            if (err.code == 11000 )
                return res.json({ success: false, message: 'Username already exists'});
            else
                return res.json({ success: false, message: err})
        }

        // Success
        res.json( { success: true, username     : seller.username,
            password     : seller.password,
            firstName    : seller.firstName,
            lastName     : seller.lastName,
            agentName    : seller.agentName,
            dateCreated  : seller.dateCreated,
            billingDate  : seller.billingDate} )
    })
});


// Update Seller
router.put('/:sellers_id', function (req, res) {
    Sellers.findById(req.params.sellers_id, function (err, seller) {
        if (err) res.send(err);

        if (req.body.username)       seller.username      = req.body.username;
        if (req.body.password)       seller.password      = req.body.password;
        if (req.body.agentName)      seller.agentName     = req.body.agentName;
        if (req.body.firstName)      seller.firstName     = req.body.firstName;
        if (req.body.lastName)       seller.lastName      = req.body.lastName;
        if (req.body.dateCreated)    seller.dateCreated   = req.body.dateCreated;
        if (req.body.billingDate)    seller.billingDate   = req.body.billingDate;

        // Save
        seller.save(function (err) {
            if (err) res.send(err);

            //return
            res.json({message: 'record updated'});
        })
    })
});

// Delete a seller
router.delete('/:sellers_id', function (req, res) {
    Sellers.remove({ _id: req.params.sellers_id }, function (err, seller) {
        if (err) res.send(err);
        res.json({ message: seller.name + ' has been successfully deleted' });
    })
});

module.exports = router;