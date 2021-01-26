const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  isTeacherReview: {
    type: Boolean,
    required: true
  },
  isCourseReview: {
    type: Boolean,
    required: true
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId
  },
  course: {
    type: mongoose.Schema.Types.ObjectId
  },
  metric1: {
    type: Number,
    get: v => Math.round(v),
    set: v => Math.round(v),
    alias: 'i',
    required: true
  },
  metric2: {
    type: Number,
    get: v => Math.round(v),
    set: v => Math.round(v),
    alias: 'i',
    required: true
  },
  metric3: {
    type: Number,
    get: v => Math.round(v),
    set: v => Math.round(v),
    alias: 'i',
    required: true
  },
  commentText: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  isAnonymous: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model("Review", reviewSchema);
