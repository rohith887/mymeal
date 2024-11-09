import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Recipe = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState('');  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchMealByIngredient = async (ingredient) => {
    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    return response.data.meals || []; 
  };


  const initialFetch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s`);
      setData(response.data.meals);
    } catch (error) {
      setError("Failed to load recipes.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    const ingredientsArray = items.split(',').map(item => item.trim());
    try {
      const mealsArray = await Promise.all(ingredientsArray.map(fetchMealByIngredient));
      const commonMeals = mealsArray[0].filter(meal =>
        mealsArray.every(arr => arr.some(item => item.idMeal === meal.idMeal))
      );
      if (commonMeals.length === 0) {
        setError('No recipes found with the provided ingredients.');
      }
      setData(commonMeals);
    } catch (error) {
      setError("Failed to fetch recipes based on ingredients.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initialFetch();
  }, []);

  return (
    <div className="max-w-screen-lg p-8 mx-auto">
      <h1 className="mb-8 text-3xl font-bold text-center">Find Delicious Recipes</h1>
      
      <div className="flex flex-col items-center justify-center mb-6 sm:flex-row">
        <input 
          placeholder="Enter ingredients (comma-separated)" 
          onChange={(e) => setItems(e.target.value)}
          className="w-full p-2 mb-4 border-2 border-gray-300 rounded-md sm:w-2/3 focus:outline-none focus:border-gray-500 sm:mb-0 sm:mr-4"
        />
        <button 
          onClick={handleSubmit} 
          className="px-4 py-2 font-semibold text-white transition bg-green-500 rounded-md hover:bg-green-600"
        >
          Search
        </button>
      </div>

    
      {loading && <div className="text-center text-green-500">Loading recipes...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}
      
      
      {data.length > 0 && !loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data.map(item => (
            <div 
              key={item.idMeal} 
              onClick={() => navigate(`/recipe?id=${item.idMeal}`)}
              className="overflow-hidden transition transform border border-gray-300 rounded-md shadow-lg cursor-pointer hover:shadow-xl hover:scale-105"
            >
              <img src={item.strMealThumb} alt={item.strMeal} className="object-cover w-full h-48" />
              <h1 className="p-4 text-lg font-semibold text-center">{item.strMeal}</h1>
            </div>
          ))}
        </div>
      ) : (
      ''
      )}
    </div>
  );
};

export default Recipe;
