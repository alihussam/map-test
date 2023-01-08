const mongoose = require('mongoose');
const { Constants: { CollectionNames } } = require('../libraries');
const { PlatformNames } = require('../libraries/constants');

/**
 * Schema
 */
const schema = mongoose.Schema({
  organizationId: {
    type: String,
    required: true
  },
  organizationName: {
    type: String,
    required: true,
  },
  platformName: {
    type: String,
    required: true,
    enum: Object.values(PlatformNames),
  },
  fullColor: {
    type: String,
    required: true,
  },
  fullText: {
    type: String,
    required: true,
  },
  partialFullColor: {
    type: String,
    required: true,
  },
  partialFullText: {
    type: String,
    required: true,
  },
  emptyColor: {
    type: String,
    required: true,
  },
  emptyText: {
    type: String,
    required: true,
  },
  fireColor: {
    type: String,
    required: true,
  },
  fireText: {
    type: String,
    required: true,
  },
  fallenColor: {
    type: String,
    required: true,
  },
  fallenText: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    required: true,
  }
}, {
  timestamps: true,
});


module.exports = mongoose.model(CollectionNames.BIN_SPOT_COLOR, schema, CollectionNames.BIN_SPOT_COLOR);