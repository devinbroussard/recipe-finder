import "../styles/RecipeFinder.css";

import React, { useCallback, useEffect, useMemo, useState } from "react";

import generateRecipe from "../api/OpenAIAPI.js";

export default function RecipeFinder() {
  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInputValid, setIsInputValid] = useState(false);

  function handleInputChange(event) {
    setIngredients(event.target.value);
  }

  useEffect(() => {
    setIsInputValid(ingredients.trim().length > 0);
  }, [ingredients]);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      setIsLoading(true);
      setRecipe(null);
      setHasError(false);

      try {
        const response = await generateRecipe(ingredients);
        setRecipe(response);
      } catch (error) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    },
    [ingredients]
  );

  const shouldShowRecipe = useMemo(
    () => !hasError && !isLoading && Boolean(recipe),
    [hasError, isLoading, recipe]
  );

  const shouldShowErrorMessage = useMemo(
    () => hasError && !isLoading,
    [hasError, isLoading]
  );

  return (
    <div className="container d-flex justify-content-center flex-column">
      <form
        className="d-flex align-items-center justify-content-center"
        onSubmit={handleSubmit}
      >
        <span className="input-with-btn d-flex overflow-hidden">
          <input
            type="text"
            placeholder="Enter ingredients"
            value={ingredients}
            onChange={handleInputChange}
            className="dish-input"
            required
          />
          <button
            className="find-recipe-btn"
            disabled={!isInputValid || isLoading}
            type="submit"
          >
            Find Recipe
          </button>
        </span>
      </form>
      {(shouldShowErrorMessage || isLoading) && (
        <div className="status-message">
          {shouldShowErrorMessage && (
            <span className="error-message">
              There was an error generating the recipe. Please try again.
            </span>
          )}
          {isLoading && <span>Loading...</span>}
        </div>
      )}
      {shouldShowRecipe && (
        <div className="recipe-details">
          <h1>{recipe.name}</h1>

          <h2>Cook Time</h2>
          <div>{recipe.cookTime}</div>

          <h2>Ingredients</h2>
          {recipe.ingredients.map((ingredient, index) => (
            <li className="list-item" key={index}>
              {ingredient}
            </li>
          ))}

          <h2>Instructions</h2>
          <ol className="instructions-list">
            {recipe.instructions.map((instruction, index) => (
              <li className="list-item" key={index}>
                {instruction}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
