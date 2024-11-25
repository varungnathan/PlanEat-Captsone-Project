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
  const [error, setError] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
 
  const recipeLink = `http://localhost:3000/recipes/${id}`;
 
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/recipes/${id}`);
        setRecipe(response.data);
 
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
 
  const handleSaveRecipe = async () => {
    if (!user) {
      alert('Please log in to save recipes.');
      return;
    }
 
    try {
      await axios.post(`http://localhost:5000/api/users/save-recipe/${user.uid}`, {
        recipeId: id,
      });
      alert('Recipe saved successfully!');
    } catch (error) {
      alert('Failed to save the recipe.');
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
 
      <div className="mt-3">
        <button
          className={`btn ${isFavorite ? 'btn-danger' : 'btn-secondary'}`}
          onClick={handleFavoriteToggle}
        >
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
 
        <button
          className="btn btn-primary ms-3"
          onClick={handleSaveRecipe}
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