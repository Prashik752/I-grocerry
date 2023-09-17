const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://instagroccery:instagroccery@cluster0.b2p2nzb.mongodb.net/instagroccery?retryWrites=true&w=majority';

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Define global variables here at the global level
global.g_items = [];
global.g_category = [];

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, mongooseOptions);
    console.log("connected to mongo");

    // Fetch data for groccery_items
    const gitems = await mongoose.connection.db.collection("groccery_items");
    const data = await gitems.find({}).toArray(); // Corrected syntax here

    // Fetch data for groccery_category
    const gcategory = await mongoose.connection.db.collection("groccery_category");
    const Catdata = await gcategory.find({}).toArray(); // Corrected syntax here

    global.g_items = data;
    global.g_category = Catdata;


  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
