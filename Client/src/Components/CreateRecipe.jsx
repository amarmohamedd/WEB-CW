import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";

function CreateRecipe() {
    const [recipe, setRecipe] = useState({
        name: "",
        description: "",
        ingredients: "",
        imageUrl: "",
        cookingTime: "", 
        userId: window.localStorage.getItem("id")
    });

    const handleChange = (event) => {
        const { name, value } = event.target
        setRecipe({ ...recipe, [name]: value })
    }

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3001/recipe/create-recipe', recipe)
        .then(result => {
            const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
            savedRecipes.push(result.data);
            localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
            navigate('/');
            alert("Recipe Created Successfully")
        })
        .catch(err => console.log(err));
    };

    return (
        <Wrapper>
            <FormContainer className='p-3 border border-1'>
                <h3>Create Recipe</h3>
                <Form onSubmit={handleSubmit}>
                    <InputContainer className='mb-3'>
                        <label htmlFor='name'>Name</label>
                        <input type='text' name='name' placeholder='Enter name' onChange={handleChange} />
                    </InputContainer>
                    <InputContainer className='mb-3'>
                        <label htmlFor='description'>Description</label>
                        <input
                            type='text'
                            name='description'
                            placeholder='Enter description'
                            onChange={handleChange}
                        />
                    </InputContainer>
                    <InputContainer className='mb-3'>
                        <label htmlFor='ingredients'>Ingredients</label>
                        <input
                            type='text'
                            name='ingredients'
                            placeholder='Enter Ingredients'
                            onChange={handleChange}
                        />
                    </InputContainer>
                    <InputContainer className='mb-3'>
                        <label htmlFor='imageUrl'>ImageUrl</label>
                        <input type='text' name='imageUrl' placeholder='Enter URL' onChange={handleChange} />
                    </InputContainer>
                    
                    <SubmitButton type='submit'>Submit</SubmitButton>
                </Form>
            </FormContainer>
        </Wrapper>
    );
};


const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
    background-color: #f8f9fa; /* Light gray */
`;

const FormContainer = styled.div`
    width: 50%;
    background-color: #fff; /* White */
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); /* Shadow */
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;

    label {
        margin-bottom: 5px;
    }

    input {
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 16px;
    }
`;

const SubmitButton = styled.button`
    padding: 10px;
    background-color: #007bff; /* Blue */
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3; /* Darker blue */
    }
`;

export default CreateRecipe;