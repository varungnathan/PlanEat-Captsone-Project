import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h1>{product.name}</h1>
      <img
        src={product.imageUrl}
        alt={product.name}
        className="img-fluid mb-4"
        style={{ maxHeight: '400px', borderRadius: '10px' }}
      />
      <p><strong>Calories:</strong> {product.calories}</p>
      <p><strong>Ingredients:</strong> {product.ingredients.join(', ')}</p>
      <p>{product.shortDescription}</p>
      <p><strong>Origin:</strong> {product.origin}</p>
    </div>
  );
}

export default ProductDetailsPage;
