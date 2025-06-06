import React from 'react';
import { assets } from '../../assets/assets';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-hero">
        <img src={assets.header_img} alt="About Joykoly" className="about-hero-img" />
        <div className="about-hero-content">
          <h1>About Joykoly</h1>
          <p>Where creativity meets joy! Discover our mission, values, and the vibrant community behind Joykoly.</p>
        </div>
      </div>
      <div className="about-content">
        <div className="about-card">
          <h2>Welcome to Joykoly</h2>
          <p>
            <strong>Joykoly</strong> celebrates life's little moments with creativity, color, and inspiration. Whether you're here for delightful content, beautifully crafted products, or to be part of a vibrant community, you're in the right place.
          </p>
        </div>
        <div className="about-card">
          <h2>Our Mission</h2>
          <p>
            To bring joy to everyday life through thoughtful design, meaningful connections, and a touch of wonder. We aim to spark creativity and spread happiness through everything we create and share.
          </p>
        </div>
        <div className="about-card">
          <h2>What We Do</h2>
          <ul>
            <li>✨ Creative content that uplifts and inspires</li>
            <li>🎨 Art and design that adds joy to your space or screen</li>
            <li>🌟 Products and experiences designed to bring smiles and spark imagination</li>
          </ul>
        </div>
        <div className="about-card">
          <h2>Why Joykoly?</h2>
          <p>
            The name "Joykoly" reflects our core values: <strong>Joy</strong> in every interaction, and a <strong>colorful</strong> approach to life. We believe that joy is a choice, and we're here to help you choose it—one beautiful moment at a time.
          </p>
        </div>
        <div className="about-card">
          <h2>Join the Joykoly Journey</h2>
          <p>
            Whether you're a curious explorer, a creative soul, or just someone who loves discovering beautiful things—we invite you to join our journey. Sign up for our newsletter, follow us on social media, or simply browse and enjoy.
          </p>
        </div>
        <div className="about-cta">
          <img src={assets.logo} alt="Joykoly Logo" className="about-logo" />
          <p>Let joy lead the way. <span className="about-highlight">Welcome to Joykoly.</span></p>
        </div>
      </div>
    </div>
  );
};

export default About;
