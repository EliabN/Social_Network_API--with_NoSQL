// Using express package
const router = require('express').Router();
// connect userRoutes
const userRoutes = require('./userRoutes');

router.use('/users', userRoutes);

module.exports = router;
