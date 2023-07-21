import express from 'express';
import pool from '../db.js';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import {authenticateToken} from '../middleware/authorization.js';
import { jwtTokens } from '../utils/jwt-helpers.js';
import { sendvMail} from '../utils/sendVerificationEmail.js';
const router = express.Router();
let refreshToken=[];


router.get('/',authenticateToken,async (req,res)=>{
    try{
        const users=await pool.query('SELECT * FROM users');
        res.json({users:users.rows});
    }
    catch(error){
       res.status(500).json({error:error.message});
    }
});
router.get('/user/verify/:email', (req, res) => {
    const email=req.params.email;
    const token = true;
    console.log(email);
    console.log(token);
    savetoken(email,token);
      function savetoken(email,token){
        if(token===true){const updateQuery = 'UPDATE users SET token = $1 WHERE email = $2';
       pool.query(updateQuery, [token,email]);
     }
    };
    
    res.send(`Token verified: ${token}`);
    
  });




router.post('/',async (req,res)=>{
    try{
        const token = false;
        const email= req.body.email.toLowerCase();
        if(!email.includes('@webreate.com'))return res.status(401).json({error: "Enter only Webreate Email ID"});
        const hashedPassword = await bcrypt.hash(req.body.password,10);
        sendvMail(email);
        const newUser = await pool.query(
        'INSERT INTO users(email,password,name,token) VALUES($1,$2,$3,$4) RETURNING *',
        [email,hashedPassword,req.body.name,token]);
       
        res.json({users:newUser.rows[0]});
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
});

export default router;
