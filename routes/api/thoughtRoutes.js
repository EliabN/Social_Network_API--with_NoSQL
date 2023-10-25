// thoughtRoutes
const router = require('express').Router();

// Import module (functions for Thought module)
const {
    getThoughts,
    getSingleThought,
    createThought, // Import a function for creating thoughts
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/')
    .get(getThoughts)
    .post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought)

module.exports = router;