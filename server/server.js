const PORT = process.env.PORT ?? 8000
const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const multer = require('multer');
const upload = multer();
app.use(cors())
app.use(express.json());
app.listen(PORT, ( )=> console.log(`Server running on PORT ${PORT}`))



//signup
app.post('/signup', async(req, res) => {
    console.log(req.body)
    const { email, password } = req.body
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)
    try{
        const userSignUp = await pool.query('INSERT INTO users(email, hashed_password) VALUES($1, $2)',
        [email, hashedPassword])
        const token = jwt.sign({email}, 'secret', {expiresIn: '1hr'})
        res.json({email, token})
    } catch (err) {
        console.error()
        if (err) {
            res.json({detail: err.detail})
        }
    }
})
//login
app.post('/login', async(req, res) => {
    console.log(req.body)
    const { email, password } = req.body

    try{
        const users = await pool.query('SELECT * FROM users WHERE email = $1', [email])
        if(!users.rows.length) return res.json({detail: "no such user"})
        const match = await bcrypt.compare(password, users.rows[0].hashed_password)
        if(match) {
            const token = jwt.sign({email}, 'secret', {expiresIn: '1hr'})
            res.json({email, token})
        } else {
            res.json({detail: "Wrong Username or Password"})
        }
    } catch (err) {
        console.error()
    }
})

//new listing
app.post('/newItem', upload.single('image'), async (req, res) => {
    const { name, description, email } = req.body;
    const imageBuffer = req.file.buffer; // Image is here as a buffer if using multer.
  
    try {
      await pool.query('INSERT INTO items (originator_email, name, description, image) VALUES ($1, $2, $3, $4)', 
      [
        email,
        name,
        description,
        imageBuffer, // For binary data, you can directly store the buffer.
      ]);
      res.send('Item with image uploaded successfully');
    } catch (err) {
      console.error('Error saving item with image', err);
      res.status(500).send('Error saving item with image');
    }
})

app.post('/newoffer', async(req, res) => {
  const { offer, userEmail, productId } = req.body;
  console.log(productId, userEmail, offer)
  try{
    await pool.query('INSERT INTO offers (item_id, email, offer) VALUES ($1, $2, $3)', 
      [
        productId,
        userEmail,
        offer
      ]);
    res.send('Success')
} catch (err) {
    console.error()
    console.log(err)
    res.status(500).send('Error with offer');
}
})

app.get('/item-details/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const query = 'SELECT name, description, image, originator_email FROM items WHERE id = $1';
      const result = await pool.query(query, [id]);
  
      if (result.rows.length > 0) {
        const item = result.rows[0];
        const imageBuffer = item.image;
        const imageBase64 = imageBuffer.toString('base64');
        imageDataUri = `data:image/png;base64,${imageBase64}`;
  
        // Send the item details along with the image data URI
        res.json({
          name: item.name,
          description: item.description,
          email: item.originator_email,
          image: imageDataUri
        });
      } else {
        res.status(404).send('Item not found');
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  })
  app.get('/products', async (req, res) => {
    try {
      const query = 'SELECT id FROM items'; // Add other fields as necessary
      const result = await pool.query(query);
      res.json(result.rows); // Sends all product data to the client
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  })
  