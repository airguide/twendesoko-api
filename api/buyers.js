/**
 * Created by vhn on 12/02/2017.
 */

var express     = require('express');
var router      = express.Router();
var Buyers      = require('../models/buyers');

/* GET users listing. */
router.get('/', function(req, res) {
    Buyers.find({}, function (err, buyers) {
        if (err)
            res.json({ success: false, message: err });
        res.json(buyers);
    })
});

// Get a buyer
router.get('/:buyers_id', function (req, res) {
   Buyers.findById(req.params.buyers_id, function (err, buyer) {
       if (err) res.send(err);
       res.json(buyer);
   })
});

/* POST */
// Add a new Buyer
router.post('/',function (req, res) {

    var buyer = new Buyers();

    buyer.username          = req.body.username;
    buyer.password          = req.body.password;
    buyer.firstName         = req.body.firstName;
    buyer.lastName          = req.body.lastName;
    buyer.dateCreated       = req.body.dateCreated;
    buyer.billingDate       = req.body.billingDate;

    buyer.save( function (err) {
        if (err) {
            // duplicate Entry
            if (err.code == 11000 )
                return res.json({ success: false, message: 'Username already exists'});
            else
                return res.json({ success: false, message: err})
        }

        // Success
        res.json( { success: true, username     : buyer.username,
                                   password     : buyer.password,
                                   firstName    : buyer.firstName,
                                   lastName     : buyer.lastName,
                                   dateCreated  : buyer.dateCreated,
                                   billingDate  : buyer.billingDate} )
    })
});


// Update User
router.put('/:buyers_id', function (req, res) {
   Buyers.findById(req.params.buyers_id, function (err, buyer) {
       if (err) res.send(err);

       if (req.body.username)       buyer.username      = req.body.username;
       if (req.body.password)       buyer.password      = req.body.password;
       if (req.body.firstName)      buyer.firstName     = req.body.firstName;
       if (req.body.lastName)       buyer.lastName      = req.body.lastName;
       if (req.body.dateCreated)    buyer.dateCreated   = req.body.dateCreated;
       if (req.body.billingDate)    buyer.billingDate   = req.body.billingDate;
       // Save
       buyer.save(function (err) {
           if (err) res.send(err);

           //return
           res.json({message: 'record updated'});
       })
   })
});

// Delete a buyer
router.delete('/:buyers_id', function (req, res) {
   Buyers.remove({ _id: req.params.buyers_id }, function (err, buyer) {
       if (err) res.send(err);
       res.json({ message: 'Successfully deleted' });
   })
});

module.exports = router;
