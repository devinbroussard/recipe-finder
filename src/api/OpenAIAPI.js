import { OpenAI } from 'openai';

const openAI = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

async function generateRecipe(ingredients) {
  try {
    const response = await openAI.chat.completions.create({
      messages: [{ role: "user", content: getContent(ingredients) }],
      model: "gpt-3.5-turbo",
    });

    const recipeObject = JSON.parse(response.choices[0].message.content);
    return recipeObject;
  } catch (error) {
    console.error('Error in postOpenApi:', error);
    throw error;
  }
}

function getContent(ingredients) {
  return `I'm building a recipe finder app where users input ingredients, and I provide them with a recipe they can make using those ingredients. Please provide a recipe in JSON format with the following keys: name (string), ingredients (string[]), instructions (string[]), and cookTime (string). Ingredients: ${ingredients}`;
}

export default generateRecipe;
