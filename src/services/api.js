import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Get all nutrition entries
export const getNutritionEntries = async () => {
  try {
    const response = await axios.get(`${API_URL}/nutrition`);
    return response.data;
  } catch (error) {
    console.error('Error fetching nutrition entries:', error);
    throw error;
  }
};

// Add a new nutrition entry
export const addNutritionEntry = async (entryData) => {
  try {
    const response = await axios.post(`${API_URL}/nutrition`, entryData);
    return response.data;
  } catch (error) {
    console.error('Error adding nutrition entry:', error);
    throw error;
  }
};

// Get today's summary
export const getTodaySummary = async () => {
  try {
    const response = await axios.get(`${API_URL}/nutrition/summary`);
    return response.data;
  } catch (error) {
    console.error('Error fetching today summary:', error);
    throw error;
  }
};

// Delete an entry
export const deleteNutritionEntry = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/nutrition/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting nutrition entry:', error);
    throw error;
  }
};