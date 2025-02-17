import React, { useState, useEffect } from 'react';

function Hero() {
  // States for recipes, search term, loading, error, and the selected recipe
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Fetch initial recipes by loading the first category's meals
  const fetchInitialRecipes = async () => {
    setLoading(true);
    setError('');
    try {
      const categoryResponse = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
      const categoryData = await categoryResponse.json();
      const firstCategory = categoryData.categories[0].strCategory;
      const mealsResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${firstCategory}`);
      const mealsData = await mealsResponse.json();
      setRecipes(mealsData.meals);
    } catch (err) {
      console.error('Error fetching recipes:', err);
      setError('Failed to fetch recipes.');
    }
    setLoading(false);
  };

  // Search for recipes by name
  const searchRecipes = async (query) => {
    if (!query.trim()) return;
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`);
      const data = await response.json();
      if (data.meals) {
        setRecipes(data.meals);
      } else {
        setRecipes([]);
        setError('No recipes found.');
      }
    } catch (err) {
      console.error('Error searching recipes:', err);
      setError('Failed to search recipes.');
    }
    setLoading(false);
  };

  // Fetch detailed recipe info when a recipe card is clicked
  const fetchRecipeDetails = async (id) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      if (data.meals && data.meals.length > 0) {
        setSelectedRecipe(data.meals[0]);
      } else {
        setError('Recipe details not found.');
      }
    } catch (err) {
      console.error('Error fetching recipe details:', err);
      setError('Failed to fetch recipe details.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchInitialRecipes();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    searchRecipes(searchTerm);
  };

  const handleCardClick = (id) => {
    fetchRecipeDetails(id);
  };

  // Helper to extract ingredients and their measures
  const getIngredients = (recipe) => {
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== '') {
        ingredients.push(`${ingredient} - ${measure}`);
      }
    }
    return ingredients;
  };

  const closeModal = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Welcome to Ninja Recipes</h1>
      
      <form onSubmit={handleSearch} className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded p-3 w-full max-w-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="ml-4 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
        >
          Search
        </button>
      </form>
      
      {loading && <p className="text-center text-gray-600">Loading recipes...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recipes.map((recipe) => (
          <div
            key={recipe.idMeal}
            onClick={() => handleCardClick(recipe.idMeal)}
            className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-200"
          >
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">{recipe.strMeal}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for detailed recipe view */}
      {selectedRecipe && (
        <div
          onClick={closeModal}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full relative overflow-y-auto max-h-full"
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-3xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-3xl font-bold mb-4">{selectedRecipe.strMeal}</h2>
            <img
              src={selectedRecipe.strMealThumb}
              alt={selectedRecipe.strMeal}
              className="w-[50%] rounded mb-4"
            />
            <p className="mb-2"><span className="font-semibold">Category:</span> {selectedRecipe.strCategory}</p>
            <p className="mb-4"><span className="font-semibold">Area:</span> {selectedRecipe.strArea}</p>
            <h3 className="text-2xl font-semibold mt-4 mb-2">Ingredients:</h3>
            <ul className="list-disc list-inside mb-4">
              {getIngredients(selectedRecipe).map((item, index) => (
                <li key={index} className="text-gray-700">{item}</li>
              ))}
            </ul>
            <h3 className="text-2xl font-semibold mb-2">Instructions:</h3>
            <p className="whitespace-pre-line text-gray-700">{selectedRecipe.strInstructions}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Hero;
