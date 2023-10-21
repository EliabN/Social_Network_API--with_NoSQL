//Thought model
const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// The reactionSchema defines the schema of the sub-document
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            unique: true,
            maxlength: 280
        },
        createdAt: {
            // Date created
            type: Date,
            default: () => new Date(+new Date() + 84 * 24 * 60 * 60 * 1000),
            default: Date.now,
        },
        userName: {
            type: String,
            required: true,
        },
        createdAt: {
            // Date created
            type: Date,
            default: () => new Date(+new Date() + 84 * 24 * 60 * 60 * 1000),
            default: Date.now,
        }
    }
);

// The thoughtSchema defines the schema of the parent document
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1,
        },
        createdAt: {
            // Date created
            type: Date,
            default: () => new Date(+new Date() + 84 * 24 * 60 * 60 * 1000),
            default: Date.now,
        },
        userName: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema]
    }
);

// Using mongoose.model() to create model
const Thought = model('thoughts', thoughtSchema);

Thought
    .create({ name: 'Reaction', reactions: reactionSchema })
    .then(data => console.log(data))
    .catch(err => console.log(err));

// A virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query.
reactionCount.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// Export
module.exports = Thought;