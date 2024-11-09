import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const RecipePage = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const yid = recipe.strYoutube ? recipe.strYoutube.split("v=")[1] : null;

  const fetchRecipe = async () => {
    if (!id) return;

    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      if (response.data.meals && response.data.meals.length > 0) {
        const fetchedRecipe = response.data.meals[0];
        setRecipe(fetchedRecipe);
        extractIngredients(fetchedRecipe);
      } else {
        console.error("No recipe found for the given ID.");
      }
    } catch (error) {
      console.error("Error fetching recipe:", error);
    }
  };

  const extractIngredients = (recipeData) => {
    const tempIngredients = [];

    for (let i = 1; i <= 20; i++) {
      const ingredient = recipeData[`strIngredient${i}`];
      const measure = recipeData[`strMeasure${i}`];

      if (ingredient) { 
        tempIngredients.push({
          ingredient,
          measure: measure ? measure : ""
        });
      }
    }
    setIngredients(tempIngredients);
  };

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  if (!id) {
    return <div className='p-8 text-center text-red-500'>No recipe ID provided in the URL.</div>;
  }
  if (!recipe.strMeal) {
    return <div className='p-8 text-center text-gray-600'>Loading...</div>;
  }

  return (
    <div className="max-w-screen-lg p-8 mx-auto">
      <div className="p-6 bg-white border-2 border-gray-300 rounded-md shadow-lg">
        <h2 className="mb-4 text-3xl font-semibold text-center text-green-700">{recipe.strMeal}</h2>

        <div className="flex flex-col items-center justify-around md:flex-row">
          <img 
            src={recipe.strMealThumb} 
            alt={recipe.strMeal} 
            className="w-full h-auto max-w-xs mb-4 rounded-md md:w-1/2 md:max-w-none md:mb-0"
          />

          <div className="w-full p-4 border-2 border-gray-200 rounded-md bg-gray-50 md:w-1/3">
            <h3 className="mb-3 text-lg font-semibold text-green-700">Ingredients</h3>
            <ul className="list-disc list-inside">
              {ingredients.map((item, index) => (
                <li key={index} className="text-gray-700">
                  <span className="font-medium">{item.ingredient}</span>{item.measure ? `: ${item.measure}` : ""}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="mb-3 text-xl font-semibold text-green-700">Instructions</h3>
          <p className="text-gray-700 whitespace-pre-line">{recipe.strInstructions}</p>
        </div>

        {yid && (
          <div className="mt-6">
            <h3 className="mb-3 text-xl font-semibold text-green-700">Video Tutorial</h3>
            <iframe
              width="100%"
              height="400"
              src={`https://www.youtube.com/embed/${yid}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-md"
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};
