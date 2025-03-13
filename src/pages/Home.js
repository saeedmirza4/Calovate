import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the CSS styles extracted from your HTML file

function Home() {
  // Get today's date for the dynamic greeting
  const today = new Date();
  const hours = today.getHours();
  
  let greeting;
  if (hours < 12) {
    greeting = "Good morning";
  } else if (hours < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  return (
    <div className="container">
      {/* Hero Section */}
      <div className="hero">
        <h1>Welcome to Calovate</h1>
        <p>Your personal nutrition tracker for monitoring calories, protein, carbs, sugar, and fat.</p>
        <p className="greeting">{greeting}! Start your journey to better health today.</p>
      </div>
      
      {/* Main Action Cards */}
      <div className="card-grid">
        <div className="card card-blue">
          <div className="card-icon">
            <i className="fas fa-plus-circle fa-2x"></i>
          </div>
          <h3>Track Food</h3>
          <p>Log your meals and monitor your daily nutrition intake easily</p>
          <Link to="/add-entry" className="btn btn-blue">Add Entry</Link>
        </div>
        
        <div className="card card-green">
          <div className="card-icon">
            <i className="fas fa-chart-line fa-2x"></i>
          </div>
          <h3>View Progress</h3>
          <p>Visualize your nutrition trends with interactive charts and insights</p>
          <Link to="/dashboard" className="btn btn-green">Dashboard</Link>
        </div>
      </div>
      
      {/* Why Track Section */}
      <h2 className="section-title">Why Track Your Nutrition?</h2>
      <div className="card-grid-3">
        <div className="info-card info-card-blue">
          <h5>Awareness</h5>
          <p>Understanding what you eat helps make better food choices and improves your relationship with food</p>
        </div>
        <div className="info-card info-card-green">
          <h5>Accountability</h5>
          <p>Regular tracking keeps you accountable to your nutrition goals and helps maintain consistency</p>
        </div>
        <div className="info-card info-card-purple">
          <h5>Achievement</h5>
          <p>Visualize your progress, celebrate your successes, and stay motivated throughout your journey</p>
        </div>
      </div>
      
      {/* Featured Articles */}
      <h2 className="section-title">Featured Articles</h2>
      <div className="card-grid-3">
        <div className="article-card">
          <div className="article-image">
            <img src="/api/placeholder/600/400" alt="Balanced Diet" />
            <div className="article-tag tag-blue">Nutrition</div>
          </div>
          <div className="article-content">
            <h5>The Benefits of a Balanced Diet</h5>
            <p>Learn how a balanced diet can improve your overall health and well-being.</p>
            <Link to="/article/1" className="article-link blue">
              Read More <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
        
        <div className="article-card">
          <div className="article-image">
            <img src="/api/placeholder/600/400" alt="Superfoods" />
            <div className="article-tag tag-green">Food</div>
          </div>
          <div className="article-content">
            <h5>Top 10 Superfoods</h5>
            <p>Discover the top superfoods that can boost your nutrition and health.</p>
            <Link to="/article/2" className="article-link green">
              Read More <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
        
        <div className="article-card">
          <div className="article-image">
            <img src="/api/placeholder/600/400" alt="Motivation" />
            <div className="article-tag tag-purple">Motivation</div>
          </div>
          <div className="article-content">
            <h5>How to Stay Motivated</h5>
            <p>Get tips on how to stay motivated and achieve your nutrition goals.</p>
            <Link to="/article/3" className="article-link purple">
              Read More <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="cta-section">
        <h2>Ready to transform your health?</h2>
        <p>Join thousands of users who have improved their nutrition habits with Calovate</p>
        <Link to="/signup" className="btn btn-white">Get Started Today</Link>
      </div>
    </div>
  );
}

export default Home;
