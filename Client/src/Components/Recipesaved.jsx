import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from 'axios';

const Recipesaved = () => {
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

  const removeRecipe = async () => {
    try {
      await axios.delete(`http://localhost:3001/recipes/${details.id}`);
      alert('Recipe removed successfully!');
    } catch (error) {
      console.error('Error removing the recipe:', error);
      alert('Failed to remove recipe');
    }
  };

  return (
    <Wrapper>
      <Content>
        <Title>{details.title}</Title>
        <Image src={details.image} alt={details.title} />
        <Button onClick={removeRecipe}>Remove Recipe</Button>
      </Content>
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
        {activeTab === "ingredients" && (
          <IngredientList>
            {details.extendedIngredients?.map(({ id, original }) => (
              <li key={id}>{original}</li>
            ))}
          </IngredientList>
        )}
        {activeTab === "instructions" && (
          <div>
            <Paragraph dangerouslySetInnerHTML={{ __html: details.summary }}></Paragraph>
            <Paragraph dangerouslySetInnerHTML={{ __html: details.instructions }}></Paragraph>
          </div>
        )}
      </Info>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin: 5rem auto;
`;

const Content = styled.div`
  flex: 1;
  padding-right: 2rem;
  max-width: 50%;
`;

const Title = styled.h2`
  margin-bottom: 2rem;
  font-size: 2rem;
  color: #333;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 0.5rem;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  padding: 1rem 2rem;
  margin-top: 2rem;
  color: #fff;
  background-color: #ff5722; /* Red color */
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e64a19; /* Darker red color on hover */
  }
`;

const Info = styled.div`
  flex: 1;
`;

const TabButton = styled.button`
  padding: 1rem 2rem;
  margin-right: 2rem;
  color: #fff;
  background-color: #333;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #555;
  }

  &.active {
    background-color: #ff5722;
  }
`;

const IngredientList = styled.ul`
  margin-top: 2rem;
  list-style: none;
`;

const Paragraph = styled.p`
  margin: 1rem 0;
  font-size: 1.1rem;
  line-height: 1.8rem;
  color: #555;
`;

export default Recipesaved;
