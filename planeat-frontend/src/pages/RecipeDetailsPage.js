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
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
 
  const recipeLink = `http://localhost:3000/recipes/${id}`;
 
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/recipes/${id}`);
        setRecipe(response.data);
      } catch (error) {
        setError('Recipe not found.');
      }
    };
 
    fetchRecipe();
  }, [id]);
 
  const handleSaveRecipe = async () => {
    if (!user) {
      alert('Please log in to save recipes.');
      return;
    }
 
    try {
      await axios.post(`http://localhost:5000/api/users/save-recipe/${user.uid}`, {
        recipeId: recipe._id,
      });
      alert('Recipe saved successfully!');
    } catch (error) {
      alert('Failed to save the recipe.');
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
 
      <button className="btn btn-secondary mt-3" onClick={handleSaveRecipe}>
        Save Recipe
      </button>
 
      {/* Share Button */}
      <button className="btn btn-secondary mt-3 ms-3" onClick={handleShareModal}>
        {isShareModalOpen ? 'Close Sharing Options' : 'Share Recipe'}
      </button>
 
      {/* Share Modal */}
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
 
