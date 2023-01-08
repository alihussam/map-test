const mongoose = require('mongoose');
const {
  Constants: {
    CollectionNames,
  },
} = require('../libraries');

/**
 * Schema
 */
const schema = mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  status: {
    type: Number,
    required: true,
  },
  key: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
});


/**
 * create and export mongoose model
 * @typedef User
 */
module.exports = mongoose.model(CollectionNames.ROLE, schema, CollectionNames.ROLE);