const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Convert environment variable to integer as bcrypt expects a number
const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10);

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true }
});

// Password hashing middleware before saving the user
userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (this.isModified('passwordHash')) {
    this.passwordHash = await bcrypt.hash(this.passwordHash, saltRounds);
  }
  next();
});

// Helper method to check password correctness
userSchema.methods.checkPassword = async function(password) {
  return await bcrypt.compare(password, this.passwordHash);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
