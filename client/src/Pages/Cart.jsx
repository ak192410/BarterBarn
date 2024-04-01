import React, { useState, useEffect } from 'react';
import Product from './Product';
import './Shop.css'
import { useCookies } from 'react-cookie';
const Cart = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const authToken = cookies.AuthToken
  const userEmail = cookies.Email
  const [productIds, setProductIds] = useState([]);
  useEffect(() => {
    const fetchProductIds = async () => {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/productsCart/${userEmail}`);
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

export default Cart