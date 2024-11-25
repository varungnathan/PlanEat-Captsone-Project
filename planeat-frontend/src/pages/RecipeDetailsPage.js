import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import '../pagestyles/RecipeDetailsPage.css';
 
function RecipeDetailsPage() {
  const { id } = useParams();
  const auth = getAuth();
  const user = auth.currentUser;
  const [recipe, setRecipe] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [userReview, setUserReview] = useState({ rating: 0, comment: '' });
  const [error, setError] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
 
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
        setError('Recipe not found.');
      }
    };
 
    fetchRecipe();
  }, [id, user]);
 
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
      alert('Failed to submit review.');
    }
  };
 
  const handleFavoriteToggle = async () => {
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
 
  const handleRatingClick = (ratingValue) => {
    setUserReview((prev) => ({ ...prev, rating: ratingValue }));
    setShowCommentBox(true);
  };
 
  const handleShareModal = () => {
    setIsShareModalOpen((prev) => !prev);
  };
 
  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
 
  if (error) return <div>{error}</div>;
  if (!recipe) return <div>Loading...</div>;
 
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">{recipe.title}</h1>
      <img
        src={recipe.imageUrl}
        alt={recipe.title}
        className="img-fluid mb-4"
        style={{ borderRadius: '10px' }}
      />
      <p>{recipe.description}</p>
      <h3>Ingredients</h3>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h3>Instructions</h3>
      <p>{recipe.instructions}</p>
      <h3 className="mt-5">Average Rating: {averageRating.toFixed(1)} / 5</h3>
      <div className="review-section mt-4">
        <h4>Rate This Recipe</h4>
        <div className="star-rating">
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
          <>
            <div className="form-group mt-3">
              <label>Comment:</label>
              <textarea
                className="form-control"
                value={userReview.comment}
                onChange={(e) => setUserReview({ ...userReview, comment: e.target.value })}
                rows="3"
              />
            </div>
            <button className="btn btn-primary mt-3" onClick={handleReviewSubmit}>
              Submit Review
            </button>
          </>
        )}
      </div>
      <h4 className="mt-5">Reviews</h4>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((review) => (
          <div key={review._id} className="review mb-3">
            <p>
              <strong>{review.userId.name}</strong> rated {review.rating}/5
            </p>
            <p>{review.comment}</p>
          </div>
        ))
      )}
      <div className="mt-3">
        <button
          className={`btn ${isFavorite ? 'btn-danger' : 'btn-secondary'}`}
          onClick={handleFavoriteToggle}
        >
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
        <button
          className="btn btn-primary ms-3"
          onClick={() => alert('Recipe saved!')}
        >
          Save Recipe
        </button>
        <button
          className="btn btn-secondary ms-3"
          onClick={handleShareModal}
        >
          {isShareModalOpen ? 'Close Sharing Options' : 'Share Recipe'}
        </button>
      </div>
      {isShareModalOpen && (
        <div className="share-modal mt-4">
          <h4>Share This Recipe</h4>
          <CopyToClipboard text={recipeLink} onCopy={handleCopy}>
            <button className="btn btn-outline-primary mt-2">
              {copied ? 'Link Copied!' : 'Copy Link'}
            </button>
          </CopyToClipboard>
          <div className="social-buttons mt-3">
            <a
              href={`https://wa.me/?text=Check out this recipe: ${recipeLink}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-success me-2"
            >
              Share on WhatsApp
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=Check out this recipe!&url=${recipeLink}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-info me-2"
            >
              Share on Twitter
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${recipeLink}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Share on Facebook
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
 
export default RecipeDetailsPage;