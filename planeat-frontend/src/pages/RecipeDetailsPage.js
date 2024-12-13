// planeat-frontend\src\pages\RecipeDetailsPage.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import '../pagestyles/RecipeDetailsPage.css';
import logo from '../pagestyles/pdflogo.png';

function RecipeDetailsPage() {
  const { id } = useParams();
  const auth = getAuth();
  const user = auth.currentUser;

  const [recipe, setRecipe] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [userReview, setUserReview] = useState({ rating: 0, comment: '' });
  const [isFavorite, setIsFavorite] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [copied, setCopied] = useState(false);
  const recipeLink = `http://localhost:3000/recipes/${id}`;

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/recipes/${id}`);
        setRecipe(response.data);
        setReviews(response.data.reviews);
        setAverageRating(response.data.averageRating);

        if (user) {
          const favoritesResponse = await axios.get(
            `http://localhost:5000/api/users/favorites/${user.uid}`
          );
          const isFavorited = favoritesResponse.data.favorites.some(
            (favorite) => favorite._id === id
          );
          setIsFavorite(isFavorited);
        }
      } catch (error) {
        console.error('Error fetching recipe details:', error);
      }
    };

    fetchRecipe();
  }, [id, user]);

  const handleAddToFavorites = async () => {
    if (!user) {
      alert('Please log in to manage favorites.');
      return;
    }
    try {
      if (isFavorite) {
        await axios.delete(`http://localhost:5000/api/users/favorites/${user.uid}/${id}`);
        setIsFavorite(false);
      } else {
        await axios.post(`http://localhost:5000/api/users/favorites/${user.uid}`, {
          recipeId: id,
        });
        setIsFavorite(true);
      }
    } catch (error) {
      alert('Failed to update favorites.');
    }
  };

  const handleReviewSubmit = async () => {
    if (!user) {
      alert('Please log in to submit a review.');
      return;
    }
    try {
      const reviewData = {
        userId: user.uid,
        rating: userReview.rating,
        comment: userReview.comment,
      };
      const response = await axios.post(`http://localhost:5000/api/recipes/${id}/reviews`, reviewData);
      setReviews(response.data.reviews);
      setUserReview({ rating: 0, comment: '' });
      setShowCommentBox(false);
    } catch (error) {
      alert('Review Already Exists');
    }
  };

  const handleRatingClick = (ratingValue) => {
    setUserReview((prev) => ({ ...prev, rating: ratingValue }));
    setShowCommentBox(true);
  };

  const downloadPDF = async () => {
    try {
      const doc = new jsPDF();
      const imgWidth = 40;
      const imgHeight = 15;
      const imgX = (210 - imgWidth) / 2;
      const imgY = 10;

      doc.addImage(logo, 'PNG', imgX, imgY, imgWidth, imgHeight);
      doc.setFont('times', 'normal');
      doc.setFontSize(12);
      doc.text('299 Doon Valley Dr, Kitchener, ON CA, N2G 4M4', 105, 30, null, null, 'center');
      doc.text('Phone: +1 2268999660', 105, 35, null, null, 'center');
      doc.text('E-Mail: innovators@conestogac.on.ca', 105, 40, null, null, 'center');
      doc.setFont('times', 'bold');
      doc.setFontSize(14);
      doc.text('Recipe Details', 10, 50);

      if (recipe) {
        doc.setFont('times', 'normal');
        doc.setFontSize(12);
        doc.text(`Title: ${recipe.title}`, 10, 60);
        doc.text(`Description: ${recipe.description}`, 10, 70);
        doc.text('Ingredients:', 10, 80);
        recipe.ingredients.forEach((ingredient, index) => {
          doc.text(`- ${ingredient}`, 15, 90 + index * 10);
        });
        doc.text('Instructions:', 10, 110 + recipe.ingredients.length * 10);
        doc.text(recipe.instructions, 15, 120 + recipe.ingredients.length * 10);
      }

      doc.save(`${recipe?.title || 'Recipe'}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  if (!recipe) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="img-fluid recipe-image"
          />
        </div>
        <div className="col-md-6">
          <h1 className="recipe-title">{recipe.title}</h1>
          <p className="recipe-description">{recipe.description}</p>
          <h3>Ingredients</h3>
          <ul className="ingredients-list">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <h3>Instructions</h3>
          <p className="instructions-text">{recipe.instructions}</p>
          <div className="favorite-and-share mt-4">
            <button
              className={`btn ${isFavorite ? 'btn-danger' : 'btn-secondary'}`}
              onClick={handleAddToFavorites}
            >
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
            <CopyToClipboard text={recipeLink} onCopy={() => setCopied(true)}>
              <button className="btn btn-primary ms-3">
                {copied ? 'Link Copied!' : 'Share Recipe'}
              </button>
            </CopyToClipboard>
            <button className="btn btn-success ms-3" onClick={downloadPDF}>
              Download PDF
            </button>
          </div>
        </div>
      </div>
      <div className="reviews-section mt-5">
        <h3>Average Rating: {averageRating.toFixed(1)} / 5</h3>
        <div className="rating-stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${userReview.rating >= star ? 'selected' : ''}`}
              onClick={() => handleRatingClick(star)}
            >
              ★
            </span>
          ))}
        </div>
        {showCommentBox && (
          <div className="mt-3">
            <textarea
              className="form-control"
              rows="3"
              placeholder="Leave a comment"
              value={userReview.comment}
              onChange={(e) => setUserReview({ ...userReview, comment: e.target.value })}
            ></textarea>
            <button className="btn btn-primary mt-2" onClick={handleReviewSubmit}>
              Submit Review
            </button>
          </div>
        )}
        <h4 className="mt-5">User Reviews</h4>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="review-card">
              <p>
                <strong>{review.userId.name}</strong> rated {review.rating}/5
              </p>
              <p>{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default RecipeDetailsPage;
