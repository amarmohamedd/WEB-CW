import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import { Link } from "react-router-dom";
import axios from "axios";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get("http://localhost:3001/recipes/recipes");
      setRecipes(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <Wrapper>
      <Splide
        options={{
          perPage: Math.min(recipes.length, 4), 
          arrows: false,
          pagination: false,
          drag: "free",
          gap: "2rem",
          breakpoints: {
            1024: {
              perPage: Math.min(recipes.length, 3),
            },
            767: {
              perPage: Math.min(recipes.length, 2),
            },
            640: {
              perPage: Math.min(recipes.length, 1),
            },
          },
        }}
      >
        {recipes.map(({ title, id, image }) => (
          <SplideSlide key={id}>
            <Card>
              <Link to={`/Recipesaved/${id}`}>
                <ImageWrapper>
                  <img src={image} alt={title} />
                  <Gradient />
                </ImageWrapper>
                <Title>{title}</Title>
              </Link>
            </Card>
          </SplideSlide>
        ))}
      </Splide>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 4rem 0;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Card = styled.div`
  position: relative;
`;

const ImageWrapper = styled.div`
  overflow: hidden;
  border-radius: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: auto;
    transition: transform 0.3s ease;
    border-radius: 1rem;
  }

  &:hover img {
    transform: scale(1.1);
  }
`;

const Gradient = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
  z-index: 2;
  border-radius: 1rem;
`;

const Title = styled.p`
  position: absolute;
  z-index: 3;
  bottom: 20px;
  left: 20px;
  color: #fff;
  font-weight: 600;
  font-size: 1.2rem;
`;
export default RecipeList;
