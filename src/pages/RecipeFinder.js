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
      <form style={{display: 'flex', justifyContent: 'center', marginTop: '10rem'}} onSubmit={handleSubmit}>
        <textarea
          type="text"
          placeholder="Enter ingredients"
          value={ingredients}
          onChange={handleInputChange}
          required
          style={{width:'30rem', padding:'0.5rem 1rem', borderRadius: '0.25rem', border: '1px solid black', resize: 'none', height: '1rem'}}
        />
        <button type="submit">Find Recipe</button>
      </form>
      {recipe && (
        <div>
          <h1>Recipe</h1>
          <pre>{JSON.stringify(recipe, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}