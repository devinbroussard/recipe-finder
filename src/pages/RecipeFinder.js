import '../styles/RecipeFinder.css'

import React, { useState } from 'react';

import generateRecipe from '../api/OpenAIAPI.js';

export default function RecipeFinder() {
  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleInputChange(event) {
    setIngredients(event.target.value);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await generateRecipe(ingredients);
      setRecipe(response);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='container'> 
      <form className='form' onSubmit={handleSubmit}>
        <span className='input-with-btn'>
          <input
            type="text"
            placeholder="Enter ingredients"
            value={ingredients}
            onChange={handleInputChange}
            className='dish-input'
            required
          />
          <button className='find-recipe-btn' disabled={!ingredients} type="submit">
              Find Recipe
          </button>
        </span>
      </form>
      {recipe && !isLoading && (
        <div className='recipe-details'>
          <h1>{recipe.name}</h1>

          <h2>Cook Time</h2>
          <div>{recipe.cookTime}</div>

          <h2>Ingredients</h2>
          {recipe.ingredients.map((ingredient, index) => (
            <li className='ingredient-list-item' key={index}>{ingredient}</li>
          ))}
          
          <h2>Instructions</h2>
          <ol className='instructions-list'>
            {recipe.instructions.map((instruction, index) => (
              <li className='instructions-list-item' key={index}>{instruction}</li>
            ))}
          </ol>
        </div>
      )}
      {
        isLoading && (
          <div>Loading...</div>
        )
      }
    </div>
  );
}