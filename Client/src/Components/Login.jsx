import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!username || !password) {
            setError('Username and password are required');
            return; 
        }
    
        axios.post('http://localhost:3001/auth/login', { username: username, password: password })
            .then(response => {
                if (response.status === 200) {
                    window.localStorage.setItem("id", response.data.id);
                    navigate('/');
                    console.log("Login successful");
                } else {
                    setError("Login failed");
                }
            })
            .catch(error => {
                if (error.response) {
                   
                    if (error.response.status === 401) {
                        setError("Incorrect username or password");
                    } else {
                        setError("Failed to login. Please try again later.");
                    }
                } else if (error.request) {
                   
                    console.error("Error:", error.request);
                    setError("Failed to login. Please check your network connection.");
                } else {
                    console.error("Error:", error.message);
                    setError("Failed to login. Please try again later.");
                }
            });
    };
    
    return (
        <LoginContainer>
            <LoginForm>
                <h3>Login</h3>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <form onSubmit={handleSubmit}>
                    <FormGroup>
                        <label htmlFor="username">Username</label>
                        <Input
                            type="text"
                            placeholder="Enter Username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="password">Password</label>
                        <Input
                            type="password"
                            placeholder="Enter password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormGroup>
                    <SubmitButton type="submit">Login</SubmitButton>
                    <SignUpLink to="/auth/register">Sign Up</SignUpLink>
                </form>
            </LoginForm>
        </LoginContainer>
    );
}

const ErrorMessage = styled.p`
    color: red;
    font-size: 14px;
    margin-top: 5px;
`;

const LoginContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
`;

const LoginForm = styled.div`
    padding: 20px;
    border: 1px solid #ccc;
    width: 300px;
    background-color: #fff;
`;

const FormGroup = styled.div`
    margin-bottom: 15px;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const SubmitButton = styled.button`
    width: 100%;
    padding: 10px;
    background-color: #007bff; /* Changed to blue */
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
`;

const SignUpLink = styled(Link)`
    display: block;
    text-align: center;
    margin-top: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    text-decoration: none;
    color: #333;

    &:hover {
        background-color: #f0f0f0;
    }
`;

export default Login;
