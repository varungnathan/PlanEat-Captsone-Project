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
          src="https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Rustic%20Fresh%20Salad.jpeg?alt=media&token=bdccf90a-6f38-404c-a186-84cdf3413e85" 
          alt="Rustic Fresh Salad" 
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
                src="https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Rustic%20Fresh%20Salad.jpeg?alt=media&token=bdccf90a-6f38-404c-a186-84cdf3413e85" 
                alt="Recipe 1" 
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
                src="<RECIPE_IMAGE_URL_FROM_FIREBASE_2>" 
                alt="Recipe 2" 
                className="card-img-top" 
              />
              <div className="card-body">
                <h5 className="card-title">Recipe 2</h5>
                <p className="card-text">A brief description of Recipe 2.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4">
              <img 
                src="<RECIPE_IMAGE_URL_FROM_FIREBASE_3>" 
                alt="Recipe 3" 
                className="card-img-top" 
              />
              <div className="card-body">
                <h5 className="card-title">Recipe 3</h5>
                <p className="card-text">A brief description of Recipe 3.</p>
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
            <p>Get recipe recommendations based on your dietary preferences and nutritional goals.</p>
          </div>
          <div className="col-md-4">
            <h5>Meal Planner</h5>
            <p>Easily plan your weekly meals and generate automatic shopping lists.</p>
          </div>
          <div className="col-md-4">
            <h5>Nutrition Tracking</h5>
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
