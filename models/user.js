exports = module.exports = function(app, mongoose) {

  var userSchema = new mongoose.Schema({
      firstName: { type: String },
      lastName: { type: String },
      groups: [Number]
  });

	mongoose.model('User', userSchema);
};
