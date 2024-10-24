import React from 'react';

function HomePage() {
  return (
    <div className="container mt-5">
      {/* Hero Section */}
      <section className="hero-section text-center mb-5">
        <h1>Welcome to PlanEat</h1>
        <p>Your ultimate meal planning and recipe discovery tool!</p>
        <p>
          Explore new recipes, plan your meals, and get automated shopping lists tailored to your preferences.
        </p>
        <img 
          src="https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Asian-style%20Noodle%20Dish%20with%20Chicken%20and%20Vegetables.jpeg?alt=media&token=8dab3348-20c2-4842-a48a-f41fb13f5c91" 
          alt="Asian Style Noodles" 
          className="img-fluid mb-4" 
          style={{ maxHeight: '400px', borderRadius: '10px' }} 
        />
      </section>

      {/* Featured Recipes Section */}
      <section className="featured-recipes mb-5">
        <h2 className="text-center">Featured Recipes</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="card mb-4">
              <img 
                src="https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Refined%20Culinary%20Plate%20of%20Pasta.jpeg?alt=media&token=cb6c9ec7-677c-4464-b3ce-fff1f42fa84c" 
                alt="Rustic Fresh Salad" 
                className="card-img-top" 
              />
              <div className="card-body">
                <h5 className="card-title">Rustic Fresh Salad</h5>
                <p className="card-text">A delicious and healthy salad with fresh ingredients.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4">
              <img 
                src="https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Citrus%20Spectrum%20on%20Dark%20Wood.jpeg?alt=media&token=6480669a-5214-4b01-b138-298eb6d9d761" 
                alt="Citrus Spectrum" 
                className="card-img-top" 
              />
              <div className="card-body">
                <h5 className="card-title">Citrus Spectrum</h5>
                <p className="card-text">A colorful spectrum of citrus fruits, perfect for fresh and zesty meals.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4">
              <img 
                src="https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Summer%20Refreshment%20Drinks.jpeg?alt=media&token=7e3672a7-9f9d-46db-93fc-f646ac128e3a" 
                alt="Summer Refreshment Drinks" 
                className="card-img-top" 
              />
              <div className="card-body">
                <h5 className="card-title">Summer Refreshment Drinks</h5>
                <p className="card-text">Cool off with these refreshing summer drinks packed with flavor.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section text-center mb-5">
        <h2>Why Choose PlanEat?</h2>
        <div className="row">
          <div className="col-md-4">
            <h5>Personalized Recipes</h5>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Mouthwatering%20Hamburger%20Close-Up.jpeg?alt=media&token=1f4decad-e279-4dbd-8ccb-fa323816823d"
              alt="Mouthwatering Hamburger"
              className="img-fluid mb-3"
              style={{ maxHeight: '200px', borderRadius: '10px' }}
            />
            <p>Get recipe recommendations based on your dietary preferences and nutritional goals.</p>
          </div>
          <div className="col-md-4">
            <h5>Meal Planner</h5>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Vibrant%20Fruit%20and%20Granola%20Bowl%20with%20Edible%20Flowers.jpeg?alt=media&token=a369fcfe-0c4d-43fb-9748-41fa6ba9eda9"
              alt="A Vibrant Granola Bowl"
              className="img-fluid mb-3"
              style={{ maxHeight: '200px', borderRadius: '10px' }}
            />
            <p>Easily plan your weekly meals and generate automatic shopping lists.</p>
          </div>
          <div className="col-md-4">
            <h5>Nutrition Tracking</h5>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Serene%20Glass%20of%20Water.jpeg?alt=media&token=98fcdb47-5004-419b-92de-fe72652e465d"
              alt="A Glass of Water"
              className="img-fluid mb-3"
              style={{ maxHeight: '200px', borderRadius: '10px' }}
            />
            <p>Track your nutritional intake and set daily calorie and macronutrient goals.</p>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="video-section text-center mb-5">
        <h2>Watch How It Works</h2>
        <video controls className="img-fluid">
          <source src="<YOUR_VIDEO_URL_FROM_FIREBASE>" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>
    </div>
  );
}

export default HomePage;
