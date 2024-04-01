const PORT = process.env.PORT ?? 8000
const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
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
    const { email, password } = req.body

    try{
        const users = await pool.query('SELECT * FROM users WHERE email = $1', [email])
        if(!users.rows.length) return res.json({detail: "no such user"})
        const match = await bcrypt.compare(password, users.rows[0].hashedPassword)
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