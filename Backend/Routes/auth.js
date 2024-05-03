const express = require('express');
const Usermodel = require('../models/users'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const router = express.Router();


/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Registers a new user with a unique username and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The unique username for the new user.
 *               password:
 *                 type: string
 *                 description: The password for the new user.
 *     responses:
 *       '200':
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User successfully registered
 *       '400':
 *         description: User already registered or invalid request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User already registered
 */
router.post('/register', async (req, res) => {
    const { username, password } = req.body; 
    const user = await Usermodel.findOne({ username }); 

    if (user) {
        return res.json({ message: "User already registered" });
    }

    const hashPassword = await bcrypt.hash(password, 10); 
    const newUser = new Usermodel({ username: username, password: hashPassword }); 
    await newUser.save();

    return res.json({ message: "User successfully registered" });
});



/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in a user
 *     description: Log in a user with their username and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *     responses:
 *       '200':
 *         description: User successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User successfully logged in
 *                 id:
 *                   type: string
 *                   example: "12345"
 *       '401':
 *         description: Incorrect password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Incorrect password
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.post('/login', async (req, res) => {
    const { username, password } = req.body; 
    try {
        const user = await Usermodel.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Incorrect username or password" });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: "Incorrect username or password" });
        }
        const token = jwt.sign({ id: user.id }, "your_secret_key", { expiresIn: '1h' });
        res.cookie("token", token, { httpOnly: true, secure: true });
        return res.status(200).json({ message: "User logged in", id: user.id });
    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
