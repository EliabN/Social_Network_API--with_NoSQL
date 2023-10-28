// Thought Controller
// Import and Define Thought model
const Thought = require('../models/Thought');
const User = require('../models/User');

// Module to be exported with CRUD functions for thoughtSchema
module.exports = {
    // Get all thoughts
    async getThoughts(rep, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err)
        }
    },

    // GET one thought by id
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // POST create a new thought
    async createThought(req, res) {
        console.log(req.body)
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thought._id } },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({
                    message: 'Thought created, but found no user with that ID',
                });
            }

            res.json('Created the thought');
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // PUT update thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // DELETE delete thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }

            const user = await User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
            );

            res.json({ message: 'Thought successfully deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Add a thought reaction
    async addThoughtReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Remove thought reaction
    async removeThoughtReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            )

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }

            // const removedReaction = thought.reactions.find(
            //     (reaction) => reaction.reactionId.toString() === req.params.reactionId
            // );

            // if (!removedReaction) {
            //     return res.status(404).json({ message: 'No reaction with this id!' });
            // }

            // res.json({ message: 'Reaction deleted', updatedThought: thought, removedReaction });


            res.json({ thought, message: 'Reaction deleted' });
            //res.json();
        } catch (err) {
            res.status(500).json(err);
        }
    },
}
