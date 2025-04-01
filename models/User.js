const bcrypt = require("bcrypt"); //import the bcrypt library for hashing passwords
const mongoose = require("mongoose"); //import the mongoose library to interact with the database 

const UserSchema = new mongoose.Schema({ //create a new schema to define the structure of documents in the "User" collection

  userName: { type: String, unique: true }, //each document should have a "userName" field/property of data-type "String" and that 
  //string must be unique- i.e. the string cannot already be stored in the database

  email: { type: String, unique: true }, //each document should have an "email" field/property
  password: String, //each document should have a password field/property
});

// Password hash middleware.

UserSchema.pre("save", function save(next) { //pre-save hook => run this function before this document is saved to the database...
  //next is a callback function provided by Mongoose to control the flow of the operation.
  //If next() is called without an argument, Mongoose proceeds with the save operation.

  const user = this; // this refers to the document that is being saved. Assign that document to a variable called "user"
  if (!user.isModified("password")) { //if the user password has not been modified (password is new or has changed)
    return next(); //next is called to continue saving the document
  }
  bcrypt.genSalt(10, (err, salt) => { //if the password has changed, salt it
    if (err) { //if there is an error
      return next(err); //do not save the document, return the error
    }
    bcrypt.hash(user.password, salt, (err, hash) => { //hash the password
      if (err) {
        return next(err);
      }
      user.password = hash; //update the user password with the hashed password 
      next(); //next is called to continue saving the document
    });
  });
});

// Helper method for validating user's password.

UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

module.exports = mongoose.model("User", UserSchema); //export this model for use in other areas of the application, passing in
//the name of the model "User" which correlates to an automagically created "users" collection within our database; And the schema
//which will define the structure of the documents within that collection: "UserSchema"
