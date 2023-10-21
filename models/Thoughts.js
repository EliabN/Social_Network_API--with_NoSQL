//Thoughts model
const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reactions');

// Schema to create User model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            unique: true,
            maxlength: 280,
            minlength: 1,
        },
        createdAt: {
            // Date created
            type: Date,
            default: () => new Date(+new Date() + 84 * 24 * 60 * 60 * 1000),
            default: Date.now,
        },
        userName: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
            },
        ],
        reactions: [reactionSchema]
    }
);

// A virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query.
reactionCount.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });

const Thoughts = model('thoughts', thoughtSchema);

module.exports = Thoughts;