import React, { useState } from 'react';
import { addNutritionEntry } from '../services/api';

function AddEntry() {
  const [formData, setFormData] = useState({
    foodName: '',
    calories: '',
    protein: '',
    carbs: '',
    sugar: '',
    fat: '',
    date: new Date().toISOString().substr(0, 10)
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // Convert string values to numbers
      const entryData = {
        ...formData,
        calories: Number(formData.calories),
        protein: Number(formData.protein),
        carbs: Number(formData.carbs),
        sugar: Number(formData.sugar),
        fat: Number(formData.fat)
      };
      
      await addNutritionEntry(entryData);
      
      // Clear the form
      setFormData({
        foodName: '',
        calories: '',
        protein: '',
        carbs: '',
        sugar: '',
        fat: '',
        date: new Date().toISOString().substr(0, 10)
      });
      
      setSuccess('Food entry added successfully!');
    } catch (err) {
      setError('Failed to add entry. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Nutrition Entry</h2>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="foodName" className="form-label">Food Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="foodName"
                    name="foodName"
                    value={formData.foodName}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="calories" className="form-label">Calories</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    id="calories"
                    name="calories"
                    value={formData.calories}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="protein" className="form-label">Protein (g)</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    id="protein"
                    name="protein"
                    value={formData.protein}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="carbs" className="form-label">Carbs (g)</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    id="carbs"
                    name="carbs"
                    value={formData.carbs}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="sugar" className="form-label">Sugar (g)</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    id="sugar"
                    name="sugar"
                    value={formData.sugar}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="fat" className="form-label">Fat (g)</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    id="fat"
                    name="fat"
                    value={formData.fat}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="date" className="form-label">Date</label>
                  <input 
                    type="date" 
                    className="form-control" 
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Adding...' : 'Add Entry'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEntry;