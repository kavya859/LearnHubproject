import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <header className="hero-section">
        <h1>Welcome to LearnHub 🚀</h1>
        <p>Your one-stop platform to learn, grow, and succeed</p>
        <Link to="/courses" className="explore-btn">Explore Courses</Link>
      </header>

      <section className="features-section">
        <div className="feature-card">
          <h3>📚 100+ Quality Courses</h3>
          <p>Hand-picked courses designed by experts for every level.</p>
        </div>
        <div className="feature-card">
          <h3>💻 Learn at Your Pace</h3>
          <p>Flexible and self-paced learning from anywhere, anytime.</p>
        </div>
        <div className="feature-card">
          <h3>🎓 Certification</h3>
          <p>Get certified after completing courses to boost your career.</p>
        </div>
      </section>

      <footer className="footer">
        <Link to="/about">About</Link> | 
        <Link to="/contact"> Contact</Link> | 
        <Link to="/faq"> FAQ</Link>
      </footer>
    </div>
  );
}

export default Home;

