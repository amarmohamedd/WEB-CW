import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Search from "../Components/Search";

const Random = () => {
  const [random, setRandom] = useState([]);

  const getRandomRecipes = async () => {
    try {
      const resp = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=6c805b97609c42b19a1cfb7a7d791f8b&number=4`
      );
      if (!resp.ok) {
        throw new Error(`API call failed with status: ${resp.status}`);
      }
      const data = await resp.json();
      setRandom(data.recipes);
    } catch (error) {
      console.error('Error fetching random recipes:', error);
      
    }
  };

  useEffect(() => {
    getRandomRecipes();
  }, []);

  return (
    <Wrapper>
      
      <Splide
        options={{
          perPage: 4,
          arrows: false,
          pagination: false,
          drag: "free",
          gap: "5rem",
          breakpoints: {
            1024: {
              perPage: 3,
            },
            767: {
              perPage: 2,
            },
            640: {
              perPage: 1,
            },
          },
        }}
      >
        {random.map(({ title, id, image }) => (
          <SplideSlide key={id}>
            <Card>
              <Link to={`/recipe/${id}`}>
                <p>{title}</p>
                <img src={image} alt={title} />
                <Gradient />
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
`;

const Card = styled.div`
  min-height: 25rem;
  overflow: hidden;
  position: relative;

  img {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 2rem;
  }

  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 0);
    color: #fff;
    width: 100%;
    height: 40%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Gradient = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
  z-index: 3;
  border-radius: 2rem;
`;


const Mainscreen = () => {
  return (
    
    <motion.div>
      <Search />
      <Random />
      <Random />
      <Random />
     
    </motion.div>
  );
};

export default Mainscreen;
