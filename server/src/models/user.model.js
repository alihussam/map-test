const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { PASSWORD: { SALT_FACTOR } } = require('../config');
const {
  Constants: {
    CollectionNames,
  },
} = require('../libraries');
const { ObjectId } = require('mongoose');

/**
 * Schema
 */
const UserSchema = mongoose.Schema({
  displayName: {
    type: String,
    required: true,
  },
  organizationId: {
    type: ObjectId,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    unique: true,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roleDescription: {
    type: String,
    required: true,
  },
  organizationName: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    index: true,
  },
  status: {
    type: Number,
    required: true,
  },
  menu: [{
    href: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true
    }
  }],
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

/**
 * Hooks/Triggers
 */

// pre-hook that will execute before save opration
UserSchema.pre('save', async function preSaveHook(next) {
  if (this.password) {
    const hash = bcrypt.hashSync(this.password, bcrypt.genSaltSync(SALT_FACTOR));
    this.password = hash;
  }
  if (this.email) {
    const lowerCasedEmail = this.email.trim().toLowerCase();
    this.email = lowerCasedEmail;
  }
  next();
});

// pre-hook that will execute before findOneAndUpdate Operation
UserSchema.pre('findOneAndUpdate', async function preFindOneAndUpdateHook(next) {
  const { password, email } = this.getUpdate();
  if (password) {
    const hash = bcrypt.hashSync(this.password, bcrypt.genSaltSync(SALT_FACTOR));
    this.getUpdate().password = hash;
  }
  if (email) {
    const lowerCasedEmail = email.trim().toLowerCase();
    this.getUpdate().email = lowerCasedEmail;
  }
  next();
});

/**
 * Methods
 */
UserSchema.method({
  /**
   * Compare entered password with hash in database
   * @param {string} password entered password that is to be compared
   */
  validPassword(password) {
    const isValid = bcrypt.compareSync(password, this.password);
    return isValid;
  },
  /**
   * Returns a safe model for user
   */
  safeModel() {
    const data = _.omit(this.toObject(), ['password', '__v']);
    return data;
  },
});


/**
 * create and export mongoose model
 * @typedef User
 */
module.exports = mongoose.model(CollectionNames.USER, UserSchema, CollectionNames.USER);