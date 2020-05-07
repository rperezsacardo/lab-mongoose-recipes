const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');

// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Recipe.create();
    return Recipe.insertMany(data);
  })
  .then((data) => {
    console.log('data add : ');
    return Recipe.find();
  })
  .then((recipes) => {
    recipes.forEach((el) => console.log(el.title)); // Outputs all recipes titles
    return Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese' },
      { duration: 100 }
    );
  })
  .then(() => {
    console.log('Duration Updated');
    return Recipe.deleteOne({ title: 'Carrot Cake' });
  })
  .then((result) => {
    console.log(result);
  })

  .then(() => {
    return mongoose.disconnect();
  })
  .then(() => {
    console.log('Disconnected from MongoDB');
  })
  .catch((error) => {
    console.log('There was an error.');
    console.log(error);
  });
