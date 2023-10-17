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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter ingredients"
          value={ingredients}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Find Recipe</button>
      </form>
      {recipe && (
        <div>
          <h2>Recipe</h2>
          <pre>{JSON.stringify(recipe, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}