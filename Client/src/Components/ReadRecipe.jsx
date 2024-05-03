import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function ReadRecipe() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const getRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/recipe/recipe-by-id/${id}`);
                setRecipe(response.data);
            } catch (error) {
                console.error('Error fetching recipe:', error);
            }
        };

        getRecipe();
    }, [id]);

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:3001/recipe/delete-recipe/${id}`);
            if (response.status === 200) {
                navigate('/');
                alert('Recipe deleted successfully!');
            } else {
                alert('Failed to delete recipe');
            }
        } catch (error) {
            console.error('Error deleting recipe:', error);
            alert('Failed to delete recipe');
        }
    };

    return (
        <RecipeContainer>
            <RecipeContent>
                <Header>{recipe.name}</Header>
                <DescriptionHeader>Description:</DescriptionHeader>
                <Description>{recipe.description}</Description>
                <IngredientsHeader>Ingredients:</IngredientsHeader>
                <Ingredients>{recipe.ingredients}</Ingredients>
                <DeleteButton onClick={handleDelete}>Delete Recipe</DeleteButton>
            </RecipeContent>
            <ImageContainer>
                <RecipeImage src={recipe.imageUrl} alt="Recipe" />
            </ImageContainer>
        </RecipeContainer>
    );
}

const RecipeContainer = styled.div`
    display: flex;
    padding: 20px;
`;

const RecipeContent = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Header = styled.h1`
    text-align: center;
    margin-bottom: 20px;
`;

const DescriptionHeader = styled.h2`
    margin-top: 20px;
`;

const Description = styled.p`
    margin-bottom: 20px;
`;

const IngredientsHeader = styled.h2`
    margin-top: 20px;
`;

const Ingredients = styled.p`
    margin-bottom: 20px;
`;

const ImageContainer = styled.div`
    position: relative;
`;

const RecipeImage = styled.img`
    max-width: 100%;
    height: auto;
`;

const DeleteButton = styled.button`
    position: absolute;
    bottom: 10px;
    right: 20px;
    padding: 10px 20px;
    background-color: #dc3545; /* Red */
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    transition: background-color 0.3s;

    &:hover {
        background-color: #c82333; /* Darker red */
    }
`;

export default ReadRecipe;
