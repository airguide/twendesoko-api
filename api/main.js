/**
 * Created by vhn on 12/02/2017.
 */

var buyers      = require('./buyers');
var sellers     = require('./sellers');
var products    = require('./products');

module.exports = function (app, express) {
    var mainAPIRouter = express.Router();
    
    mainAPIRouter.get('/', function (req, res) {
        res.json({ success: true, message: 'Connectect to Twende Soko API'});
    });

    // Buyers API
    app.use('/buyers', buyers);

    // Sellers API
    app.use('/sellers', sellers);

    // products API
    app.use('/products', products);

    return mainAPIRouter;
};