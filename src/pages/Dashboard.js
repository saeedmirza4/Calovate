import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Link } from 'react-router-dom';
import { getNutritionEntries, getTodaySummary } from '../services/api';
import './Home.css';

// Register Chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [entries, setEntries] = useState([]);
  const [summary, setSummary] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    sugar: 0,
    fat: 0,
  });
  
  // Goals (hardcoded for now; these can be user-configurable in the future)
  const goals = {
    calories: 2000,
    protein: 120,
    carbs: 250,
    sugar: 50,
    fat: 70,
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch all entries and today's summary
        const entriesData = await getNutritionEntries();
        setEntries(entriesData);
        const summaryData = await getTodaySummary();
        setSummary(summaryData);
        
      } catch (err) {
        setError('Failed to load data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Prepare chart data for the weekly overview
  const prepareChartData = () => {
    const days = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Initialize with past 7 days
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      days[dateStr] = { calories: 0, protein: 0, carbs: 0 };
    }
    
    // Aggregate entry data by day
    entries.forEach(entry => {
      const entryDate = new Date(entry.date).toISOString().split('T')[0];
      if (days[entryDate]) {
        days[entryDate].calories += entry.calories;
        days[entryDate].protein += entry.protein;
        days[entryDate].carbs += entry.carbs;
      }
    });
    
    return {
      labels: Object.keys(days).map(date => {
        const d = new Date(date);
        return d.toLocaleDateString('en-US', { weekday: 'short' });
      }),
      datasets: [
        {
          label: 'Calories',
          data: Object.values(days).map(day => day.calories),
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Protein (g)',
          data: Object.values(days).map(day => day.protein),
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
        },
        {
          label: 'Carbs (g)',
          data: Object.values(days).map(day => day.carbs),
          backgroundColor: 'rgba(255, 206, 86, 0.5)',
        },
      ],
    };
  };

  return (
    <div className="dashboard-container">
      <h2>Your Nutrition Dashboard</h2>
      
      {loading && (
        <div className="text-center my-5">
          <div className="spinner-border"></div>
        </div>
      )}
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      {!loading && !error && (
        <>
          {/* Weekly Overview Chart */}
          <div className="chart-card">
            <h5 className="card-title">Weekly Overview</h5>
            <div className="chart-wrapper">
              <Bar data={prepareChartData()} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
          
          {/* Summary & Goals Cards */}
          <div className="summary-goals-grid">
            <div className="card summary-card">
              <h5 className="card-title">Today's Summary</h5>
              <ul className="list-group">
                <li className="list-group-item">
                  Calories <span className="badge">{summary.calories}</span>
                </li>
                <li className="list-group-item">
                  Protein <span className="badge">{summary.protein}g</span>
                </li>
                <li className="list-group-item">
                  Carbs <span className="badge">{summary.carbs}g</span>
                </li>
                <li className="list-group-item">
                  Sugar <span className="badge">{summary.sugar}g</span>
                </li>
                <li className="list-group-item">
                  Fat <span className="badge">{summary.fat}g</span>
                </li>
              </ul>
            </div>
            <div className="card goals-card">
              <h5 className="card-title">Your Goals</h5>
              <ul className="list-group">
                <li className="list-group-item">
                  Daily Calories <span className="badge">{goals.calories}</span>
                </li>
                <li className="list-group-item">
                  Daily Protein <span className="badge">{goals.protein}g</span>
                </li>
                <li className="list-group-item">
                  Daily Carbs <span className="badge">{goals.carbs}g</span>
                </li>
                <li className="list-group-item">
                  Daily Sugar <span className="badge">{goals.sugar}g</span>
                </li>
                <li className="list-group-item">
                  Daily Fat <span className="badge">{goals.fat}g</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Optional CTA to encourage further engagement */}
          <div className="cta-section">
            <h3>Ready to optimize your nutrition?</h3>
            <Link to="/add-entry" className="btn btn-white">Log Your Meal</Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
