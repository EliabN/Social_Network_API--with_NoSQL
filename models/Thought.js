// Import the 'Types' object from mongoose
const { Schema, model, Types } = require('mongoose');

// The reactionSchema defines the schema of the sub-document
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    createdAt: {
        // Date created
        type: Date,
        default: Date.now,
    },
    userName: {
        type: String,
        required: true,
    }
});

// The thoughtSchema defines the schema of the parent document
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        maxlength: 280,
        minlength: 1,
    },
    createdAt: {
        // Date created
        type: Date,
        default: Date.now,
    },
    userName: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema]
},
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    });

// A virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query.
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// Using mongoose.model() to create model
const Thought = model('thoughts', thoughtSchema);

module.exports = Thought;