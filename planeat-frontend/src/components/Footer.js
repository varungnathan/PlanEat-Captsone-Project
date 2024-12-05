// planeat-frontend\src\components\Footer.js

import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>About PlanEat</h5>
            <p className="text-justify">
              PlanEat is your one-stop platform for meal planning, recipe discovery, and managing your ready-to-cook
              meals. Empowering users to plan healthy, organized, and delicious meals for themselves and their families.
            </p>
          </div>
          <div className="vertical-divider"></div>
          <div className="col-md-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled quick-links">
              <li>
                <a href="/" className="quick-link">Home</a>
              </li>
              <li>
                <a href="/recipes" className="quick-link">Recipes</a>
              </li>
              <li>
                <a href="/meal-planner" className="quick-link">Meal Planner</a>
              </li>
              <li>
                <a href="/store" className="quick-link">Food Store</a>
              </li>
            </ul>
          </div>
          <div className="vertical-divider"></div>
          <div className="col-md-4">
            <h5>Contact Us</h5>
            <p>
              <strong>Email:</strong> innovators@conestogac.on.ca<br />
              <strong>Phone:</strong> +1 2268999660<br />
              <strong>Location:</strong> 299 Doon Valley Dr,  Kitchener, ON CA, N2G 4M4
            </p>
          </div>
        </div>
        <hr />
        <div className="text-center mt-3">
          <p>&copy; 2024 PlanEat Capstone Project - Varun Gopinath | Thajudheen VA | Rameshwaran M</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
