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
    organizationId: {
        type: String,
        required: true,
    },
    organizationName: {
        type: String,
        required: true,
    },
    binType: {
        type: String,
        required: true
    },
    binTypeDescription: {
        type: String,
        required: true
    },
    binTypeHeight: {
        type: Number,
        required: true,
    },
    status: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true,
});


/**
 * create and export mongoose model
 * @typedef User
 */
module.exports = mongoose.model(CollectionNames.BIN_TYPE, schema, CollectionNames.BIN_TYPE);