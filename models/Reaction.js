//Reaction model
const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Schema to create Reaction model
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

// A virtual called `reactionCount` that retrieves the length of the reaction's `reactions` array field on query.
reactionCount.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// 
// Create a virtual property `fullName` The `reaction` field's subdocument schema in the `Thought` model.
userSchema
const reaction = model('reaction', reactionSchema);

module.exports = reaction;