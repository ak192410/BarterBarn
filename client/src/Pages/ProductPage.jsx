import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProductPage.css'; 
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [offer, setOffer] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const authToken = cookies.AuthToken;
  const userEmail = cookies.Email;
  const navigate = useNavigate();
  const handleOfferChange = (e) => setOffer(e.target.value);
  useEffect(() => {
    const fetchProductDetails = async () => {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/item-details/${productId}`);
      if (response.ok) {
        const productData = await response.json();
        setProduct(productData);
      } else {
        console.error('Failed to load product details');
      }
    };

    fetchProductDetails();
  }, [productId]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const responseOffer = await fetch(`${process.env.REACT_APP_SERVERURL}/newoffer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ offer, userEmail, productId })
    });

    if (responseOffer.ok) {
      // Handle successful submission here
      console.log('Offer submitted successfully'); 
      navigate("/");
    } else {
      // Handle errors here
      console.error('An error occurred while submitting the form');
      console.log("SAD");
    }
  };
  if (!product) {
    return <div>Loading...</div>;
  }
  if(userEmail !== product.email || !authToken){
    return (
        <div className="product-page">
        <div className="product-details">
            <h1>{product.title}</h1>
            <img src={product.image} alt={product.title} />
            <p>{product.description}</p>
        </div>
        <div className="offer-section">
            <h2>Make an Offer</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
            <textarea value={offer} onChange={handleOfferChange} placeholder="Your offer..." />
            <button type="submit">Submit Offer</button>
            </form>
        </div>
        </div>
    );
  } else {
    return (
        <div className="product-page">
        <div className="product-details">
            <h1>{product.title}</h1>
            <img src={product.image} alt={product.title} />
            <p>{product.description}</p>
        </div>
        </div>
    );
  }
};

export default ProductPage;
