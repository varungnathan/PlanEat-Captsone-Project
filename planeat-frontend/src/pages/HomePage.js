// planeat-frontend\src\pages\HomePage.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import './HomePage.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function HomePage() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [tdee, setTdee] = useState(null);
  const [activityLevel, setActivityLevel] = useState('1.2');
  const [activeTab, setActiveTab] = useState('bmi');
  const [barColors, setBarColors] = useState([
    'rgba(75,192,192,0.4)',
    'rgba(54,162,235,0.2)',
    'rgba(255,206,86,0.2)',
    'rgba(255,99,132,0.2)'
  ]);
  const [seasonalRecipes, setSeasonalRecipes] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchSeasonalRecipes = async () => {
      try {
        const response = await axios.get('${process.env.REACT_APP_BACKEND_URL}/api/seasonal-recipes');
        setSeasonalRecipes(response.data);
      } catch (error) {
        console.error('Error fetching seasonal recipes:', error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get('${process.env.REACT_APP_BACKEND_URL}/api/products');
        setProducts(response.data.slice(0, 3)); // Show the first 3 products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchSeasonalRecipes();
    fetchProducts();
  }, []);

  const handleBmiCalculate = () => {
    const heightInMeters = height / 100;
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
    setBmi(bmiValue);
    let updatedColors = [...barColors];
    if (bmiValue < 18.5) {
      updatedColors = ['rgba(75,192,192,1)', 'rgba(54,162,235,0.2)', 'rgba(255,206,86,0.2)', 'rgba(255,99,132,0.2)'];
    } else if (bmiValue < 24.9) {
      updatedColors = ['rgba(75,192,192,0.4)', 'rgba(54,162,235,1)', 'rgba(255,206,86,0.2)', 'rgba(255,99,132,0.2)'];
    } else if (bmiValue < 29.9) {
      updatedColors = ['rgba(75,192,192,0.4)', 'rgba(54,162,235,0.2)', 'rgba(255,206,86,1)', 'rgba(255,99,132,0.2)'];
    } else {
      updatedColors = ['rgba(75,192,192,0.4)', 'rgba(54,162,235,0.2)', 'rgba(255,206,86,0.2)', 'rgba(255,99,132,1)'];
    }
    setBarColors(updatedColors);
  };

  const handleTdeeCalculate = () => {
    if (bmi) {
      const tdeeValue = (bmi * activityLevel * 24).toFixed(2);
      setTdee(tdeeValue);
    }
  };

  const bmiData = {
    labels: ['Underweight', 'Normal', 'Overweight', 'Obese'],
    datasets: [
      {
        label: 'BMI Category',
        data: [18.5, 24.9, 29.9, 40],
        backgroundColor: barColors,
        borderColor: ['rgba(75,192,192,1)', 'rgba(54,162,235,1)', 'rgba(255,206,86,1)', 'rgba(255,99,132,1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mt-5">
      <section
        className="hero-section text-center mb-5"
        style={{
          backgroundImage: 'url("https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Header%2FRainbow%20Harvest%20Spectrum.jpeg?alt=media&token=0d243540-fbef-4033-8090-517702639cab")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '100px 20px',
          color: 'white',
          position: 'relative',
          borderRadius: '10px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            borderRadius: '10px',
          }}
        ></div>
        <h1 style={{ position: 'relative', zIndex: 2 }}>Welcome to PlanEat</h1>
        <p style={{ position: 'relative', zIndex: 2 }}>Your ultimate meal planning and recipe discovery tool!</p>
      </section>

      <section className="seasonal-recipes mb-5">
        <h2 className="text-center">Seasonal Recipes</h2>
        <div className="row">
          {seasonalRecipes.map((recipe, index) => (
            <div
              className="col-md-4 fade-in"
              key={recipe._id}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="card mb-4 card-morph">
                <img src={recipe.imageUrl} alt={recipe.title} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{recipe.title}</h5>
                  <p className="card-text">{recipe.description}</p>
                  <Link to={`/seasonal-recipes/${recipe._id}`} className="btn btn-primary">View Recipe</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="featured-products mb-5">
        <h2 className="text-center">Featured Products</h2>
        <div className="row">
          {products.map((product, index) => (
            <div
              className="col-md-4 fade-in"
              key={product._id}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="card mb-4 card-morph">
                <img src={product.imageUrl} alt={product.name} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">${product.price}</p>
                  <button className="btn btn-primary">Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="features-section my-5">
        <h2 className="text-center mb-4">What Makes PlanEat Special?</h2>
        <div className="row">
          <div className="col-md-4 text-center">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Header%2Fdifference_24dp_434343_FILL0_wght400_GRAD0_opsz24.png?alt=media&token=7e862577-b866-490c-ba2f-e3e40e18dc58"
              alt="Personalized Plans"
              className="img-fluid mb-3"
              style={{ maxWidth: '100px' }}
            />
            <h5>Personalized Plans</h5>
            <p>
              Get meal plans tailored to your dietary preferences, allergies, and health goals. Eat better, live healthier.
            </p>
          </div>
          <div className="col-md-4 text-center">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Header%2Ffeatured_seasonal_and_gifts_24dp_434343_FILL0_wght400_GRAD0_opsz24.png?alt=media&token=8381993c-3ad7-4733-b72b-192bf5d98934"
              alt="Seasonal Recipes"
              className="img-fluid mb-3"
              style={{ maxWidth: '100px' }}
            />
            <h5>Seasonal Recipes</h5>
            <p>
              Enjoy the best flavors of every season with recipes crafted using fresh, seasonal ingredients.
            </p>
          </div>
          <div className="col-md-4 text-center">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Header%2Fkitchen_24dp_434343_FILL0_wght400_GRAD0_opsz24.png?alt=media&token=26e78c24-cac7-4a03-9656-f460c14ecf20"
              alt="Smart Pantry"
              className="img-fluid mb-3"
              style={{ maxWidth: '100px' }}
            />
            <h5>Smart Pantry Management</h5>
            <p>
              Keep track of your pantry items, reduce waste, and save money with our smart pantry features.
            </p>
          </div>
        </div>
      </section>

      <section className="cta-section my-5 py-5" style={{ backgroundColor: '#f8f9fa', borderRadius: '10px' }}>
        <div className="row align-items-center">
          <div className="col-md-6">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Header%2Fother%2FEthereal%20Fabric%20Portrait.jpeg?alt=media&token=ff48aed9-7bb5-437c-8111-6e75cba9f6a0"
              alt="CTA"
              className="cta-image img-fluid rounded"
            />
          </div>
          <div className="col-md-6">
            <h3>Ready to Transform Your Meal Planning?</h3>
            <p>
              Join thousands of users who are simplifying their meal prep, reducing food waste, and enjoying delicious, nutritious meals every day.
            </p>
            <Link to="/signup" className="btn btn-primary btn-lg mt-3">
              Get Started Now
            </Link>
          </div>
        </div>
      </section>

      <section className="calculator-section text-center mb-5">
        <h2>Health Calculators</h2>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <ul className="nav nav-pills mb-3">
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'bmi' ? 'active' : ''}`}
                  onClick={() => setActiveTab('bmi')}
                >
                  BMI Calculator
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'tdee' ? 'active' : ''}`}
                  onClick={() => setActiveTab('tdee')}
                >
                  TDEE Calculator
                </button>
              </li>
            </ul>

            {activeTab === 'bmi' && (
              <div className="bmi-calculator">
                <h3>Calculate Your BMI</h3>
                <div className="form-group">
                  <input
                    type="number"
                    placeholder="Enter height (cm)"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="form-control mb-3"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="number"
                    placeholder="Enter weight (kg)"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="form-control mb-3"
                  />
                </div>
                <button onClick={handleBmiCalculate} className="btn btn-primary">
                  Calculate BMI
                </button>
                {bmi && <p className="mt-3">Your BMI is: {bmi}</p>}
                <Bar data={bmiData} />
              </div>
            )}

            {activeTab === 'tdee' && (
              <div className="tdee-calculator">
                <h3>Calculate Your TDEE</h3>
                <div className="form-group">
                  <label>Activity Level</label>
                  <select
                    className="form-control mb-3"
                    value={activityLevel}
                    onChange={(e) => setActivityLevel(e.target.value)}
                  >
                    <option value="1.2">Sedentary</option>
                    <option value="1.375">Lightly active</option>
                    <option value="1.55">Moderately active</option>
                    <option value="1.725">Very active</option>
                    <option value="1.9">Super active</option>
                  </select>
                </div>
                <button onClick={handleTdeeCalculate} className="btn btn-primary">
                  Calculate TDEE
                </button>
                {tdee && <p className="mt-3">Your TDEE is: {tdee} kcal/day</p>}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
