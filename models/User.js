// User Model
const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
    {
        userName: {
            type: String,
            required: true,
            trimmed: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            trimmed: true,
            // Trim any leading or trailing whitespace from the email
            trim: true,
            lowercase: true,

            // Custom validation using a regular expression
            validate: {
                validator: function (value) {
                    // Regular expression for validating email addresses
                    const emailRegex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})/;

                    // Return value if the 'value' (email) matches the regular expression
                    return emailRegex.test(value);
                },
                // Error message to be displayed if not valid
                message: props => `${props.value} is not a valid email.`
            }
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'thought',
        }],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Virtual property `friendCount` that gets the amount of friend of the user
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
