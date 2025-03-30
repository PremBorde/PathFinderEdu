import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Poppins', sans-serif;
    line-height: 1.6;
    color: #2c3e50;
  }

  .cta-button {
    display: inline-block;
    background: #3498db;
    color: white;
    padding: 12px 30px;
    border-radius: 25px;
    text-decoration: none;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-2px);
    }
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    line-height: 1.3;
  }

  h2 {
    font-size: 2rem;
    color: #2c3e50;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  .benefits ul {
    list-style: none;
    padding-left: 25px;
    margin-top: 5px;
  }

  .benefits li {
    position: relative;
    margin: 5px 0;
    
    &:before {
      content: "•";
      color: #3498db;
      position: absolute;
      left: -15px;
    }
  }

  .notice {
    background: #fff3cd;
    border: 1px solid #ffeeba;
    color: #856404;
    padding: 15px;
    border-radius: 4px;
    margin: 20px 0;
  }
`;

export default GlobalStyles; 