// planeat-frontend\src\App.js

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RecipeListPage from './pages/RecipeListPage';
import RecipeDetailsPage from './pages/RecipeDetailsPage';
import StorePage from './pages/StorePage';
import StoreDetails from './pages/StoreDetails';
import AccountManagement from './pages/AccountManagement';
import Cart from './pages/Cart';
import CheckoutPage from './pages/CheckoutPage';
import MealPlannerPage from './pages/MealPlannerPage';
import FamilyMealPlannerPage from './pages/FamilyMealPlannerPage';
import OrdersPage from './pages/OrdersPage';
import SeasonalRecipesPage from './pages/SeasonalRecipesPage';
import SeasonalRecipeDetailsPage from './pages/SeasonalRecipeDetailsPage';
import PantryPage from './pages/PantryPage';
import AddPantryItemPage from './pages/AddPantryItemPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setUserId(user.uid);
      } else {
        setIsAuthenticated(false);
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsAuthenticated(false);
      setUserId(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <Router>
      <div className="sticky-footer">
        <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
        <div className="container main-content mt-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/recipes" element={<RecipeListPage />} />
            <Route path="/recipes/:id" element={<RecipeDetailsPage />} />
            <Route path="/seasonal-recipes" element={<SeasonalRecipesPage />} />
            <Route path="/seasonal-recipes/:id" element={<SeasonalRecipeDetailsPage />} />
            <Route path="/store" element={<StorePage />} />
            <Route path="/store/:id" element={<StoreDetails />} />
            <Route path="/account" element={<AccountManagement />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/meal-planner" element={<MealPlannerPage />} />
            <Route path="/family-meal-planner" element={<FamilyMealPlannerPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/pantry" element={<PantryPage userId={userId} />} />
            <Route path="/pantry/add" element={<AddPantryItemPage userId={userId} />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
