const express = require('express')
const RecipeModel = require('../models/Recipe')
const Usermodel = require('../models/users')
const router = express.Router();


/**
 * @swagger
 * /recipe/create-recipe:
 *   post:
 *     summary: Create a new recipe
 *     description: Create a new recipe with details like name, description, ingredients, etc.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the recipe.
 *                 required: true
 *               description:
 *                 type: string
 *                 description: Description of the recipe.
 *               ingredients:
 *                 type: string
 *                 description: List of ingredients required for the recipe.
 *               imageUrl:
 *                 type: string
 *                 description: URL of the image representing the recipe.
 *               cookingTime:
 *                 type: number
 *                 description: The estimated cooking time for the recipe.
 *               userId:
 *                 type: string  
 *                 description: ID of the user who created the recipe.
 *                 required: true
 *     responses:
 *       '200':
 *         description: Recipe created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Failed to create the recipe
 */




router.post('/create-recipe', (req, res) => {
     RecipeModel.create({
        name: req.body.name,
        description: req.body.description,
        ingredients: req.body.ingredients,
        imageUrl: req.body.imageUrl,
        userId: req.body.userId,
        readyInMinutes: req.body.readyInMinutes, 
        price: req.body.price, 
        instructions: req.body.instructions, 
        cookingTime: req.body.cookingTime,
  }).then(result=>  {
    return res.json(result);
  }).catch(err => console.log(err));
})


/**
 * @swagger
 * /recipe/recipes:
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
router.get('/recipes', (req, res) => {
    RecipeModel.find()
    .then(recipes=> {
        return res.json(recipes);
    }).catch (err=> res.json(err))
})

/**
 * @swagger
 * /recipe/recipe-by-id/{id}:
 *   get:
 *     summary: Get recipe by ID
 *     description: Retrieve a recipe by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the recipe to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Recipe retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *       '404':
 *         description: Recipe not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Recipe not found
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to fetch recipe
 */
router.get('/recipe-by-id/:id', async (req, res) => {
    try {
      const recipe = await RecipeModel.findById(req.params.id);
      if (!recipe) {
        return res.status(404).json({ error: 'Recipe not found' });
      }
      return res.json(recipe);
    } catch (error) {
      console.error('Error fetching recipe:', error);
      return res.status(500).json({ error: 'Failed to fetch recipe' });
    }
  });




router.put('/', async (req, res) => {
    const recipe = await RecipeModel.findById(req.body.recipe);
    const user = await Usermodel.findById(req.body.id); 

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    user.savedRecipes.push(recipe);
    await user.save();
    return res.json({ savedRecipes: user.savedRecipes });
});


const saveRecipe = async (recipe) => {
    try {
        await axios.post('http://localhost:300/api/create-recipe/save', {
            name: recipe.name,
            description: recipe.description,
            ingredients: recipe.ingredients,
            imageUrl: recipe.imageUrl,
            userId: recipe.userId,
            readyInMinutes: recipe.readyInMinutes, 
            price: recipe.price, 
            instructions: recipe.instructions,
        });
    } catch (error) {
        console.error(`Error saving recipe: ${error}`);
    }
};

/**
 * @swagger
 * /recipe/delete-recipe/{id}:
 *   delete:
 *     summary: Delete recipe by ID
 *     description: Delete a recipe by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the recipe to delete.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Recipe deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Recipe deleted successfully
 *       '404':
 *         description: Recipe not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Recipe not found
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to delete recipe
 */


router.delete('/delete-recipe/:id', async (req, res) => {
    console.log(req.params.id);
    try {
      const deletedRecipe = await RecipeModel.findByIdAndDelete(req.params.id);
      if (!deletedRecipe) {
        return res.status(404).json({ error: 'Recipe not found' });
      }
      return res.json({ message: 'Recipe deleted successfully' });
    } catch (error) {
      console.error('Error deleting recipe:', error);
      return res.status(500).json({ error: 'Failed to delete recipe' });
    }
  });

   
module.exports = router;   
