# My Meal
## Overview
RecipeApp is a React-based app where users can explore recipes based on ingredients. The app fetches recipe details, including ingredients, instructions, and images, from the MealDB API. Users can also watch a YouTube tutorial (if available) for each recipe.
### Live Link: https://mymeall.netlify.app/


## Features
Search recipes by ingredients.<br />
View detailed recipe pages with:
Recipe name, image, and instructions.<br />
List of ingredients with measures.<br />
YouTube tutorial for step-by-step cooking (if available).<br />
Responsive design optimized for both desktop and mobile views.

## Dependencies
**react**: A JavaScript library for building user interfaces.<br />
**react-router-dom**: Used for routing and handling URL parameters.<br />
**axios**: A promise-based HTTP client used to fetch data from the MealDB API.<br />
**tailwindcss**: A utility-first CSS framework for styling.<br />

## Api: MealDB
To find Recipes by ingredients: www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata <br />
To find recipe by Id: www.themealdb.com/api/json/v1/1/lookup.php?i=52772 <br />



## Installation
To set up and run the project locally, follow these steps:

Clone the repository:

git clone https://github.com/rohith887/mymeal.git <br/>
cd RecipeApp

### Install dependencies:

npm install

### Start the development server:

npm run dev  <br />
Open http://localhost:5173 in your browser to view the app.

