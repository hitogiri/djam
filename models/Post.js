const mongoose = require("mongoose"); //import the Mongoose library and store its functionality in a variable called "mongoose" allowing us to interact with our MongoDB database

const PostSchema = new mongoose.Schema({ // define a new mongoose Schema (template for defining the structure of documents within a collection) and assign it to a variable called "PostSchema"

  title: { //specifies that the document should have a "title" property/field
    type: String, //specifies that this property should be of the data type String
    required: true, // this property is required; failure to provide a value will result in mongoose throwing an error
  },
  image: { //the document should have an "image" property
    type: String, //this property should be of the data type String
    require: true, // this property is required; failure to provide a value will result in mongoose throwing an error
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  caption: {
    type: String,
    required: true,
  },
  likes: { //the document should have a "likes" property
    type: Number, // this property should be of the data type Number
    required: true, // this property is required; failure to provide a value will result in mongoose throwing an error
  },
  user: { //the document should have a "user" property
    type: mongoose.Schema.Types.ObjectId, // the data type of this property should be an ObjectId, a unique identifier. 
    ref: "User", //the "ref" property is used to establish a reference to another model or collection. "User" is the name of that model/collection
    //so the user property should store the unique ObjectId of a document from a serparate collection (the "User" collection)
  },
  createdAt: { //the document should have a "createdAt" property/field
    type: Date,// this property should be of the data type "Date"
    default: Date.now, // "default" sets a default value on document creation, Date.now is a JavaScript function that returns the current timestamp
  },
});

module.exports = mongoose.model("Post", PostSchema); //export this model (making it available for use in other areas of the application)
// passing in the name of the model "Post" (which correlates to an automagically generated 'posts' collection in our database) and the schema which will structure the documents of the 'posts' collection "PostSchema"
