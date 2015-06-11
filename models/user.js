exports = module.exports = function(app, mongoose) {

  var userSchema = new mongoose.Schema({
      firstName: { type: String },
      lastName: { type: String },
      groups: [Number],
      contactCard: { type: String }
  });

	mongoose.model('User', userSchema);
};
