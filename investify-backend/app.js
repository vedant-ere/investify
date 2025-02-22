import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

const app = express();

dotenv.config();
app.use(bodyParser.json());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '../investify-frontend/build')));

import mongoose from 'mongoose';
const mongoURI = process.env.MONGO_URI;
mongoose.connect("mongodb://localhost:27017/Investify")
.then(() => {
  console.log("Connection Succeded");
}).catch((err) => {
  console.log(err);
  process.exit(1);
});

const oneDay = 60 * 60 * 24 * 1000;
const sessionMiddleware = session({
  secret: process.env.SECRET_KEY,
  saveUninitialized: true,
  cookie: { maxAge: oneDay },
  resave: false,
  secure: true
});

app.use(sessionMiddleware);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../investify-frontend/build', 'index.html'));
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_ID,
    pass: process.env.MAIL_PASS
  },
});

import generateOTP from "./generateOTP.js";
import generateRandomSequence from './generateRandomSessionID.js';
app.post('/send-otp', async (req, res) => {
  try {
    const { email } = req.body;
    // console.log(req.body);
    req.session.otp = await generateOTP(100000, 999999);
    console.log(req.session.otp);
    const mailOptions = {
      from: process.env.MAIL_ID,
      to: email,
      subject: 'Welcome To Investify! - OTP For Login',
      text: `Your OTP for Login at www.investify.in is: ${req.session.otp}. This OTP is only valid for the next 10 minutes. Please Do Not Share This OTP With Anyone even if the person claims to our employee.\nMutual Funds and Equity are subject to Market Risks. Please Analyze all the terms and conditions before Investing.\nHappy Investing!`
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return console.error(err);
      }
      // console.log("Sent Successfully");
    });
    req.session.userId = await generateRandomSequence(16);
    // console.log(req.session);
    res.status(200).send("Successful");
  } catch (error) {
    console.log(error);
  }
});

const userSchema = new mongoose.Schema({
  userId: String,
  KYC: Boolean,
  uuID: String,
  userName: String,
  amount: Number,
  sharesBought: Array
});

import { findUser } from './searchIntoUser.js';

const user = new mongoose.model('users', userSchema);
app.post('/verify-otp', async (req, res) => {
  try {
    // console.log(`session: ${req.session.otp}`);
    // console.log(`req: ${req.body.otp}`);
    const user_ = await findUser(req.body.email);
    if (req.body.otp == req.session.otp) {
      if (user_) {
        req.session.userId = user_.uuID;
        req.session.amount = user_.amount;
        res.status(200).send({ "success": true });
        // console.log(req.session);
      } else {
        const body = { userId: req.body.email, KYC: true, uuID: req.session.userId, userName: req.body.email.slice(0, 4), amount: 0, sharesBought: [] };
        req.session.amount = body.amount;
        let saveobj = new user(body);
        saveobj.save().then(() => {
          // console.log("saved");
          res.status(200).send({ "success": true });
        });
      }
    } else {
      res.status(401).send({ "success": false });
    }
  } catch (error) {
    console.log(error);
  }
});

app.get('/invest/equity', async (req, res) => {
  res.sendFile(path.join(__dirname, '../investify-frontend/build', 'index.html'));
});

app.get('/invest/equity/:shareName', (req, res) => {
  res.sendFile(path.join(__dirname, '../investify-frontend/build', 'index.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../investify-frontend/build', 'index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});