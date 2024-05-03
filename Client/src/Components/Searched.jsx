import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";

const Searched = () => {
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const parmas = useParams();

  const getSearchedRecipes = async (search) => {
    const resp = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=6c805b97609c42b19a1cfb7a7d791f8b&query=${search}`
    );
    const data = await resp.json();

    return data.results;
  };

  useEffect(() => {
    let isMounted = true;
    getSearchedRecipes(parmas.search).then((data) => {
      if (isMounted) setSearchedRecipes(data);
    });

    return () => {
      isMounted = false;
    };
  }, [parmas.search]);
  return (
    <Grid>
      {searchedRecipes.map(({ title, id, image }) => (
        <Card key={id}>
          <Link to={`/recipe/${id}`}>
            <Image src={image} alt={title} />
            <Title>{title}</Title>
          </Link>
        </Card>
      ))}
    </Grid>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  gap: 3rem;
  justify-items: center;
`;

const Card = styled.div`
  border-radius: 2rem;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(-5px);
  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

const Title = styled.h4`
  margin: 0;
  padding: 1rem;
  text-align: center;
  background-color: #f1f1f1;
`;
export default Searched;
