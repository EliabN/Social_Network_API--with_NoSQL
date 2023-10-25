// Using express package
const router = require('express').Router();
// connect userRoutes
const userRoutes = require('./userRoutes');
// connect thoughtRoutes
const thoughtRoutes = require('./thoughtRoutes')

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;
