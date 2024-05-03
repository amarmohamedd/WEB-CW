const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Usermodel = require('./models/users');
const Autoincrement = require('mongoose-sequence')(mongoose);
const router = require('./Routes/auth');
const cookieParser = require('cookie-parser');
const recipeRouter = require('./Routes/RecipeRoutes');
const recipeRouterapi = require('./Routes/reciperoute_api');
const swaggerOptions = require("./swaggerOptions").swaggerOptions;
const swaggerDocs = require('./swaggerOptions');
const swaggerUi = require('swagger-ui-express');

const app = express();

app.use(cors());

app.use(cors({
  origin: [
    'https://localhost:5173',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(cookieParser());
app.use('/recipe', recipeRouter)
app.use('/auth', router);
app.use('/recipes', recipeRouterapi);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

mongoose.connect('mongodb+srv://Ammar:Ammar123@cluster0.q1s1pdh.mongodb.net/Recipes',{
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));





app.listen(3001, () => {
  console.log('server is listening on port');
});
