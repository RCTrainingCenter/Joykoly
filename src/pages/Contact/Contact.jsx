import React from 'react';
import { assets } from '../../assets/assets';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-page">
      <div className="contact-hero">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you! Whether you have a question, suggestion, or just want to say hello, feel free to reach out.</p>
      </div>
      <div className="contact-container">
        <div className="contact-info">
          <img src={assets.logo} alt="Logo" className="contact-logo" />
          <h2>Joykoly Publications Ltd.</h2>
          <p>109, Green Road, Farmgate<br />Dhaka-1205, Bangladesh</p>
          <div className="contact-socials">
            <img src={assets.facebook_icon} alt="Facebook" />
            <img src={assets.twitter_icon} alt="Twitter" />
            <img src={assets.linkedin_icon} alt="LinkedIn" />
          </div>
          <div className="contact-details">
            <span><b>Phone:</b> +01-678-343-450</span>
            <span><b>Email:</b> info.joykoly@gmail.com</span>
          </div>
        </div>
        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required placeholder="Your Name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required placeholder="Your Email" />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input type="text" id="subject" name="subject" placeholder="Subject" />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="5" required placeholder="Type your message..."></textarea>
          </div>
          <button type="submit" className="contact-submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
