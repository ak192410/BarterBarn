import React, { useState, useEffect } from 'react';
import Product from './Product';
import './Shop.css';
const Shop = () => {
  const [productIds, setProductIds] = useState([]);
  useEffect(() => {
    const fetchProductIds = async () => {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/products`);
      if (response.ok) {
        const ids = await response.json();
        setProductIds(ids);
      } else {
        // Handle errors
        console.error('Failed to fetch product ids');
      }
    };

    fetchProductIds();
  }, []);
  console.log(productIds);
  return (
    <div className='shop-container'>
      {productIds.map((id) => <Product itemId={id.id}/>)}
      
    </div>
  )
}

export default Shop