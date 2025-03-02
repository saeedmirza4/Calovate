import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { getNutritionEntries, getTodaySummary } from '../services/api';

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
    fat: 0
  });
  
  // Goals (hardcoded for now, could be user-configurable)
  const goals = {
    calories: 2000,
    protein: 120,
    carbs: 250,
    sugar: 50,
    fat: 70
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch all entries
        const entriesData = await getNutritionEntries();
        setEntries(entriesData);
        
        // Fetch today's summary
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
  
  // Prepare chart data
  const prepareChartData = () => {
    // Group entries by day
    const days = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Initialize with past 7 days
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      days[dateStr] = {
        calories: 0,
        protein: 0,
        carbs: 0
      };
    }
    
    // Add entry data to corresponding days
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
        }
      ],
    };
  };

  return (
    <div className="container mt-4">
      <h2>Your Nutrition Dashboard</h2>
      
      {loading && <div className="text-center my-5"><div className="spinner-border"></div></div>}
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      {!loading && !error && (
        <>
          <div className="row mt-4">
            <div className="col-md-8 offset-md-2">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Weekly Overview</h5>
                  <Bar data={prepareChartData()} />
                </div>
              </div>
            </div>
          </div>
          
          <div className="row mt-4">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Today's Summary</h5>
                  <ul className="list-group">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Calories
                      <span className="badge bg-primary rounded-pill">{summary.calories}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Protein
                      <span className="badge bg-success rounded-pill">{summary.protein}g</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Carbs
                      <span className="badge bg-info rounded-pill">{summary.carbs}g</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Sugar
                      <span className="badge bg-warning rounded-pill">{summary.sugar}g</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Fat
                      <span className="badge bg-danger rounded-pill">{summary.fat}g</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Your Goals</h5>
                  <ul className="list-group">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Daily Calories
                      <span className="badge bg-primary rounded-pill">{goals.calories}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Daily Protein
                      <span className="badge bg-success rounded-pill">{goals.protein}g</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Daily Carbs
                      <span className="badge bg-info rounded-pill">{goals.carbs}g</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Daily Sugar
                      <span className="badge bg-warning rounded-pill">{goals.sugar}g</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Daily Fat
                      <span className="badge bg-danger rounded-pill">{goals.fat}g</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;