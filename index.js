const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    return Recipe.create({
      title: "Test Recipe",
      level: "Amateur Chef",
      ingredients: ["ingredient1", "ingredient2"],
      cuisine: "Test Cuisine",
      dishType: "main_course",
      image: "https://www.example.com/myimage.jpg",
      duration: 30,
      creator: "Chef Test",
    });
  })
  .then((newRecipe) => {
    console.log(`Recipe created: ${newRecipe.title}`);
    return Recipe.insertMany(data);
  })
  .then((recipes) => {
    recipes.forEach((recipe) => {
      console.log(`Recipe inserted: ${recipe.title}`);
    });

    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true } // This ensures that the updated document is returned
    );
  })
  .then((updatedRecipe) => {
    console.log(`Success! Recipe '${updatedRecipe.title}' updated`);

    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then(() => {
    console.log("Carrot Cake deleted successfully");
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  })
  .finally(() => {
    mongoose.disconnect().then(() => {
      console.log("Database connection closed");
    });
  });
