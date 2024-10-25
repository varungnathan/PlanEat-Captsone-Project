import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

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
      <section className="hero-section text-center mb-5">
        <h1>Welcome to PlanEat</h1>
        <p>Your ultimate meal planning and recipe discovery tool!</p>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Asian-style%20Noodle%20Dish%20with%20Chicken%20and%20Vegetables.jpeg?alt=media&token=8dab3348-20c2-4842-a48a-f41fb13f5c91"
          alt="Asian Style Noodles"
          className="img-fluid mb-4"
          style={{ maxHeight: '400px', borderRadius: '10px' }}
        />
      </section>

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
