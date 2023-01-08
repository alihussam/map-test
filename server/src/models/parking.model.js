const mongoose = require('mongoose');
const {
  Constants: {
    CollectionNames,
  },
} = require('../libraries');

/**
 * Schema
 */
const ParkingSchema = mongoose.Schema({
  organizationId: {
    type: String,
    required: true,
  },
  organizationName: {
    type: String,
    required: true,
  },
  sensorType: {
    type: String,
    required: true,
  },
  binName: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  deviceId: {
    type: String,
    required: true,
  },
  percentageOfFull: {
    type: Number,
    required: true,
  },
  percentageOfEmpty: {
    type: Number,
    required: true,
  },
  frequentlyUsedLimit: {
    type: Number,
    required: true,
  },
  status: {
    type: Number,
    required: true,
  },
  binTypeId: {
    type: String,
    required: true,
  },
  binTypeName: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});


/**
 * create and export mongoose model 
 * @typedef User
 */
module.exports = mongoose.model(CollectionNames.PARKING, ParkingSchema, CollectionNames.PARKING);