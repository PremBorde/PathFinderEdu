import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: 'Poppins', sans-serif;
    transition: all 0.50s linear;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    color: ${({ theme }) => theme.link};
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: ${({ theme }) => theme.primary};
    }
  }

  button {
    font-family: 'Poppins', sans-serif;
    cursor: pointer;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.3;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.text};
  }

  p {
    margin-bottom: 1rem;
  }

  .btn-primary {
    background-color: ${({ theme }) => theme.buttonBackground};
    color: ${({ theme }) => theme.buttonText};
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 500;

    &:hover {
      background-color: ${({ theme }) => theme.primaryDark};
      transform: translateY(-1px);
    }

    &:active {
      transform: translateY(0);
    }
  }

  .card {
    background: ${({ theme }) => theme.cardBackground};
    box-shadow: ${({ theme }) => theme.shadow};
    border-radius: 10px;
    padding: 20px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: ${({ theme }) => theme.shadow}, 0 10px 20px rgba(0, 0, 0, 0.1);
    }
  }

  nav {
    background: ${({ theme }) => theme.navbar} !important;
    box-shadow: ${({ theme }) => theme.navbarShadow};
  }

  // Scrollbar styling
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.body};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.primary};
    border-radius: 4px;

    &:hover {
      background: ${({ theme }) => theme.primaryDark};
    }
  }

  // Selection styling
  ::selection {
    background: ${({ theme }) => theme.primary};
    color: white;
  }

  // Focus outline
  :focus {
    outline: 2px solid ${({ theme }) => theme.primary};
    outline-offset: 2px;
  }

  // Smooth scrolling
  html {
    scroll-behavior: smooth;
  }

  // Container
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  // Grid system
  .grid {
    display: grid;
    gap: 2rem;
  }

  .grid-2 {
    grid-template-columns: repeat(2, 1fr);
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .grid-3 {
    grid-template-columns: repeat(3, 1fr);
    @media (max-width: 968px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 568px) {
      grid-template-columns: 1fr;
    }
  }

  .grid-4 {
    grid-template-columns: repeat(4, 1fr);
    @media (max-width: 1200px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 968px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 568px) {
      grid-template-columns: 1fr;
    }
  }
`; 