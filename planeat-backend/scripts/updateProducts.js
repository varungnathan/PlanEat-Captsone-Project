const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully.');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

// Product schema and model
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    calories: { type: Number, required: true },
    ingredients: [{ type: String, required: true }],
    shortDescription: { type: String, required: true },
    longDescription: { type: String },
    imageUrl: { type: String, required: true },
    origin: { type: String, required: true },
    type: { type: String, enum: ['Veg', 'Non-Veg'], required: true },
    price: { type: Number, required: true },
    history: { type: String },
    giftOptions: { type: String },
    technicalDetails: { type: String },
    purchaseInfo: { type: String },
    nutritionalInfo: {
      servingSize: { type: String },
      sodium: { type: String },
      potassium: { type: String },
      protein: { type: String },
      cholesterol: { type: String },
      totalFat: { type: String },
      saturatedFat: { type: String },
      transFat: { type: String },
      carbohydrates: { type: String },
      dietaryFiber: { type: String },
      sugars: { type: String },
    },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

// Update or insert products
const updateProducts = async () => {
  try {
    const filePath = path.join(__dirname, 'products.json');
    const productsData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    for (const product of productsData) {
      const existingProduct = await Product.findOne({ name: product.name });

      if (existingProduct) {
        // Update existing product
        await Product.updateOne(
          { name: product.name },
          { $set: { ...product, updatedAt: new Date() } }
        );
        console.log(`Updated: ${product.name}`);
      } else {
        // Insert new product
        const newProduct = new Product(product);
        await newProduct.save();
        console.log(`Inserted: ${product.name}`);
      }
    }

    console.log('Product updates completed successfully.');
  } catch (error) {
    console.error('Error updating products:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Main execution
const run = async () => {
  await connectDB();
  await updateProducts();
};

run();
