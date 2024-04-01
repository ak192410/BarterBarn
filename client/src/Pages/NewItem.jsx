import React, { useState } from 'react';
import './NewItem.css'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'; 
const NewItem = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const userEmail = cookies.Email;
  const handleNameChange = (e) => setName(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleImageChange = (e) => setImage(e.target.files[0]);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to send the file data in the request body
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('email', userEmail);
    const response = await fetch(`${process.env.REACT_APP_SERVERURL}/newitem`, {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      // Handle successful submission here
      console.log('Item submitted successfully'); 
      navigate("/");
    } else {
      // Handle errors here
      console.error('An error occurred while submitting the form');
    }
  };

  return (
    <div className="new-item-form-container">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>
          Item Name:
          <input type="text" value={name} onChange={handleNameChange} required />
        </label>
        <label>
          Description:
          <textarea value={description} onChange={handleDescriptionChange} required />
        </label>
        <label>
          Item Image:
          <input 
            type="file" 
            onChange={handleImageChange} 
            accept=".jpg,.jpeg,.png" 
            required 
          />
        </label>
        <button type="submit">Submit New Item</button>
      </form>
    </div>
  );
};

export default NewItem;
