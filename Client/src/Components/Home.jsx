import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';


function Home() {
    const [recipes, setRecipes] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3001/recipe/recipes')
        .then(response => {
            setRecipes(response.data);
        }).catch(er => console.log(er));
    }, []);

    return (
        <Wrapper>
            <Grid>
                {recipes.map(recipe => (
                    <Card key={recipe._id}>
                        <Link to={`/read-recipe/${recipe._id}`}>
                            <ImageWrapper>
                                <img src={recipe.imageUrl} alt={recipe.name} />
                            </ImageWrapper>
                            <Title>{recipe.name}</Title>
                        </Link>
                    </Card>
                ))}
            </Grid>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    margin: 4rem 0;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
`;

const Card = styled.div`
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.05);
    }
`;

const ImageWrapper = styled.div`
    overflow: hidden;
    border-radius: 10px 10px 0 0;

    img {
        width: 100%;
        height: auto;
    }
`;

const Title = styled.p`
    text-align: center;
    padding: 1rem;
    font-weight: bold;
`;

export default Home;