import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const LoginPageContainer = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #87CEEB 0%, #1E90FF 50%, #4682B4 100%);
  position: relative;
  overflow: hidden;
  animation: ${fadeIn} 0.8s ease-out;
`;

const BackgroundElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const Particle = styled.div`
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  animation: ${float} 6s ease-in-out infinite;

  &:nth-child(1) {
    width: 4px;
    height: 4px;
    top: 20%;
    left: 15%;
    animation-delay: 0s;
  }

  &:nth-child(2) {
    width: 6px;
    height: 6px;
    top: 60%;
    right: 20%;
    animation-delay: 2s;
  }

  &:nth-child(3) {
    width: 3px;
    height: 3px;
    bottom: 30%;
    left: 25%;
    animation-delay: 4s;
  }

  &:nth-child(4) {
    width: 5px;
    height: 5px;
    top: 40%;
    right: 30%;
    animation-delay: 1s;
  }
`;

const LoginBox = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 3rem;
  border-radius: 25px;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 450px;
  text-align: center;
  position: relative;
  z-index: 10;
  animation: ${fadeIn} 1s ease-out 0.2s both;
`;

const Logo = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  animation: ${pulse} 3s ease-in-out infinite;
`;

const Title = styled.h1`
  margin-bottom: 0.5rem;
  font-size: 2.2rem;
  font-weight: 700;
  color: #ffffff;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  letter-spacing: 1px;
`;

const Subtitle = styled.p`
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  font-weight: 300;
  letter-spacing: 0.5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1.2rem;
  margin-bottom: 1rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  font-size: 1rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.6);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 12px;
  background: linear-gradient(45deg, #ffffff, #f0f8ff, #ffffff);
  background-size: 200% 200%;
  color: #1E90FF;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  animation: ${shimmer} 3s ease-in-out infinite;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    background-position: 100% 0;
  }

  &:active {
    transform: translateY(0);
  }
`;

const AltOption = styled.div`
  margin-top: 2rem;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.8);
`;

const LinkButton = styled.button`
  background: none;
  border: none;
  color: #ffffff;
  cursor: pointer;
  text-decoration: underline;
  font-weight: 500;
  margin-left: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    color: rgba(255, 255, 255, 0.8);
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
  }
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  margin: 1rem 0;
  font-size: 0.9rem;
  background: rgba(255, 107, 107, 0.1);
  padding: 0.8rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 107, 107, 0.3);
  backdrop-filter: blur(10px);
`;

const LoginPage = () => {
    const navigate = useNavigate();
    const { login, signup } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            let success;
            if (isLogin) {
                success = await login(formData.email, formData.password);
            } else {
                success = await signup(formData.name, formData.email, formData.password);
            }

            if (success) {
                navigate('/dashboard');
            } else {
                setError('Authentication failed. Please check your credentials.');
            }
        } catch (err) {
            setError(err.message || 'An error occurred. Please try again.');
        }
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setError('');
    };

    return (
        <LoginPageContainer>
            <BackgroundElements>
                <Particle />
                <Particle />
                <Particle />
                <Particle />
            </BackgroundElements>
            
            <LoginBox>
                <Logo>🎓</Logo>
                <Title>{isLogin ? 'Welcome Back!' : 'Create Account'}</Title>
                <Subtitle>Please {isLogin ? 'login' : 'sign up'} to continue your career journey</Subtitle>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <Input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    )}
                    <Input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <Button type="submit">
                        {isLogin ? 'Login' : 'Sign Up'}
                    </Button>
                </form>
                <AltOption>
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <LinkButton onClick={toggleForm}>
                        {isLogin ? 'Sign Up' : 'Login'}
                    </LinkButton>
                </AltOption>
            </LoginBox>
        </LoginPageContainer>
    );
};

export default LoginPage; 