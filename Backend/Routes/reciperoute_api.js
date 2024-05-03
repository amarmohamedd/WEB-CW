

const express = require('express');
const router = express.Router();
const Recipeapimodel = require('../models/Recipe-api');

router.post('/save', async (req, res) => {
  const { id, title, image, cuisines, ingredients, instructions, dietaryPreferences, cookingTime, difficulty, nutritionalInfo, healthBenefits, ratings, shoppingList, pricePerServing, spoonacularScore } = req.body;
  try {
    let recipe = await Recipeapimodel.findOne({ id });
    if (recipe) {
      return res.status(400).json({ msg: 'Recipe already exists' });
    }
    const newRecipe = new Recipeapimodel({ 
      id, 
      title, 
      image, 
      cuisines, 
      ingredients, 
      instructions, 
      dietaryPreferences, 
      cookingTime, 
      difficulty, 
      nutritionalInfo, 
      healthBenefits, 
      ratings,
      shoppingList, 
      pricePerServing,
      spoonacularScore
    });
    await newRecipe.save();
    res.json({ msg: 'Recipe saved successfully' });
  } catch (error) {
    console.error('Error saving the recipe:', error);
    res.status(500).json({ msg: 'Failed to save the recipe', error });
  }
});

/**
 * @swagger
 * /recipes/recipes:
 *   get:
 *     summary: Get all recipes
 *     description: Retrieve a list of all saved recipes.
 *     responses:
 *       '200':
 *         description: List of recipes retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recipe'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Failed to fetch recipes
 */
router.get('/recipes', async (req, res) => {
  try {
    const recipes = await Recipeapimodel.find({});
    res.json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ msg: 'Failed to fetch recipes', error });
  }
});


router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await Recipeapimodel.findOneAndDelete({ id });
    if (!recipe) {
      return res.status(404).json({ msg: 'Recipe not found' });
    }
    res.json({ msg: 'Recipe deleted successfully' });
  } catch (error) {
    console.error('Error deleting the recipe:', error);
    res.status(500).json({ msg: 'Failed to delete the recipe', error });
  }
});

module.exports = router;
