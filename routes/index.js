const router = require('express').Router();

const apiRoutes = require('./apiRoutes');


// /something was prepended to every route inside of here
// Prepend /api to all of the routes declared inside of apiRoutes


//  /api
router.use('/api', apiRoutes);

module.exports = router;
