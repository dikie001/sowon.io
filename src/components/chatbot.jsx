import React, { useState, useEffect } from "react";

function App() {
  // State for recipe list, search term, loading status, error message, and selected recipe details.
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Fetch initial recipes when the component mounts.
  const fetchInitialRecipes = async () => {
    setLoading(true);
    setError("");
    try {
      // Fetch all meal categories
      const categoryResponse = await fetch(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      const categoryData = await categoryResponse.json();
      // Choose a category (here we select the first one; you can change this to a preferred category, e.g., "Seafood")
      const firstCategory = categoryData.categories[0].strCategory;
      // Fetch meals for the chosen category using the filter endpoint.
      const mealsResponse = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${firstCategory}`
      );
      const mealsData = await mealsResponse.json();
      setRecipes(mealsData.meals);
    } catch (err) {
      console.error("Error fetching recipes:", err);
      setError("Failed to fetch recipes.");
    }
    setLoading(false);
  };

  // Function to search recipes by name.
  const searchRecipes = async (query) => {
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
          query
        )}`
      );
      const data = await response.json();
      if (data.meals) {
        setRecipes(data.meals);
      } else {
        setRecipes([]);
        setError("No recipes found.");
      }
    } catch (err) {
      console.error("Error searching recipes:", err);
      setError("Failed to search recipes.");
    }
    setLoading(false);
  };

  // Function to fetch detailed recipe info using the lookup endpoint.
  const fetchRecipeDetails = async (id) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      const data = await response.json();
      if (data.meals && data.meals.length > 0) {
        setSelectedRecipe(data.meals[0]);
      } else {
        setError("Recipe details not found.");
      }
    } catch (err) {
      console.error("Error fetching recipe details:", err);
      setError("Failed to fetch recipe details.");
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

  // Helper function to extract ingredients and their measures.
  const getIngredients = (recipe) => {
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== "") {
        ingredients.push(`${ingredient} - ${measure}`);
      }
    }
    return ingredients;
  };

  // Close the detailed recipe modal.
  const closeModal = () => {
    setSelectedRecipe(null);
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        position: "relative",
      }}
    >
      <h1>Recipe Finder</h1>
      <form onSubmit={handleSearch} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "10px", width: "70%", fontSize: "16px" }}
        />
        <button
          type="submit"
          style={{ padding: "10px 20px", marginLeft: "10px", fontSize: "16px" }}
        >
          Search
        </button>
      </form>
      {loading && <p>Loading recipes...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {recipes.map((recipe) => (
          <div
            key={recipe.idMeal}
            onClick={() => handleCardClick(recipe.idMeal)}
            style={{
              width: "300px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              cursor: "pointer",
            }}
          >
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
            <div style={{ padding: "10px" }}>
              <h3 style={{ margin: "0 0 10px" }}>{recipe.strMeal}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Modal to display detailed recipe information */}
      {selectedRecipe && (
        <div
          onClick={closeModal}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "8px",
              maxWidth: "600px",
              width: "90%",
              maxHeight: "80%",
              overflowY: "auto",
            }}
          >
            <button
              onClick={closeModal}
              style={{ float: "right", fontSize: "16px" }}
            >
              Close
            </button>
            <h2>{selectedRecipe.strMeal}</h2>
            <img
              src={selectedRecipe.strMealThumb}
              alt={selectedRecipe.strMeal}
              style={{
                width: "100%",
                borderRadius: "8px",
                marginBottom: "20px",
              }}
            />
            <p>
              <strong>Category:</strong> {selectedRecipe.strCategory}
            </p>
            <p>
              <strong>Area:</strong> {selectedRecipe.strArea}
            </p>
            <h3>Ingredients:</h3>
            <ul>
              {getIngredients(selectedRecipe).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <h3>Instructions:</h3>
            <p style={{ whiteSpace: "pre-line" }}>
              {selectedRecipe.strInstructions}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
