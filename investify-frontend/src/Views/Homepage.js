import React, { useState } from "react";
import "../App.css";
import logo from "../Images/Investify.png";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

let open = 0;
function showLoginCard() {
  const loginCard = document.getElementById("loginCard");
  if (open === 0) {
    loginCard.style.display = "flex";
    open = 1;
  } else {
    loginCard.style.display = "none";
    open = 0;
  }
}

export default function Homepage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/send-otp", { email });
      setOtpSent(true);
      document.getElementById('success-msg').style.display = 'flex';
    } catch (err) {
      console.log(err);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/verify-otp", { email, otp });
      if (response.data.success) {
        navigate('/invest/equity')
      } else {
        alert("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  const hide = (()=>{
    let toHide = document.getElementById('success-msg');
    toHide.style.display = 'none';
  })

  return (
    <div className="primary-grid">
      <div className="pos-abs hide" id="success-msg">
        <div>OTP Successfully Sent To Your Email Address!</div>
        <span onClick={hide}>{"   "}X</span>
      </div>
      <div className="login-card pos-abs abs-center hide" id="loginCard">
        <div className="left-section">
          <h1>Simple, Free Investing.</h1>
          <p>Stocks</p>
        </div>
        <div className="right-section">
          <h2 className="mar-top">Welcome to Investify!</h2>
          <button className="google-btn"><img src="https://cdn2.hubspot.net/hubfs/53/image8-2.jpg" alt="Google"/>Continue with Google</button>
          <p>Or</p>
          {otpSent ? (
            <form onSubmit={handleOtpSubmit}>
              <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)}/>
              <button className="continue-btn" type="submit">Verify OTP</button>
            </form>
          ) : (
            <form onSubmit={handleEmailSubmit}>
              <input type="email" placeholder="Your Email Address" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
              <button className="continue-btn" type="submit">Continue</button>
            </form>
          )}
          <p className="terms">By proceeding, I agree to <a href="/">T&C</a>,{" "}
            <a href="/">Privacy Policy</a> & <a href="/">Tariff Rates</a>
          </p>
        </div>
      </div>
      <div className="primary-flex">
        <div className="primary-flex float-33 justify-center">
          <img src={logo} alt="" width={100} height={100}></img>
        </div>
        <div className="primary-flex float-33 justify-center align-center">
          <input placeholder="What Are You Searching For Today?" className="search-bar"/>
        </div>
        <div className="primary-flex float-33 justify-center align-center">
          <button className="login-btn font-playfair pointer" onClick={showLoginCard}>Get Started With Investing!</button>
        </div>
      </div>
      <div className="primary-flex flex-col mar-top padding-main wheaten font-playfair">
        <h1 className="primary-flex justify-center heading">All Things Finance</h1>
        <h1 className="primary-flex justify-center heading">Invest Now, Risk Free</h1>
        <p className="primary-flex justify-center text-enlarge">Built For A Growing India!</p>
        <div className="primary-flex mar-main justify-center align-center">
          <button className="login-btn font-playfair pointer">Login Or Sign Up Now!</button>
        </div>
      </div>
    </div>
  );
}