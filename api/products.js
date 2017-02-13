/**
 * Created by vhn on 12/02/2017.
 */

var express     = require('express');
var router      = express.Router();
var Products    = require('../models/products');

/* GET products listing. */
router.get('/', function(req, res) {
    Products.find({}, function (err, products) {
        if (err)
            res.json({ success: false, message: err });
        res.json(products);
    })
});

// Get a Product
router.get('/:products_id', function (req, res) {
    Products.findById(req.params.products_id, function (err, product) {
        if (err) res.send(err);
        res.json(product);
    })
});

/* POST */
// Update Product
router.put('/:products_id', function (req, res) {
    Products.findById(req.params.products_id, function (err, product) {
        if (err) res.send(err);

        if (req.body.sku)        product.sku        = req.body.sku;
        if (req.body.name)       product.name       = req.body.name;
        if (req.body.picture)    product.picture    = req.body.picture;
        if (req.body.units)      product.units      = req.body.units;
        if (req.body.unitPrice)  product.unitPrice  = req.body.unitPrice;
        if (req.body.price)      product.price      = req.body.price;

        // Save
        product.save(function (err) {
            if (err) res.send(err);

            //return
            res.json({message: 'record updated'});
        })
    })
});


// Add a new Product
router.post('/',function (req, res) {

    var product = new Products();

    product.sku         = req.body.sku;
    product.name        = req.body.name;
    product.picture     = req.body.picture;
    product.units       = req.body.units;
    product.unitPrice   = req.body.unitPrice;
    product.price       = req.body.price;

    product.save( function (err) {
        if (err) {
            // duplicate Entry
            if (err.code == 11000 )
                return res.json({ success: false, message: 'sku already exists'});
            else
                return res.json({ success: false, message: err})
        }

        // Success
        res.json( { success: true, sku     : product.sku,
            name         : product.name,
            picture      : product.picture,
            units        : product.units,
            unitPrice    : product.unitPrice,
            price        : product.price} )
    })
});

// Delete a product
router.delete('/:products_id', function (req, res) {
    Products.remove({ _id: req.params.products_id }, function (err, product) {
        if (err) res.send(err);
        res.json({ message: product.name + ' has been successfully deleted' });
    })
});

module.exports = router;