import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Register from './Components/Register';
import Login from './Components/Login';
import Home from './Components/Home';
import Nav from './Components/Nav';
import CreateRecipe from './Components/CreateRecipe';
// import SavedRecipe from './Components/SavedRecipe'; // Uncomment if you plan to use it
import ReadRecipe from './Components/ReadRecipe';


import Recipe from './Components/Recipe';
import Searched from './Components/Searched';
import Mainscreen from './Components/Random';
import RecipeList from './Components/RecipeList'
import Recipesaved from './Components/Recipesaved'

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/recipe/create-recipe" element={<CreateRecipe />} />
        <Route path="/" element={<Home />} />
        <Route path="/read-recipe/:id" element={<ReadRecipe />} />
        

        <Route path="/Mainscreen" element={<Mainscreen />} />
        <Route path="/searched/:search" element={<Searched />} />
        <Route path="/recipe/:id" element={<Recipe />} />
        <Route path="/RecipeList" element={<RecipeList />} />
        <Route path="/Recipesaved/:id" element={<Recipesaved />} />
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
