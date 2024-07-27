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
    throw new Error();

  const recipeObject = JSON.parse(response.choices[0].message.content);
  if (!recipeObject.name || !recipeObject.ingredients || !recipeObject.instructions || !recipeObject.cookTime)
    throw new Error();

  return recipeObject;
}

function getContent(ingredients) {
  return `I’m developing a recipe finder app. Users will input ingredients, and I need to generate a compatible recipe. Please provide the recipe in JSON format with these keys: "name" (string), "ingredients" (string array), "instructions" (string array without numbers), and "cookTime" (string). Use the following ingredients: ${ingredients}.`;
}

export default generateRecipe;
