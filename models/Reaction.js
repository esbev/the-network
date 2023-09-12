const { Schema, Types } = require('mongoose');
const format = require('date-fns/format');
const Reaction = require('./Reaction');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

reactionSchema
  .virtual('formatTimeStamp')
  .get(function () {
    return format(this.createdAt, 'MM dd yy');
  });

const Reaction = mongoose.model('reaction', reactionSchema);

module.exports = Reaction;