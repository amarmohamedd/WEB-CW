import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from 'axios';

const Recipe = () => {
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");

  const params = useParams();

  const fetchDetails = async () => {
    try {
      const resp = await fetch(
        `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=6c805b97609c42b19a1cfb7a7d791f8b`
      );
      const data = await resp.json();
      return data;
    } catch (error) {
      console.error('Error fetching recipe details:', error);
      return {};
    }
  };

  useEffect(() => {
    let isMounted = true;

    fetchDetails().then((data) => {
      if (isMounted) setDetails(data);
    });

    return () => {
      isMounted = false; 
    };
  }, [params.id]);

  const saveRecipe = async () => {
    try {
      await axios.post('http://localhost:3001/recipes/save', {
        id: details.id,
        title: details.title,
        image: details.image,
        cuisines: details.cuisines,
        ingredients: details.extendedIngredients.map(ingredient => ({
          name: ingredient.name,
          quantity: ingredient.original
        })),
        instructions: details.instructions,
        dietaryPreferences: details.dietaryPreferences,
        cookingTime: details.readyInMinutes,
        difficulty: details.difficulty,
        nutritionalInfo: {
          calories: details.nutrition?.nutrients.find(nutrient => nutrient.title === 'Calories')?.amount,
          protein: details.nutrition?.nutrients.find(nutrient => nutrient.title === 'Protein')?.amount,
          carbs: details.nutrition?.nutrients.find(nutrient => nutrient.title === 'Carbohydrates')?.amount,
          fats: details.nutrition?.nutrients.find(nutrient => nutrient.title === 'Fat')?.amount
        },
        healthBenefits: details.healthBenefits,
        ratings: details.averageRating,
        shoppingList: details.shoppingList,
        pricePerServing: details.pricePerServing,
        spoonacularScore: details.spoonacularScore
      });
      alert('Recipe saved successfully!');
    } catch (error) {
      console.error('Error saving the recipe:', error);
      alert('Failed to save recipe');
    }
  };
  

  return (
    <Wrapper>
      <RecipeContainer>
        <RecipeImage src={details.image} alt={details.title} />
        <RecipeDetails>
          <h2>{details.title}</h2>
          <Button onClick={saveRecipe}>Save Recipe</Button>
        </RecipeDetails>
      </RecipeContainer>
      <Info>
        <TabButton
          className={activeTab === "ingredients" ? "active" : ""}
          onClick={() => setActiveTab("ingredients")}
        >
          Ingredients
        </TabButton>
        <TabButton
          className={activeTab === "instructions" ? "active" : ""}
          onClick={() => setActiveTab("instructions")}
        >
          Instructions
        </TabButton>
        <TabContent>
          {activeTab === "ingredients" && (
            <ul>
              {details.extendedIngredients?.map(({ id, original }) => (
                <li key={id}>{original}</li>
              ))}
            </ul>
          )}
          {activeTab === "instructions" && (
            <div>
              <p dangerouslySetInnerHTML={{ __html: details.summary }}></p>
              <p dangerouslySetInnerHTML={{ __html: details.instructions }}></p>
            </div>
          )}
        </TabContent>
      </Info>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 4rem auto;
  max-width: 1200px;
  display: flex;
`;

const RecipeContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const RecipeImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 500px;
  object-fit: cover;
`;

const RecipeDetails = styled.div`
  margin-top: 2rem;

  h2 {
    margin-bottom: 1rem;
    font-size: 2rem;
  }
`;

const Info = styled.div`
  flex: 1;
  margin-left: 4rem;
`;

const TabButton = styled.button`
  padding: 1rem 2rem;
  color: #fff;
  background: #313131;
  border: none;
  margin-right: 2rem;
  font-weight: 600;
  cursor: pointer;

  &.active {
    background: linear-gradient(35deg, #494949, #313131);
  }
`;

const TabContent = styled.div`
  margin-top: 2rem;

  ul {
    margin-top: 2rem;
  }

  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }

  p {
    margin: 1rem 0;
    font-size: 1.1rem;
    line-height: 1.8rem;

    &:first-child {
      margin-top: 2rem;
    }
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: #fff;
  border: 2px solid #000;
  font-weight: 600;
  cursor: pointer;
`;

export default Recipe;
