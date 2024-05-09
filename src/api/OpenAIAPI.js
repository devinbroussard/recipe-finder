import { OpenAI } from 'openai';

const openAI = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

async function generateRecipe(ingredients) {
  const response = await openAI.chat.completions.create({
    messages: [{ role: "user", content: getContent(ingredients) }],
    model: "gpt-3.5-turbo",
  });

  if (!response.choices.length)
    throw new Error('There was an generating the recipe. Please try again.');

  const recipeObject = JSON.parse(response.choices[0].message.content);
  if (!recipeObject.name || !recipeObject.ingredients || !recipeObject.instructions || !recipeObject.cookTime)
    throw new Error('There was an generating the recipe. Please try again.');

  return recipeObject;
}

function getContent(ingredients) {
  return `I'm building a recipe finder app where users input ingredients, and I provide them with a recipe they can make using those ingredients. Please provide a recipe in JSON format with the following keys: name (string), ingredients (string[]), instructions (string[]), and cookTime (string). Do not put numbers in the instructions. Ingredients: ${ingredients}`;
}

export default generateRecipe;
