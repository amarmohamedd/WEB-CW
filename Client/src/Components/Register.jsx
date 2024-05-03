import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/auth/register', { username: username, password: password })
            .then(result => {
                navigate('/auth/login');
                console.log(result);
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <RegisterContainer>
            <RegisterForm>
                <h3>Register</h3>
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
                    <SubmitButton type="submit">Submit</SubmitButton>
                    <LoginLink>
                        <span>Have an account?</span>
                        <Link to="/auth/login">Login</Link>
                    </LoginLink>
                </form>
            </RegisterForm>
        </RegisterContainer>
    );
}

const RegisterContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
`;

const RegisterForm = styled.div`
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
    background-color: #007bff; /* Blue background color */
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
`;


const LoginLink = styled.div`
    margin-top: 10px;
    text-align: center;

    span {
        margin-right: 5px;
    }

    a {
        text-decoration: none;
        color: #333;
        border: 1px solid #ccc;
        padding: 5px 10px;
        border-radius: 5px;

        &:hover {
            background-color: #f0f0f0;
        }
    }
`;

export default Register;
