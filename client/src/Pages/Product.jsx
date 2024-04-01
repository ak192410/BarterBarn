import React, { useState, useEffect } from 'react';
import './Product.css'
const Product = ({ itemId }) => {
  const [itemDetails, setItemDetails] = useState({ name: '', description: '', image: '' });

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVERURL}/item-details/${itemId}`);
        if (response.ok) {
          const data = await response.json();
          setItemDetails(data);
        } else {
          console.error('Failed to load item details');
        }
      } catch (error) {
        console.error('Error fetching item details:', error);
      }
    };

    fetchItemDetails();
  }, [itemId]);

  return (
    <div className="item-card">
    <div className="item-image-wrapper">
    {itemDetails.image && <img className='item-image' src={itemDetails.image} alt={itemDetails.name} />}
    </div>
    <div className="item-info">
      <h3 className="item-name">{itemDetails.name}</h3>
      <p className="item-description">{itemDetails.description}</p>
    </div>
    </div>
  );
};

export default Product;