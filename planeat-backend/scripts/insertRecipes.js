const mongoose = require('mongoose');
const Recipe = require('../models/Recipe');

const MONGO_URI = 'mongodb+srv://planeat:4rtaiqnQ@planeats.xfmhd.mongodb.net/PlanEatDB?retryWrites=true&w=majority';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.log('MongoDB connection error:', error));

const recipes = [
  {
    title: "Rustic Fresh Salad",
    description: "A delicious and healthy salad with fresh ingredients.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Refined%20Culinary%20Plate%20of%20Pasta.jpeg?alt=media&token=cb6c9ec7-677c-4464-b3ce-fff1f42fa84c",
    ingredients: ["Lettuce", "Tomatoes", "Cucumber", "Olive Oil", "Salt", "Pepper"],
    instructions: "Chop all the vegetables and mix them in a bowl. Add olive oil, salt, and pepper to taste."
  },
  {
    title: "Citrus Spectrum",
    description: "A colorful spectrum of citrus fruits, perfect for fresh and zesty meals.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Citrus%20Spectrum%20on%20Dark%20Wood.jpeg?alt=media&token=6480669a-5214-4b01-b138-298eb6d9d761",
    ingredients: ["Orange", "Grapefruit", "Lemon", "Honey", "Mint"],
    instructions: "Slice the citrus fruits and mix them with honey and mint."
  },
  {
    title: "Summer Refreshment Drinks",
    description: "Cool off with these refreshing summer drinks packed with flavor.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Summer%20Refreshment%20Drinks.jpeg?alt=media&token=7e3672a7-9f9d-46db-93fc-f646ac128e3a",
    ingredients: ["Lemon", "Mint", "Soda Water", "Ice", "Honey"],
    instructions: "Mix all ingredients in a glass and serve with ice."
  },
  {
    title: "Mouthwatering Hamburger",
    description: "A juicy and delicious hamburger with all the right toppings.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Mouthwatering%20Hamburger%20Close-Up.jpeg?alt=media&token=1f4decad-e279-4dbd-8ccb-fa323816823d",
    ingredients: ["Ground Beef", "Lettuce", "Tomatoes", "Cheese", "Onions", "Pickles"],
    instructions: "Grill the beef patties and assemble the burger with the toppings."
  },
  {
    title: "Vegan Stir-Fry",
    description: "A healthy stir-fry packed with vegetables and tofu.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Vegan-Stir-Fry.jpeg?alt=media&token=demo-token",
    ingredients: ["Tofu", "Broccoli", "Bell Peppers", "Soy Sauce", "Ginger", "Garlic"],
    instructions: "Stir-fry tofu and vegetables in a wok with soy sauce, ginger, and garlic."
  },
  {
    title: "Grilled Chicken Salad",
    description: "Healthy grilled chicken served on a bed of fresh greens.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Grilled-Chicken-Salad.jpeg?alt=media&token=demo-token",
    ingredients: ["Grilled Chicken", "Lettuce", "Tomatoes", "Cucumber", "Olive Oil", "Salt", "Pepper"],
    instructions: "Grill the chicken and toss with greens and vegetables."
  },
  {
    title: "Avocado Toast",
    description: "A perfect breakfast or snack with mashed avocado on toasted bread.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Avocado-Toast.jpeg?alt=media&token=demo-token",
    ingredients: ["Avocado", "Toast", "Lemon Juice", "Salt", "Pepper"],
    instructions: "Mash avocado, season with lemon juice, salt, and pepper, and spread on toast."
  },
  {
    title: "Spaghetti Carbonara",
    description: "A classic Italian dish made with eggs, cheese, pancetta, and pepper.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Spaghetti-Carbonara.jpeg?alt=media&token=demo-token",
    ingredients: ["Spaghetti", "Eggs", "Parmesan", "Pancetta", "Black Pepper"],
    instructions: "Cook spaghetti, and mix with a creamy sauce made from eggs and cheese, with pancetta."
  },
  {
    title: "Baked Salmon",
    description: "A simple yet elegant dish of salmon fillets baked with herbs.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Baked-Salmon.jpeg?alt=media&token=demo-token",
    ingredients: ["Salmon", "Olive Oil", "Lemon", "Garlic", "Dill"],
    instructions: "Bake the salmon with olive oil, lemon, garlic, and dill until tender."
  },
  {
    title: "Vegetarian Pizza",
    description: "A homemade pizza loaded with fresh vegetables and cheese.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Vegetarian-Pizza.jpeg?alt=media&token=demo-token",
    ingredients: ["Pizza Dough", "Tomato Sauce", "Cheese", "Bell Peppers", "Onions", "Mushrooms"],
    instructions: "Top the pizza dough with sauce, cheese, and vegetables, then bake."
  },
  // Additional 50 Recipes
  {
    title: "Classic Lasagna",
    description: "Layered pasta with rich meat sauce and creamy béchamel.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Classic-Lasagna.jpeg?alt=media&token=demo-token",
    ingredients: ["Lasagna Noodles", "Ground Beef", "Tomato Sauce", "Ricotta Cheese", "Mozzarella", "Parmesan", "Egg"],
    instructions: "Layer cooked noodles with meat sauce, ricotta mixture, and cheese. Bake until bubbly."
  },
  {
    title: "Chicken Tikka Masala",
    description: "Tender chicken pieces in a spiced creamy tomato sauce.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Chicken-Tikka-Masala.jpeg?alt=media&token=demo-token",
    ingredients: ["Chicken Breast", "Yogurt", "Tomato Puree", "Cream", "Garlic", "Ginger", "Spices"],
    instructions: "Marinate and grill chicken, then simmer in a spiced tomato and cream sauce."
  },
  {
    title: "Beef Stroganoff",
    description: "Creamy beef dish served over egg noodles.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Beef-Stroganoff.jpeg?alt=media&token=demo-token",
    ingredients: ["Beef Strips", "Mushrooms", "Onions", "Sour Cream", "Beef Broth", "Egg Noodles"],
    instructions: "Cook beef with mushrooms and onions, then stir in sour cream and serve over noodles."
  },
  {
    title: "Shrimp Scampi",
    description: "Garlic and lemon butter shrimp served over pasta.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Shrimp-Scampi.jpeg?alt=media&token=demo-token",
    ingredients: ["Shrimp", "Garlic", "Butter", "Lemon Juice", "Parsley", "Pasta"],
    instructions: "Sauté shrimp with garlic and butter, add lemon juice, and serve over cooked pasta."
  },
  {
    title: "Quinoa Salad",
    description: "A nutritious salad with quinoa, vegetables, and a tangy dressing.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Quinoa-Salad.jpeg?alt=media&token=demo-token",
    ingredients: ["Quinoa", "Cherry Tomatoes", "Cucumbers", "Feta Cheese", "Olives", "Lemon Juice", "Olive Oil"],
    instructions: "Cook quinoa and mix with chopped vegetables, feta, olives, and dressing."
  },
  {
    title: "Pancakes",
    description: "Fluffy pancakes perfect for a hearty breakfast.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Pancakes.jpeg?alt=media&token=demo-token",
    ingredients: ["Flour", "Milk", "Eggs", "Baking Powder", "Sugar", "Salt", "Butter"],
    instructions: "Mix ingredients to form batter and cook on a griddle until golden brown."
  },
  {
    title: "Eggplant Parmesan",
    description: "Breaded eggplant slices baked with marinara and cheese.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Eggplant-Parmesan.jpeg?alt=media&token=demo-token",
    ingredients: ["Eggplant", "Breadcrumbs", "Parmesan Cheese", "Mozzarella", "Marinara Sauce", "Eggs"],
    instructions: "Bread and bake eggplant slices, layer with sauce and cheese, then bake until bubbly."
  },
  {
    title: "Thai Green Curry",
    description: "A spicy and aromatic curry with vegetables and coconut milk.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Thai-Green-Curry.jpeg?alt=media&token=demo-token",
    ingredients: ["Green Curry Paste", "Coconut Milk", "Chicken", "Bell Peppers", "Bamboo Shoots", "Basil"],
    instructions: "Simmer chicken and vegetables in coconut milk with green curry paste. Garnish with basil."
  },
  {
    title: "Falafel Wrap",
    description: "Crispy falafel wrapped in pita with fresh vegetables and tahini sauce.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Falafel-Wrap.jpeg?alt=media&token=demo-token",
    ingredients: ["Falafel", "Pita Bread", "Lettuce", "Tomatoes", "Cucumbers", "Tahini Sauce"],
    instructions: "Fill pita with falafel, vegetables, and drizzle with tahini sauce."
  },
  {
    title: "Beef Tacos",
    description: "Spiced beef tacos with fresh toppings and salsa.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Beef-Tacos.jpeg?alt=media&token=demo-token",
    ingredients: ["Ground Beef", "Taco Shells", "Lettuce", "Cheddar Cheese", "Tomatoes", "Salsa"],
    instructions: "Cook beef with taco seasoning, fill shells with beef and toppings."
  },
  {
    title: "Lemon Garlic Tilapia",
    description: "Light and flavorful tilapia fillets baked with lemon and garlic.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Lemon-Garlic-Tilapia.jpeg?alt=media&token=demo-token",
    ingredients: ["Tilapia Fillets", "Lemon", "Garlic", "Butter", "Parsley", "Salt", "Pepper"],
    instructions: "Place fillets in a baking dish, top with lemon, garlic, and butter. Bake until flaky."
  },
  {
    title: "Butternut Squash Soup",
    description: "Creamy and comforting soup made with roasted butternut squash.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Butternut-Squash-Soup.jpeg?alt=media&token=demo-token",
    ingredients: ["Butternut Squash", "Onions", "Garlic", "Vegetable Broth", "Cream", "Salt", "Pepper"],
    instructions: "Roast squash, then blend with sautéed onions and garlic. Add broth and cream, simmer."
  },
  {
    title: "Chicken Alfredo",
    description: "Rich and creamy Alfredo sauce served over fettuccine and chicken.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Chicken-Alfredo.jpeg?alt=media&token=demo-token",
    ingredients: ["Fettuccine", "Chicken Breast", "Butter", "Heavy Cream", "Parmesan Cheese", "Garlic"],
    instructions: "Cook pasta and chicken. Prepare Alfredo sauce and combine with pasta and chicken."
  },
  {
    title: "Caprese Salad",
    description: "Fresh tomatoes, mozzarella, and basil drizzled with balsamic glaze.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Caprese-Salad.jpeg?alt=media&token=demo-token",
    ingredients: ["Tomatoes", "Mozzarella Cheese", "Fresh Basil", "Balsamic Glaze", "Olive Oil", "Salt", "Pepper"],
    instructions: "Layer sliced tomatoes and mozzarella, top with basil, drizzle with balsamic and olive oil."
  },
  {
    title: "Pesto Pasta",
    description: "Pasta tossed in a vibrant homemade basil pesto sauce.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Pesto-Pasta.jpeg?alt=media&token=demo-token",
    ingredients: ["Pasta", "Basil", "Pine Nuts", "Garlic", "Parmesan", "Olive Oil", "Salt"],
    instructions: "Blend basil, pine nuts, garlic, and Parmesan with olive oil to make pesto. Toss with cooked pasta."
  },
  {
    title: "Stuffed Bell Peppers",
    description: "Bell peppers filled with a savory mixture of rice, beef, and spices.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Stuffed-Bell-Peppers.jpeg?alt=media&token=demo-token",
    ingredients: ["Bell Peppers", "Ground Beef", "Rice", "Tomato Sauce", "Onions", "Garlic", "Cheddar Cheese"],
    instructions: "Cook beef with onions and garlic, mix with rice and tomato sauce. Stuff into peppers and bake."
  },
  {
    title: "Greek Gyros",
    description: "Flavorful gyro meat wrapped in pita with tzatziki and fresh vegetables.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Greek-Gyros.jpeg?alt=media&token=demo-token",
    ingredients: ["Gyro Meat", "Pita Bread", "Tzatziki Sauce", "Lettuce", "Tomatoes", "Onions"],
    instructions: "Warm pita, fill with gyro meat, vegetables, and drizzle with tzatziki sauce."
  },
  {
    title: "Vegetable Curry",
    description: "A hearty and spicy curry loaded with assorted vegetables.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Vegetable-Curry.jpeg?alt=media&token=demo-token",
    ingredients: ["Mixed Vegetables", "Coconut Milk", "Curry Powder", "Onions", "Garlic", "Ginger"],
    instructions: "Sauté onions, garlic, and ginger. Add vegetables and curry powder, then simmer with coconut milk."
  },
  {
    title: "BBQ Ribs",
    description: "Tender and smoky ribs glazed with homemade barbecue sauce.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/BBQ-Ribs.jpeg?alt=media&token=demo-token",
    ingredients: ["Pork Ribs", "BBQ Sauce", "Brown Sugar", "Garlic Powder", "Paprika", "Salt", "Pepper"],
    instructions: "Season ribs, slow cook, and glaze with BBQ sauce. Bake until tender."
  },
  {
    title: "Chocolate Chip Cookies",
    description: "Classic chewy and gooey chocolate chip cookies.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Chocolate-Chip-Cookies.jpeg?alt=media&token=demo-token",
    ingredients: ["Flour", "Butter", "Sugar", "Brown Sugar", "Eggs", "Vanilla Extract", "Baking Soda", "Chocolate Chips"],
    instructions: "Cream butter and sugars, add eggs and vanilla, mix in dry ingredients and chips. Bake until golden."
  },
  {
    title: "Fish Tacos",
    description: "Crispy fish served in tortillas with fresh slaw and creamy sauce.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Fish-Tacos.jpeg?alt=media&token=demo-token",
    ingredients: ["White Fish", "Tortillas", "Cabbage", "Lime", "Mayonnaise", "Cilantro", "Spices"],
    instructions: "Season and fry fish, prepare slaw, mix sauce, assemble tacos with fish and toppings."
  },
  {
    title: "Margherita Pizza",
    description: "Classic pizza topped with fresh tomatoes, mozzarella, and basil.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Margherita-Pizza.jpeg?alt=media&token=demo-token",
    ingredients: ["Pizza Dough", "Tomato Sauce", "Fresh Mozzarella", "Fresh Basil", "Olive Oil", "Salt"],
    instructions: "Spread sauce on dough, add mozzarella and basil, drizzle with olive oil, and bake."
  },
  {
    title: "Beef Burgers",
    description: "Juicy beef burgers grilled to perfection with your favorite toppings.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Beef-Burgers.jpeg?alt=media&token=demo-token",
    ingredients: ["Ground Beef", "Burger Buns", "Lettuce", "Tomatoes", "Onions", "Cheese", "Pickles"],
    instructions: "Form beef patties, grill, and assemble burgers with buns and toppings."
  },
  {
    title: "Chicken Quesadillas",
    description: "Cheesy quesadillas filled with seasoned chicken and vegetables.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Chicken-Quesadillas.jpeg?alt=media&token=demo-token",
    ingredients: ["Flour Tortillas", "Chicken Breast", "Cheddar Cheese", "Bell Peppers", "Onions", "Spices"],
    instructions: "Cook and season chicken, sauté vegetables, assemble tortillas with fillings and cheese, cook until crispy."
  },
  {
    title: "Vegetable Stir-Fry",
    description: "A quick and healthy stir-fry with assorted vegetables and soy sauce.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Vegetable-Stir-Fry.jpeg?alt=media&token=demo-token",
    ingredients: ["Broccoli", "Carrots", "Bell Peppers", "Snap Peas", "Soy Sauce", "Garlic", "Ginger"],
    instructions: "Stir-fry vegetables with garlic and ginger, add soy sauce, and serve hot."
  },
  {
    title: "Chicken Caesar Salad",
    description: "Crisp romaine lettuce tossed with Caesar dressing, grilled chicken, and croutons.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Chicken-Caesar-Salad.jpeg?alt=media&token=demo-token",
    ingredients: ["Romaine Lettuce", "Chicken Breast", "Croutons", "Parmesan Cheese", "Caesar Dressing"],
    instructions: "Grill chicken, toss lettuce with dressing, top with chicken, croutons, and cheese."
  },
  {
    title: "Beef and Broccoli",
    description: "Tender beef and broccoli florets in a savory soy-based sauce.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Beef-and-Broccoli.jpeg?alt=media&token=demo-token",
    ingredients: ["Beef Strips", "Broccoli", "Soy Sauce", "Garlic", "Ginger", "Cornstarch", "Brown Sugar"],
    instructions: "Cook beef and broccoli, prepare sauce, combine and simmer until thickened."
  },
  {
    title: "Tomato Basil Soup",
    description: "A smooth and creamy soup made with ripe tomatoes and fresh basil.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Tomato-Basil-Soup.jpeg?alt=media&token=demo-token",
    ingredients: ["Tomatoes", "Onions", "Garlic", "Vegetable Broth", "Fresh Basil", "Cream", "Salt", "Pepper"],
    instructions: "Sauté onions and garlic, add tomatoes and broth, simmer, blend, and stir in cream and basil."
  },
  {
    title: "Chicken Fried Rice",
    description: "A classic fried rice dish with tender chicken and vegetables.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Chicken-Fried-Rice.jpeg?alt=media&token=demo-token",
    ingredients: ["Rice", "Chicken Breast", "Eggs", "Peas", "Carrots", "Soy Sauce", "Green Onions"],
    instructions: "Cook rice, scramble eggs, sauté chicken and vegetables, combine with rice and soy sauce."
  },
  {
    title: "Lemon Herb Chicken",
    description: "Juicy chicken breasts marinated in a lemon and herb mixture.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Lemon-Herb-Chicken.jpeg?alt=media&token=demo-token",
    ingredients: ["Chicken Breasts", "Lemon Juice", "Olive Oil", "Garlic", "Rosemary", "Thyme", "Salt", "Pepper"],
    instructions: "Marinate chicken in lemon, herbs, and oil. Grill or bake until cooked through."
  },
  {
    title: "Mushroom Risotto",
    description: "Creamy risotto cooked with mushrooms and Parmesan cheese.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Mushroom-Risotto.jpeg?alt=media&token=demo-token",
    ingredients: ["Arborio Rice", "Mushrooms", "Onions", "Garlic", "Vegetable Broth", "White Wine", "Parmesan Cheese", "Butter"],
    instructions: "Sauté onions and garlic, add rice and wine, gradually add broth while stirring. Mix in mushrooms and cheese."
  },
  {
    title: "Pumpkin Pie",
    description: "A traditional dessert with a spiced pumpkin filling in a flaky crust.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Pumpkin-Pie.jpeg?alt=media&token=demo-token",
    ingredients: ["Pumpkin Puree", "Sugar", "Eggs", "Evaporated Milk", "Pumpkin Pie Spice", "Pie Crust"],
    instructions: "Mix filling ingredients, pour into crust, and bake until set."
  },
  {
    title: "Garlic Butter Shrimp",
    description: "Succulent shrimp cooked in a rich garlic butter sauce.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Garlic-Butter-Shrimp.jpeg?alt=media&token=demo-token",
    ingredients: ["Shrimp", "Butter", "Garlic", "Lemon Juice", "Parsley", "Salt", "Pepper"],
    instructions: "Sauté garlic in butter, add shrimp and cook until pink. Finish with lemon juice and parsley."
  },
  {
    title: "Apple Pie",
    description: "Classic apple pie with a sweet and cinnamon-spiced filling.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Apple-Pie.jpeg?alt=media&token=demo-token",
    ingredients: ["Apples", "Sugar", "Cinnamon", "Nutmeg", "Lemon Juice", "Pie Crust", "Butter"],
    instructions: "Prepare filling with apples and spices, place in crust, top with another crust or lattice, and bake."
  },
  {
    title: "Banana Smoothie",
    description: "A creamy and nutritious smoothie made with ripe bananas and milk.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Banana-Smoothie.jpeg?alt=media&token=demo-token",
    ingredients: ["Bananas", "Milk", "Yogurt", "Honey", "Ice"],
    instructions: "Blend all ingredients until smooth and serve chilled."
  },
  {
    title: "Cheeseboard Platter",
    description: "An assortment of cheeses, fruits, and crackers for a delightful appetizer.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Cheeseboard-Platter.jpeg?alt=media&token=demo-token",
    ingredients: ["Assorted Cheeses", "Crackers", "Grapes", "Nuts", "Honey", "Dried Fruits"],
    instructions: "Arrange cheeses, fruits, nuts, and crackers on a platter. Drizzle with honey if desired."
  },
  {
    title: "Chicken Noodle Soup",
    description: "Comforting soup with tender chicken, noodles, and vegetables.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Chicken-Noodle-Soup.jpeg?alt=media&token=demo-token",
    ingredients: ["Chicken", "Egg Noodles", "Carrots", "Celery", "Onions", "Chicken Broth", "Salt", "Pepper"],
    instructions: "Cook chicken with vegetables in broth, add noodles, and simmer until everything is tender."
  },
  {
    title: "Beef Chili",
    description: "A hearty and spicy chili made with ground beef and beans.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Beef-Chili.jpeg?alt=media&token=demo-token",
    ingredients: ["Ground Beef", "Beans", "Tomato Sauce", "Onions", "Garlic", "Chili Powder", "Cumin", "Salt", "Pepper"],
    instructions: "Brown beef with onions and garlic, add remaining ingredients, and simmer until flavors meld."
  },
  {
    title: "Blueberry Muffins",
    description: "Soft and moist muffins bursting with fresh blueberries.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Blueberry-Muffins.jpeg?alt=media&token=demo-token",
    ingredients: ["Flour", "Sugar", "Blueberries", "Eggs", "Milk", "Butter", "Baking Powder", "Salt"],
    instructions: "Mix dry and wet ingredients separately, combine, fold in blueberries, and bake until golden."
  },
  {
    title: "Vegetable Lasagna",
    description: "A layered lasagna with assorted vegetables and creamy cheese.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Vegetable-Lasagna.jpeg?alt=media&token=demo-token",
    ingredients: ["Lasagna Noodles", "Zucchini", "Spinach", "Ricotta Cheese", "Mozzarella", "Tomato Sauce", "Parmesan"],
    instructions: "Layer noodles with vegetables, cheeses, and sauce. Bake until bubbly."
  },
  {
    title: "Tiramisu",
    description: "A classic Italian dessert with coffee-soaked ladyfingers and mascarpone cream.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Tiramisu.jpeg?alt=media&token=demo-token",
    ingredients: ["Ladyfingers", "Espresso", "Mascarpone", "Eggs", "Sugar", "Cocoa Powder", "Marsala Wine"],
    instructions: "Layer soaked ladyfingers with mascarpone mixture, dust with cocoa, and refrigerate before serving."
  },
  {
    title: "Grilled Veggie Skewers",
    description: "Assorted vegetables grilled to perfection on skewers.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Grilled-Veggie-Skewers.jpeg?alt=media&token=demo-token",
    ingredients: ["Bell Peppers", "Zucchini", "Cherry Tomatoes", "Red Onions", "Mushrooms", "Olive Oil", "Salt", "Pepper"],
    instructions: "Thread vegetables onto skewers, brush with olive oil, season, and grill until tender."
  },
  {
    title: "BBQ Chicken Pizza",
    description: "A flavorful pizza topped with BBQ sauce, chicken, and red onions.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/BBQ-Chicken-Pizza.jpeg?alt=media&token=demo-token",
    ingredients: ["Pizza Dough", "BBQ Sauce", "Cooked Chicken", "Red Onions", "Mozzarella Cheese", "Cilantro"],
    instructions: "Spread BBQ sauce on dough, add chicken, onions, and cheese. Bake and garnish with cilantro."
  },
  {
    title: "Creamy Pesto Chicken",
    description: "Chicken breasts cooked in a creamy pesto sauce.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Creamy-Pesto-Chicken.jpeg?alt=media&token=demo-token",
    ingredients: ["Chicken Breasts", "Pesto Sauce", "Heavy Cream", "Parmesan Cheese", "Garlic", "Olive Oil", "Salt", "Pepper"],
    instructions: "Sauté chicken, add garlic, pesto, and cream. Simmer and serve with Parmesan."
  },
  {
    title: "Beef Burritos",
    description: "Hearty burritos filled with seasoned beef, rice, beans, and cheese.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Beef-Burritos.jpeg?alt=media&token=demo-token",
    ingredients: ["Tortillas", "Ground Beef", "Rice", "Beans", "Cheddar Cheese", "Salsa", "Lettuce", "Sour Cream"],
    instructions: "Cook beef with seasoning, assemble tortillas with beef, rice, beans, and toppings, then roll."
  },
  {
    title: "Garlic Roasted Potatoes",
    description: "Crispy roasted potatoes flavored with garlic and herbs.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Garlic-Roasted-Potatoes.jpeg?alt=media&token=demo-token",
    ingredients: ["Potatoes", "Garlic", "Olive Oil", "Rosemary", "Thyme", "Salt", "Pepper"],
    instructions: "Toss potatoes with oil, garlic, and herbs. Roast until golden and crispy."
  },
  {
    title: "Vegetable Frittata",
    description: "A versatile egg dish packed with fresh vegetables and cheese.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Vegetable-Frittata.jpeg?alt=media&token=demo-token",
    ingredients: ["Eggs", "Bell Peppers", "Spinach", "Onions", "Cheddar Cheese", "Milk", "Salt", "Pepper"],
    instructions: "Sauté vegetables, mix with beaten eggs and milk, pour into a skillet, and bake until set."
  },
  {
    title: "BBQ Pulled Pork",
    description: "Tender pulled pork simmered in a smoky barbecue sauce.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/BBQ-Pulled-Pork.jpeg?alt=media&token=demo-token",
    ingredients: ["Pork Shoulder", "BBQ Sauce", "Onions", "Garlic", "Apple Cider Vinegar", "Brown Sugar", "Spices"],
    instructions: "Slow cook pork with ingredients until tender, shred, and mix with sauce."
  },
  {
    title: "Egg Salad Sandwich",
    description: "Creamy egg salad served between slices of fresh bread.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Egg-Salad-Sandwich.jpeg?alt=media&token=demo-token",
    ingredients: ["Eggs", "Mayonnaise", "Mustard", "Celery", "Onions", "Salt", "Pepper", "Bread"],
    instructions: "Chop boiled eggs, mix with other ingredients, and spread on bread."
  },
  {
    title: "Spinach and Feta Stuffed Chicken",
    description: "Chicken breasts filled with a savory spinach and feta mixture.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Spinach-Feta-Chicken.jpeg?alt=media&token=demo-token",
    ingredients: ["Chicken Breasts", "Spinach", "Feta Cheese", "Garlic", "Olive Oil", "Salt", "Pepper"],
    instructions: "Stuff chicken with spinach and feta, secure, and bake until cooked through."
  },
  {
    title: "Pesto Grilled Cheese",
    description: "A gourmet grilled cheese sandwich with pesto and mozzarella.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Pesto-Grilled-Cheese.jpeg?alt=media&token=demo-token",
    ingredients: ["Bread", "Mozzarella Cheese", "Pesto", "Butter"],
    instructions: "Spread pesto on bread, add cheese, butter the outside, and grill until golden."
  },
  {
    title: "Clam Chowder",
    description: "A creamy soup loaded with clams, potatoes, and bacon.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Clam-Chowder.jpeg?alt=media&token=demo-token",
    ingredients: ["Clams", "Potatoes", "Bacon", "Onions", "Celery", "Cream", "Chicken Broth", "Thyme"],
    instructions: "Cook bacon, sauté vegetables, add clams and broth, simmer with potatoes, finish with cream."
  },
  {
    title: "Ratatouille",
    description: "A traditional French stewed vegetable dish rich in flavors.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Ratatouille.jpeg?alt=media&token=demo-token",
    ingredients: ["Eggplant", "Zucchini", "Bell Peppers", "Tomatoes", "Onions", "Garlic", "Herbs"],
    instructions: "Sauté vegetables with garlic and herbs until tender and well combined."
  },
  {
    title: "Chocolate Mousse",
    description: "A light and airy dessert made with rich chocolate.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Chocolate-Mousse.jpeg?alt=media&token=demo-token",
    ingredients: ["Dark Chocolate", "Eggs", "Sugar", "Whipping Cream", "Vanilla Extract"],
    instructions: "Melt chocolate, fold in whipped egg whites and cream, chill until set."
  },
  {
    title: "Falafel Bowl",
    description: "A nutritious bowl with falafel, quinoa, and fresh vegetables.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Falafel-Bowl.jpeg?alt=media&token=demo-token",
    ingredients: ["Falafel", "Quinoa", "Cucumbers", "Tomatoes", "Tahini Sauce", "Spinach", "Olives"],
    instructions: "Assemble bowl with quinoa, falafel, vegetables, and drizzle with tahini sauce."
  },
  {
    title: "Honey Glazed Carrots",
    description: "Sweet and tender carrots glazed with honey and butter.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Honey-Glazed-Carrots.jpeg?alt=media&token=demo-token",
    ingredients: ["Carrots", "Honey", "Butter", "Salt", "Pepper", "Parsley"],
    instructions: "Sauté carrots with butter and honey until glazed. Season and garnish with parsley."
  },
  {
    title: "Shrimp Alfredo",
    description: "Creamy Alfredo sauce with succulent shrimp served over fettuccine.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Shrimp-Alfredo.jpeg?alt=media&token=demo-token",
    ingredients: ["Fettuccine", "Shrimp", "Butter", "Heavy Cream", "Parmesan Cheese", "Garlic", "Salt", "Pepper"],
    instructions: "Cook pasta and shrimp. Prepare Alfredo sauce and combine with pasta and shrimp."
  },
  {
    title: "Chicken Parmesan",
    description: "Breaded chicken breasts topped with marinara and melted cheese.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Chicken-Parmesan.jpeg?alt=media&token=demo-token",
    ingredients: ["Chicken Breasts", "Breadcrumbs", "Parmesan Cheese", "Mozzarella", "Marinara Sauce", "Eggs", "Flour"],
    instructions: "Bread and fry chicken, top with sauce and cheese, and bake until cheese is melted."
  },
  {
    title: "Vegetable Samosas",
    description: "Crispy pastries filled with spiced vegetables.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Vegetable-Samosas.jpeg?alt=media&token=demo-token",
    ingredients: ["Pastry Dough", "Potatoes", "Peas", "Carrots", "Onions", "Spices", "Oil"],
    instructions: "Prepare filling with vegetables and spices, fill dough, seal, and fry until golden."
  },
  {
    title: "Pumpkin Risotto",
    description: "Creamy risotto flavored with pumpkin and Parmesan.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Pumpkin-Risotto.jpeg?alt=media&token=demo-token",
    ingredients: ["Arborio Rice", "Pumpkin Puree", "Onions", "Garlic", "Vegetable Broth", "Parmesan Cheese", "Butter"],
    instructions: "Sauté onions and garlic, add rice and pumpkin, gradually add broth while stirring. Finish with cheese and butter."
  },
  {
    title: "Beef Empanadas",
    description: "Savory pastries filled with seasoned beef and vegetables.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Beef-Empanadas.jpeg?alt=media&token=demo-token",
    ingredients: ["Empanada Dough", "Ground Beef", "Onions", "Bell Peppers", "Garlic", "Spices", "Olives"],
    instructions: "Prepare filling with beef and vegetables, fill dough, seal edges, and bake or fry."
  },
  {
    title: "Caprese Bruschetta",
    description: "Toasted baguette slices topped with tomatoes, mozzarella, and basil.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Caprese-Bruschetta.jpeg?alt=media&token=demo-token",
    ingredients: ["Baguette", "Tomatoes", "Mozzarella", "Fresh Basil", "Balsamic Glaze", "Olive Oil", "Salt", "Pepper"],
    instructions: "Toast baguette slices, top with tomato, mozzarella, and basil. Drizzle with balsamic glaze."
  },
  {
    title: "Sweet Potato Fries",
    description: "Crispy and sweet fries made from fresh sweet potatoes.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Sweet-Potato-Fries.jpeg?alt=media&token=demo-token",
    ingredients: ["Sweet Potatoes", "Olive Oil", "Salt", "Pepper", "Paprika"],
    instructions: "Cut sweet potatoes into fries, toss with oil and spices, and bake until crispy."
  },
  {
    title: "Lentil Soup",
    description: "Hearty soup made with lentils, vegetables, and spices.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Lentil-Soup.jpeg?alt=media&token=demo-token",
    ingredients: ["Lentils", "Carrots", "Celery", "Onions", "Garlic", "Tomato Paste", "Vegetable Broth", "Spices"],
    instructions: "Sauté vegetables, add lentils and broth, simmer until lentils are tender."
  },
  {
    title: "Banana Bread",
    description: "Moist and flavorful bread made with ripe bananas.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Banana-Bread.jpeg?alt=media&token=demo-token",
    ingredients: ["Ripe Bananas", "Flour", "Sugar", "Eggs", "Butter", "Baking Soda", "Salt", "Vanilla Extract"],
    instructions: "Mix wet and dry ingredients, fold in bananas, pour into a loaf pan, and bake until done."
  },
  {
    title: "Seafood Paella",
    description: "A traditional Spanish rice dish with assorted seafood.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Seafood-Paella.jpeg?alt=media&token=demo-token",
    ingredients: ["Rice", "Shrimp", "Mussels", "Calamari", "Saffron", "Peas", "Bell Peppers", "Chicken Broth"],
    instructions: "Sauté seafood and vegetables, add rice and saffron, pour in broth, and cook until rice is done."
  },
  {
    title: "Pumpkin Spice Latte",
    description: "A seasonal favorite with pumpkin flavor and warming spices.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Pumpkin-Spice-Latte.jpeg?alt=media&token=demo-token",
    ingredients: ["Espresso", "Pumpkin Puree", "Milk", "Sugar", "Pumpkin Pie Spice", "Whipped Cream"],
    instructions: "Mix pumpkin puree with spices and sugar, add espresso and steamed milk, top with whipped cream."
  },
  {
    title: "Vegetable Spring Rolls",
    description: "Fresh and crunchy spring rolls filled with vegetables and herbs.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Vegetable-Spring-Rolls.jpeg?alt=media&token=demo-token",
    ingredients: ["Rice Paper", "Carrots", "Cucumbers", "Lettuce", "Mint", "Cilantro", "Rice Noodles", "Dipping Sauce"],
    instructions: "Soften rice paper, fill with vegetables and herbs, roll tightly, and serve with dipping sauce."
  },
  {
    title: "Chocolate Brownies",
    description: "Rich and fudgy brownies with a crackly top.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Chocolate-Brownies.jpeg?alt=media&token=demo-token",
    ingredients: ["Chocolate", "Butter", "Sugar", "Eggs", "Flour", "Cocoa Powder", "Salt"],
    instructions: "Melt chocolate and butter, mix in sugar and eggs, add dry ingredients, pour into pan, and bake."
  },
  {
    title: "Chicken Fajitas",
    description: "Sizzling chicken with bell peppers and onions served with tortillas.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Chicken-Fajitas.jpeg?alt=media&token=demo-token",
    ingredients: ["Chicken Breast", "Bell Peppers", "Onions", "Fajita Seasoning", "Tortillas", "Lime", "Cilantro"],
    instructions: "Cook chicken with seasoning, sauté vegetables, serve with warm tortillas and toppings."
  },
  {
    title: "Pumpkin Pancakes",
    description: "Fluffy pancakes infused with pumpkin and warm spices.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Pumpkin-Pancakes.jpeg?alt=media&token=demo-token",
    ingredients: ["Flour", "Pumpkin Puree", "Milk", "Eggs", "Baking Powder", "Sugar", "Pumpkin Pie Spice"],
    instructions: "Mix ingredients to form batter, cook on griddle until bubbles form, flip and cook until done."
  },
  {
    title: "Shrimp Tacos",
    description: "Spicy shrimp served in tortillas with fresh slaw and avocado.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Shrimp-Tacos.jpeg?alt=media&token=demo-token",
    ingredients: ["Shrimp", "Tortillas", "Cabbage", "Avocado", "Lime", "Spices", "Salsa"],
    instructions: "Season and cook shrimp, assemble tacos with shrimp, slaw, avocado, and salsa."
  },
  {
    title: "Cauliflower Rice Stir-Fry",
    description: "A low-carb stir-fry using cauliflower rice instead of regular rice.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Cauliflower-Rice-Stir-Fry.jpeg?alt=media&token=demo-token",
    ingredients: ["Cauliflower Rice", "Carrots", "Peas", "Eggs", "Soy Sauce", "Garlic", "Green Onions"],
    instructions: "Sauté vegetables, add cauliflower rice, push to side, scramble eggs, combine and season with soy sauce."
  },
  {
    title: "Berry Parfait",
    description: "Layers of yogurt, granola, and fresh berries for a healthy treat.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Berry-Parfait.jpeg?alt=media&token=demo-token",
    ingredients: ["Yogurt", "Granola", "Strawberries", "Blueberries", "Honey"],
    instructions: "Layer yogurt with granola and berries in a glass, drizzle with honey."
  },
  {
    title: "Chicken Tenders",
    description: "Crispy breaded chicken tenders perfect for dipping.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Chicken-Tenders.jpeg?alt=media&token=demo-token",
    ingredients: ["Chicken Breast", "Flour", "Eggs", "Breadcrumbs", "Salt", "Pepper", "Oil"],
    instructions: "Coat chicken in flour, dip in eggs, then breadcrumb. Fry until golden and cooked through."
  },
  {
    title: "Beef Wellington",
    description: "A luxurious dish with beef tenderloin wrapped in puff pastry.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Beef-Wellington.jpeg?alt=media&token=demo-token",
    ingredients: ["Beef Tenderloin", "Mushrooms", "Prosciutto", "Puff Pastry", "Dijon Mustard", "Eggs"],
    instructions: "Sear beef, spread with mustard, wrap with mushroom duxelles and prosciutto, encase in pastry, and bake."
  },
  {
    title: "Vegetable Omelette",
    description: "A fluffy omelette filled with a variety of fresh vegetables.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Vegetable-Omelette.jpeg?alt=media&token=demo-token",
    ingredients: ["Eggs", "Bell Peppers", "Onions", "Spinach", "Cheese", "Salt", "Pepper", "Butter"],
    instructions: "Sauté vegetables, pour beaten eggs over, add cheese, fold, and cook until set."
  },
  {
    title: "Tuna Salad",
    description: "A quick and easy salad with tuna, vegetables, and a tangy dressing.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Tuna-Salad.jpeg?alt=media&token=demo-token",
    ingredients: ["Canned Tuna", "Mayonnaise", "Celery", "Onions", "Lemon Juice", "Salt", "Pepper"],
    instructions: "Mix all ingredients in a bowl and serve chilled."
  },
  {
    title: "Garlic Bread",
    description: "Toasted bread slices spread with a rich garlic butter mixture.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Garlic-Bread.jpeg?alt=media&token=demo-token",
    ingredients: ["Baguette", "Butter", "Garlic", "Parsley", "Salt"],
    instructions: "Mix softened butter with minced garlic and parsley, spread on bread, and bake until golden."
  },
  {
    title: "Apple Crisp",
    description: "Warm baked apples topped with a crunchy oat and cinnamon topping.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Apple-Crisp.jpeg?alt=media&token=demo-token",
    ingredients: ["Apples", "Oats", "Brown Sugar", "Flour", "Butter", "Cinnamon", "Nutmeg"],
    instructions: "Slice apples and place in baking dish. Top with mixture of oats, sugar, flour, and butter. Bake until bubbly."
  },
  {
    title: "Caesar Salad",
    description: "A classic salad with romaine lettuce, croutons, and Caesar dressing.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Caesar-Salad.jpeg?alt=media&token=demo-token",
    ingredients: ["Romaine Lettuce", "Croutons", "Parmesan Cheese", "Caesar Dressing", "Anchovies (optional)"],
    instructions: "Toss lettuce with dressing, top with croutons and Parmesan."
  },
  {
    title: "BBQ Chicken Wings",
    description: "Spicy and sticky chicken wings glazed with barbecue sauce.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/BBQ-Chicken-Wings.jpeg?alt=media&token=demo-token",
    ingredients: ["Chicken Wings", "BBQ Sauce", "Hot Sauce", "Honey", "Garlic Powder", "Salt", "Pepper"],
    instructions: "Season wings, bake until crispy, toss with sauce mixture, and serve."
  },
  {
    title: "Pumpkin Bread",
    description: "Moist and spiced bread made with pumpkin puree.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Pumpkin-Bread.jpeg?alt=media&token=demo-token",
    ingredients: ["Pumpkin Puree", "Flour", "Sugar", "Eggs", "Oil", "Baking Soda", "Cinnamon", "Nutmeg"],
    instructions: "Mix wet and dry ingredients, combine, pour into loaf pan, and bake until done."
  },
  {
    title: "Beef Tostadas",
    description: "Crunchy tostadas topped with seasoned beef, beans, and fresh toppings.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Beef-Tostadas.jpeg?alt=media&token=demo-token",
    ingredients: ["Tostada Shells", "Ground Beef", "Beans", "Lettuce", "Tomatoes", "Cheese", "Sour Cream", "Salsa"],
    instructions: "Cook beef with seasoning, spread on tostada shells, and add toppings."
  },
  {
    title: "Banana Split",
    description: "A classic dessert with bananas, ice cream, and various toppings.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Banana-Split.jpeg?alt=media&token=demo-token",
    ingredients: ["Bananas", "Vanilla Ice Cream", "Chocolate Syrup", "Strawberry Syrup", "Whipped Cream", "Cherries", "Nuts"],
    instructions: "Place bananas in a dish, add scoops of ice cream, drizzle with syrups, top with whipped cream, cherries, and nuts."
  },
  {
    title: "Chicken Enchiladas",
    description: "Rolled tortillas filled with chicken and cheese, topped with enchilada sauce.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Chicken-Enchiladas.jpeg?alt=media&token=demo-token",
    ingredients: ["Tortillas", "Chicken Breast", "Cheddar Cheese", "Enchilada Sauce", "Onions", "Garlic"],
    instructions: "Fill tortillas with cooked chicken and cheese, roll, place in baking dish, cover with sauce and cheese, bake."
  },
  {
    title: "Mango Salsa",
    description: "A fresh and vibrant salsa perfect for dipping or topping dishes.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Mango-Salsa.jpeg?alt=media&token=demo-token",
    ingredients: ["Mango", "Red Onion", "Cilantro", "Jalapeño", "Lime Juice", "Salt"],
    instructions: "Dice all ingredients and mix together. Chill before serving."
  },
  {
    title: "Stuffed Mushrooms",
    description: "Baked mushrooms filled with a savory herb and cheese mixture.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Stuffed-Mushrooms.jpeg?alt=media&token=demo-token",
    ingredients: ["Mushrooms", "Cream Cheese", "Garlic", "Parmesan Cheese", "Parsley", "Breadcrumbs"],
    instructions: "Fill mushroom caps with mixture, top with breadcrumbs and cheese, bake until golden."
  },
  {
    title: "BBQ Ribs",
    description: "Tender ribs slow-cooked and smothered in barbecue sauce.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/BBQ-Ribs.jpeg?alt=media&token=demo-token",
    ingredients: ["Pork Ribs", "BBQ Sauce", "Brown Sugar", "Paprika", "Garlic Powder", "Onion Powder", "Salt", "Pepper"],
    instructions: "Season ribs, slow cook, brush with BBQ sauce, and grill or bake until tender."
  },
  {
    title: "Greek Salad",
    description: "A refreshing salad with feta, olives, and a tangy vinaigrette.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Greek-Salad.jpeg?alt=media&token=demo-token",
    ingredients: ["Tomatoes", "Cucumbers", "Red Onions", "Feta Cheese", "Olives", "Olive Oil", "Oregano", "Salt", "Pepper"],
    instructions: "Chop vegetables, mix with olives and feta, dress with olive oil and seasoning."
  },
  {
    title: "Pumpkin Cheesecake",
    description: "A creamy cheesecake with a pumpkin flavor and graham cracker crust.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Pumpkin-Cheesecake.jpeg?alt=media&token=demo-token",
    ingredients: ["Cream Cheese", "Pumpkin Puree", "Sugar", "Eggs", "Graham Crackers", "Butter", "Pumpkin Pie Spice"],
    instructions: "Prepare crust, mix filling with pumpkin and spices, pour into crust, and bake until set."
  },
  {
    title: "Teriyaki Chicken",
    description: "Grilled chicken glazed with a sweet and savory teriyaki sauce.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Teriyaki-Chicken.jpeg?alt=media&token=demo-token",
    ingredients: ["Chicken Thighs", "Soy Sauce", "Honey", "Garlic", "Ginger", "Sesame Oil", "Green Onions"],
    instructions: "Marinate chicken in sauce mixture, grill or bake, and garnish with green onions."
  },
  {
    title: "Chocolate Fondue",
    description: "Rich melted chocolate served with assorted dippables.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Chocolate-Fondue.jpeg?alt=media&token=demo-token",
    ingredients: ["Dark Chocolate", "Heavy Cream", "Vanilla Extract", "Assorted Dippables (fruits, marshmallows, etc.)"],
    instructions: "Melt chocolate with cream and vanilla, keep warm, and dip dippables."
  },
  {
    title: "Veggie Burger",
    description: "A hearty vegetarian burger made with a flavorful vegetable patty.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Veggie-Burger.jpeg?alt=media&token=demo-token",
    ingredients: ["Black Beans", "Oats", "Carrots", "Onions", "Garlic", "Spices", "Burger Buns", "Toppings"],
    instructions: "Blend beans and veggies, form patties, cook, and assemble with buns and toppings."
  },
  {
    title: "Tom Yum Soup",
    description: "A spicy and sour Thai soup with shrimp and mushrooms.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Tom-Yum-Soup.jpeg?alt=media&token=demo-token",
    ingredients: ["Shrimp", "Mushrooms", "Lemongrass", "Galangal", "Kaffir Lime Leaves", "Fish Sauce", "Lime Juice", "Chili Peppers"],
    instructions: "Boil broth with herbs, add shrimp and mushrooms, season with fish sauce and lime juice, and serve hot."
  },
  {
    title: "Banana Pancakes",
    description: "Delicious pancakes made with ripe bananas for extra flavor.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Banana-Pancakes.jpeg?alt=media&token=demo-token",
    ingredients: ["Flour", "Milk", "Eggs", "Bananas", "Baking Powder", "Sugar", "Butter"],
    instructions: "Mash bananas and mix with wet ingredients, combine with dry ingredients, cook on griddle until golden."
  },
  {
    title: "Chicken Marsala",
    description: "Chicken breasts cooked in a rich mushroom and Marsala wine sauce.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Chicken-Marsala.jpeg?alt=media&token=demo-token",
    ingredients: ["Chicken Breasts", "Mushrooms", "Marsala Wine", "Butter", "Flour", "Garlic", "Parsley"],
    instructions: "Dredge chicken in flour, sauté with mushrooms, add Marsala wine, and simmer until sauce thickens."
  },
  {
    title: "Caprese Pasta Salad",
    description: "A fresh pasta salad with tomatoes, mozzarella, and basil.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Caprese-Pasta-Salad.jpeg?alt=media&token=demo-token",
    ingredients: ["Pasta", "Cherry Tomatoes", "Mozzarella Balls", "Fresh Basil", "Olive Oil", "Balsamic Vinegar", "Salt", "Pepper"],
    instructions: "Cook pasta, mix with tomatoes, mozzarella, and basil, dress with olive oil and balsamic, season."
  },
  {
    title: "Garlic Shrimp Pasta",
    description: "Pasta tossed with succulent shrimp in a garlic butter sauce.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Garlic-Shrimp-Pasta.jpeg?alt=media&token=demo-token",
    ingredients: ["Pasta", "Shrimp", "Garlic", "Butter", "Parsley", "Lemon Juice", "Salt", "Pepper"],
    instructions: "Cook pasta, sauté garlic and shrimp in butter, toss with pasta, add lemon juice and parsley."
  },
  {
    title: "Chicken Pot Pie",
    description: "A comforting pie filled with chicken, vegetables, and a creamy sauce.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Chicken-Pot-Pie.jpeg?alt=media&token=demo-token",
    ingredients: ["Chicken", "Mixed Vegetables", "Pie Crust", "Flour", "Butter", "Milk", "Chicken Broth", "Salt", "Pepper"],
    instructions: "Prepare filling with chicken and vegetables in creamy sauce, encase in crust, and bake until golden."
  },
  {
    title: "Fruit Tart",
    description: "A colorful tart filled with custard and topped with fresh fruits.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Fruit-Tart.jpeg?alt=media&token=demo-token",
    ingredients: ["Pie Crust", "Custard Filling", "Assorted Fresh Fruits", "Apricot Jam"],
    instructions: "Bake crust, fill with custard, arrange fruits on top, glaze with warmed jam."
  },
  {
    title: "Shrimp and Grits",
    description: "Savory shrimp served over creamy grits with a flavorful sauce.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Shrimp-and-Grits.jpeg?alt=media&token=demo-token",
    ingredients: ["Shrimp", "Grits", "Butter", "Garlic", "Lemon Juice", "Parsley", "Cheddar Cheese", "Bacon"],
    instructions: "Prepare grits with butter and cheese. Cook shrimp with garlic and bacon, combine with lemon juice and parsley. Serve over grits."
  },
  {
    title: "Vegetable Paella",
    description: "A vegetarian version of the traditional Spanish rice dish.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Vegetable-Paella.jpeg?alt=media&token=demo-token",
    ingredients: ["Rice", "Artichokes", "Bell Peppers", "Green Beans", "Tomatoes", "Saffron", "Vegetable Broth", "Olive Oil"],
    instructions: "Sauté vegetables, add rice and saffron, pour in broth, and cook until rice is tender."
  },
  {
    title: "Chocolate Lava Cake",
    description: "A decadent dessert with a gooey chocolate center.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Chocolate-Lava-Cake.jpeg?alt=media&token=demo-token",
    ingredients: ["Dark Chocolate", "Butter", "Sugar", "Eggs", "Flour", "Salt"],
    instructions: "Melt chocolate and butter, mix in sugar and eggs, fold in flour, pour into molds, and bake until edges are set but center is gooey."
  },
  {
    title: "Falafel Sandwich",
    description: "Crispy falafel balls stuffed in pita with tahini and vegetables.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Falafel-Sandwich.jpeg?alt=media&token=demo-token",
    ingredients: ["Falafel", "Pita Bread", "Lettuce", "Tomatoes", "Cucumbers", "Tahini Sauce"],
    instructions: "Stuff pita with falafel, vegetables, and drizzle with tahini sauce."
  },
  {
    title: "Butternut Squash Risotto",
    description: "Creamy risotto infused with the sweet flavor of butternut squash.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Butternut-Squash-Risotto.jpeg?alt=media&token=demo-token",
    ingredients: ["Arborio Rice", "Butternut Squash", "Onions", "Garlic", "Vegetable Broth", "Parmesan Cheese", "Butter"],
    instructions: "Sauté onions and garlic, add rice and roasted squash, gradually add broth while stirring, finish with cheese and butter."
  },
  {
    title: "BBQ Jackfruit Sandwich",
    description: "A vegan alternative to pulled pork using jackfruit.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/BBQ-Jackfruit-Sandwich.jpeg?alt=media&token=demo-token",
    ingredients: ["Jackfruit", "BBQ Sauce", "Onions", "Coleslaw", "Burger Buns"],
    instructions: "Cook jackfruit with onions and BBQ sauce until tender, serve on buns with coleslaw."
  },
  {
    title: "Minestrone Soup",
    description: "A hearty Italian soup with vegetables, beans, and pasta.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Minestrone-Soup.jpeg?alt=media&token=demo-token",
    ingredients: ["Onions", "Carrots", "Celery", "Zucchini", "Beans", "Tomatoes", "Pasta", "Vegetable Broth", "Spinach"],
    instructions: "Sauté vegetables, add beans and broth, simmer, add pasta and spinach until cooked."
  },
  {
    title: "Blueberry Smoothie",
    description: "A refreshing smoothie packed with blueberries and yogurt.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Blueberry-Smoothie.jpeg?alt=media&token=demo-token",
    ingredients: ["Blueberries", "Yogurt", "Banana", "Honey", "Milk", "Ice"],
    instructions: "Blend all ingredients until smooth and serve chilled."
  },
  {
    title: "Beef and Vegetable Stew",
    description: "A slow-cooked stew with tender beef and assorted vegetables.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Beef-Vegetable-Stew.jpeg?alt=media&token=demo-token",
    ingredients: ["Beef Chuck", "Carrots", "Potatoes", "Celery", "Onions", "Tomato Paste", "Beef Broth", "Herbs"],
    instructions: "Brown beef, add vegetables and broth, season with herbs, and simmer until tender."
  },
  {
    title: "Chocolate Chip Banana Bread",
    description: "A delicious twist on banana bread with chocolate chips.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Chocolate-Chip-Banana-Bread.jpeg?alt=media&token=demo-token",
    ingredients: ["Ripe Bananas", "Flour", "Sugar", "Eggs", "Butter", "Baking Soda", "Salt", "Chocolate Chips"],
    instructions: "Mix wet and dry ingredients, fold in chocolate chips, pour into loaf pan, and bake until done."
  },
  {
    title: "Veggie Sushi Rolls",
    description: "Homemade sushi rolls filled with fresh vegetables and rice.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Veggie-Sushi-Rolls.jpeg?alt=media&token=demo-token",
    ingredients: ["Sushi Rice", "Nori Sheets", "Cucumber", "Avocado", "Carrots", "Soy Sauce", "Wasabi"],
    instructions: "Spread rice on nori, add veggies, roll tightly, slice, and serve with soy sauce and wasabi."
  },
  {
    title: "Chicken and Dumplings",
    description: "A comforting dish with tender chicken and fluffy dumplings.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Chicken-Dumplings.jpeg?alt=media&token=demo-token",
    ingredients: ["Chicken", "Carrots", "Celery", "Onions", "Chicken Broth", "Flour", "Baking Powder", "Milk", "Butter"],
    instructions: "Cook chicken with vegetables in broth, prepare dumpling dough, drop into soup, and simmer until cooked."
  },
  {
    title: "Pesto Pizza",
    description: "Pizza topped with vibrant pesto sauce, fresh tomatoes, and mozzarella.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Pesto-Pizza.jpeg?alt=media&token=demo-token",
    ingredients: ["Pizza Dough", "Pesto Sauce", "Cherry Tomatoes", "Mozzarella Cheese", "Parmesan", "Basil"],
    instructions: "Spread pesto on dough, add tomatoes and cheese, bake until crust is golden, garnish with basil."
  },
  {
    title: "Eggplant Rollatini",
    description: "Thin slices of eggplant rolled with ricotta and spinach, baked in marinara sauce.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Eggplant-Rollatini.jpeg?alt=media&token=demo-token",
    ingredients: ["Eggplant", "Ricotta Cheese", "Spinach", "Parmesan Cheese", "Marinara Sauce", "Mozzarella", "Eggs"],
    instructions: "Slice and grill eggplant, mix ricotta with spinach and eggs, roll, place in sauce, top with cheese, and bake."
  },
  {
    title: "Greek Yogurt Parfait",
    description: "Layers of Greek yogurt, honey, granola, and fresh berries.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Greek-Yogurt-Parfait.jpeg?alt=media&token=demo-token",
    ingredients: ["Greek Yogurt", "Honey", "Granola", "Strawberries", "Blueberries", "Blackberries"],
    instructions: "Layer yogurt with honey, granola, and berries in a glass. Repeat layers and serve."
  },
  {
    title: "Chicken Cacciatore",
    description: "Italian chicken stew with tomatoes, bell peppers, and herbs.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Chicken-Cacciatore.jpeg?alt=media&token=demo-token",
    ingredients: ["Chicken Thighs", "Bell Peppers", "Onions", "Garlic", "Tomatoes", "Olives", "Herbs"],
    instructions: "Brown chicken, sauté vegetables, add tomatoes and herbs, simmer until chicken is tender."
  },
  {
    title: "Chocolate Peanut Butter Bars",
    description: "No-bake bars with a peanut butter base and a chocolate topping.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Chocolate-Peanut-Butter-Bars.jpeg?alt=media&token=demo-token",
    ingredients: ["Peanut Butter", "Butter", "Powdered Sugar", "Chocolate Chips", "Vanilla Extract"],
    instructions: "Mix peanut butter with butter, sugar, and vanilla. Press into a pan, melt chocolate, spread over, and refrigerate."
  },
  {
    title: "Quiche Lorraine",
    description: "A savory tart filled with eggs, bacon, and cheese.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Quiche-Lorraine.jpeg?alt=media&token=demo-token",
    ingredients: ["Pie Crust", "Eggs", "Heavy Cream", "Bacon", "Swiss Cheese", "Onions", "Salt", "Pepper"],
    instructions: "Cook bacon and onions, mix with eggs and cream, add cheese, pour into crust, and bake until set."
  },
  {
    title: "Vegetable Korma",
    description: "A mild and creamy Indian curry with assorted vegetables.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Vegetable-Korma.jpeg?alt=media&token=demo-token",
    ingredients: ["Mixed Vegetables", "Yogurt", "Coconut Milk", "Korma Paste", "Onions", "Garlic", "Ginger"],
    instructions: "Sauté onions, garlic, and ginger, add korma paste, vegetables, yogurt, and coconut milk. Simmer until tender."
  },
  {
    title: "Apple Cinnamon Oatmeal",
    description: "Warm oatmeal topped with apples and a sprinkle of cinnamon.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Apple-Cinnamon-Oatmeal.jpeg?alt=media&token=demo-token",
    ingredients: ["Oats", "Milk or Water", "Apples", "Cinnamon", "Honey", "Butter"],
    instructions: "Cook oats with milk or water, stir in diced apples and cinnamon, top with honey and a pat of butter."
  },
  {
    title: "Seafood Gumbo",
    description: "A hearty Louisiana stew with seafood, sausage, and vegetables.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Seafood-Gumbo.jpeg?alt=media&token=demo-token",
    ingredients: ["Shrimp", "Crab", "Andouille Sausage", "Okra", "Onions", "Bell Peppers", "Celery", "Roux", "Stock"],
    instructions: "Make a roux, sauté vegetables, add stock and ingredients, simmer until flavors meld."
  },
  {
    title: "BBQ Tofu",
    description: "Marinated tofu grilled and glazed with barbecue sauce.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/BBQ-Tofu.jpeg?alt=media&token=demo-token",
    ingredients: ["Tofu", "BBQ Sauce", "Soy Sauce", "Maple Syrup", "Garlic", "Ginger"],
    instructions: "Marinate tofu in sauce mixture, grill or bake until caramelized."
  },
  {
    title: "Pesto Chicken Pasta",
    description: "Pasta tossed with chicken and a fresh basil pesto sauce.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Pesto-Chicken-Pasta.jpeg?alt=media&token=demo-token",
    ingredients: ["Pasta", "Chicken Breast", "Basil Pesto", "Parmesan Cheese", "Cherry Tomatoes", "Olive Oil", "Salt", "Pepper"],
    instructions: "Cook pasta and chicken, toss with pesto, add tomatoes and cheese, and serve."
  },
  {
    title: "Spinach Artichoke Dip",
    description: "A creamy and cheesy dip loaded with spinach and artichokes.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Spinach-Artichoke-Dip.jpeg?alt=media&token=demo-token",
    ingredients: ["Spinach", "Artichoke Hearts", "Cream Cheese", "Sour Cream", "Parmesan Cheese", "Garlic", "Salt", "Pepper"],
    instructions: "Mix all ingredients, bake until bubbly, and serve warm with chips or bread."
  },
  {
    title: "Black Bean Soup",
    description: "A hearty and nutritious soup made with black beans and spices.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Black-Bean-Soup.jpeg?alt=media&token=demo-token",
    ingredients: ["Black Beans", "Onions", "Garlic", "Carrots", "Celery", "Vegetable Broth", "Cumin", "Chili Powder"],
    instructions: "Sauté vegetables, add beans and broth, season, and simmer until flavors meld."
  },
  {
    title: "Strawberry Shortcake",
    description: "Layers of sponge cake, whipped cream, and fresh strawberries.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Strawberry-Shortcake.jpeg?alt=media&token=demo-token",
    ingredients: ["Sponge Cake", "Strawberries", "Sugar", "Whipped Cream"],
    instructions: "Slice cake, layer with strawberries and whipped cream, and serve."
  },
  {
    title: "Vegetable Biryani",
    description: "A fragrant Indian rice dish with mixed vegetables and spices.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Vegetable-Biryani.jpeg?alt=media&token=demo-token",
    ingredients: ["Basmati Rice", "Mixed Vegetables", "Yogurt", "Onions", "Garlic", "Ginger", "Biryani Spices", "Mint", "Cilantro"],
    instructions: "Cook rice separately, sauté vegetables with spices, layer with rice, garnish, and steam."
  },
  {
    title: "Chicken Satay",
    description: "Grilled chicken skewers served with a rich peanut sauce.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Chicken-Satay.jpeg?alt=media&token=demo-token",
    ingredients: ["Chicken Breast", "Soy Sauce", "Peanut Butter", "Coconut Milk", "Garlic", "Ginger", "Spices"],
    instructions: "Marinate chicken, skewer, grill, and serve with peanut sauce."
  },
  {
    title: "Avocado Smoothie",
    description: "A creamy smoothie made with ripe avocados and banana.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Avocado-Smoothie.jpeg?alt=media&token=demo-token",
    ingredients: ["Avocado", "Banana", "Milk", "Honey", "Ice"],
    instructions: "Blend all ingredients until smooth and serve chilled."
  },
  {
    title: "Beef Bolognese",
    description: "A rich and hearty meat sauce served over pasta.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Beef-Bolognese.jpeg?alt=media&token=demo-token",
    ingredients: ["Ground Beef", "Onions", "Garlic", "Tomato Paste", "Tomato Sauce", "Red Wine", "Carrots", "Celery", "Herbs"],
    instructions: "Sauté beef and vegetables, add paste and wine, simmer with sauce and herbs, serve over pasta."
  },
  {
    title: "Vegan Burrito Bowl",
    description: "A nutritious bowl with rice, beans, vegetables, and avocado.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Vegan-Burrito-Bowl.jpeg?alt=media&token=demo-token",
    ingredients: ["Rice", "Black Beans", "Corn", "Bell Peppers", "Avocado", "Lettuce", "Salsa", "Lime"],
    instructions: "Assemble bowl with rice, beans, vegetables, and top with avocado and salsa."
  },
  {
    title: "Chicken Tenders with Honey Mustard",
    description: "Crispy chicken tenders served with a sweet honey mustard dip.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Chicken-Tenders-Honey-Mustard.jpeg?alt=media&token=demo-token",
    ingredients: ["Chicken Breast", "Flour", "Eggs", "Breadcrumbs", "Honey", "Dijon Mustard", "Salt", "Pepper"],
    instructions: "Bread and fry chicken tenders, mix honey and mustard for dipping sauce."
  },
  {
    title: "Vegetable Tikka Masala",
    description: "A vegetarian version of the classic tikka masala with assorted vegetables.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Vegetable-Tikka-Masala.jpeg?alt=media&token=demo-token",
    ingredients: ["Mixed Vegetables", "Yogurt", "Tomato Puree", "Cream", "Garlic", "Ginger", "Tikka Masala Spices"],
    instructions: "Marinate and cook vegetables, prepare sauce with spices, combine and simmer with cream."
  },
  {
    title: "Chocolate Chip Pancakes",
    description: "Fluffy pancakes studded with chocolate chips for a sweet treat.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Chocolate-Chip-Pancakes.jpeg?alt=media&token=demo-token",
    ingredients: ["Flour", "Milk", "Eggs", "Baking Powder", "Sugar", "Chocolate Chips", "Butter"],
    instructions: "Prepare pancake batter, fold in chocolate chips, cook on griddle until bubbles form, flip and cook until done."
  },
  {
    title: "Thai Peanut Noodles",
    description: "Spicy and creamy noodles tossed in a homemade peanut sauce.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Thai-Peanut-Noodles.jpeg?alt=media&token=demo-token",
    ingredients: ["Noodles", "Peanut Butter", "Soy Sauce", "Honey", "Garlic", "Ginger", "Vegetables", "Lime Juice"],
    instructions: "Cook noodles, prepare peanut sauce, toss with noodles and sautéed vegetables, garnish with lime."
  },
  {
    title: "Chicken Burrito",
    description: "A large flour tortilla filled with seasoned chicken, rice, beans, and toppings.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Chicken-Burrito.jpeg?alt=media&token=demo-token",
    ingredients: ["Flour Tortillas", "Chicken Breast", "Rice", "Black Beans", "Cheddar Cheese", "Salsa", "Sour Cream", "Lettuce"],
    instructions: "Cook and season chicken, assemble tortilla with all fillings, roll tightly, and serve."
  },
  {
    title: "Vegan Chili",
    description: "A hearty and spicy chili made with beans and vegetables.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Vegan-Chili.jpeg?alt=media&token=demo-token",
    ingredients: ["Beans", "Tomatoes", "Onions", "Bell Peppers", "Corn", "Garlic", "Chili Powder", "Cumin"],
    instructions: "Sauté vegetables, add beans and tomatoes, season with spices, and simmer until flavors meld."
  },
  {
    title: "Pumpkin Soup",
    description: "A smooth and creamy soup made with roasted pumpkin and spices.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Pumpkin-Soup.jpeg?alt=media&token=demo-token",
    ingredients: ["Pumpkin", "Onions", "Garlic", "Vegetable Broth", "Cream", "Cinnamon", "Nutmeg", "Salt", "Pepper"],
    instructions: "Roast pumpkin, sauté onions and garlic, blend with pumpkin and broth, season, and add cream."
  },
  {
    title: "Eggplant Curry",
    description: "A flavorful curry featuring tender eggplant in a spicy sauce.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Eggplant-Curry.jpeg?alt=media&token=demo-token",
    ingredients: ["Eggplant", "Tomatoes", "Onions", "Garlic", "Ginger", "Curry Powder", "Coconut Milk", "Cilantro"],
    instructions: "Sauté onions, garlic, and ginger, add spices, cook eggplant, add tomatoes and coconut milk, simmer."
  },
  {
    title: "Quiche Florentine",
    description: "A savory pie filled with spinach, cheese, and eggs.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Quiche-Florentine.jpeg?alt=media&token=demo-token",
    ingredients: ["Pie Crust", "Spinach", "Eggs", "Milk", "Swiss Cheese", "Onions", "Salt", "Pepper"],
    instructions: "Sauté spinach and onions, mix with eggs and milk, pour into crust, add cheese, and bake."
  },
  {
    title: "Chicken Biryani",
    description: "A fragrant and spiced rice dish with marinated chicken.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Chicken-Biryani.jpeg?alt=media&token=demo-token",
    ingredients: ["Basmati Rice", "Chicken", "Yogurt", "Onions", "Garlic", "Ginger", "Biryani Spices", "Saffron", "Mint", "Cilantro"],
    instructions: "Marinate chicken, cook with spices and onions, layer with rice, garnish with herbs and saffron, and steam."
  }
];

const insertRecipes = async () => {
  try {
    await Recipe.insertMany(recipes);
    console.log('60 recipes inserted successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error inserting recipes:', error);
    mongoose.connection.close();
  }
};

insertRecipes();
