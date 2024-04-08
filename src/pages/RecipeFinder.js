import '../styles/RecipeFinder.css'

import React, { useState } from 'react';

import generateRecipe from '../api/OpenAIAPI.js';

export default function RecipeFinder() {
  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe] = useState(null);

  function handleInputChange(event) {
    setIngredients(event.target.value);
  };

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await generateRecipe(ingredients);
      setRecipe(response);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={{display: 'flex', gap: '2rem', flexDirection: 'column', justifyContent: 'center', width: 'auto', alignItems: 'center', height: '100%'}}> 
      <form style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} onSubmit={handleSubmit}>
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
      {recipe && (
        <div>
          <h1>{recipe.name}</h1>

          <h2>Cook Time</h2>
          <div>{recipe.cookTime}</div>

          <h2>Ingredients</h2>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
          
          <h2>Instructions</h2>
          <ol style={{paddingLeft: '1rem'}}>
            {recipe.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}