const { Schema, model } = require('mongoose');
const format = require('date-fns/format');
const Thought = require('./Thought');
const Reaction = require('./Reaction');

// Schema to create Post model
const thoughtSchema = new Schema(
  {
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [Reaction],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema
  .virtual('formatTimeStamp')
  .get(function () {
    return format(this.createdAt, 'MM dd yy');
});

const Thought = mongoose.model('thought', thoughtSchema);

module.exports = Thought;
