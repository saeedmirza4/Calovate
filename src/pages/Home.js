import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container mt-5">
      <div className="jumbotron">
        <h1 className="display-4">Welcome to Calovate!</h1>
        <p className="lead">Track your nutrition data including calories, protein, carbs, sugar, and fat.</p>
        <hr className="my-4" />
        <p>Start tracking your nutrition today for a healthier tomorrow.</p>
        <Link className="btn btn-primary btn-lg" to="/add-entry">Start Tracking</Link>
      </div>
    </div>
  );
}

export default Home;