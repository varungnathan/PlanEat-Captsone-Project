import React from 'react';

function HomePage() {
  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1 className="display-4">Welcome to PlanEat</h1>
        <p className="lead">Your ultimate meal planning and recipe discovery tool!</p>
        <p>Explore recipes, plan meals, and get automated shopping lists tailored to your preferences.</p>
        <a href="/signup" className="btn btn-primary btn-lg mt-3">Get Started</a>
      </div>

      <div className="row mt-5">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body text-center">
              <h5 className="card-title">Recipe Search</h5>
              <p className="card-text">Find new and exciting recipes tailored to your preferences.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body text-center">
              <h5 className="card-title">Meal Planner</h5>
              <p className="card-text">Easily plan your meals for the week ahead.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body text-center">
              <h5 className="card-title">Shopping List</h5>
              <p className="card-text">Automatically generate shopping lists for your meal plans.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
