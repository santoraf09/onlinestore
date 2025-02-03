import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <h1>Meu E-commerce</h1>
      <nav>
        <a href="#home">Home</a>
        <a href="#products">Produtos</a>
        <a href="#contact">Contato</a>
      </nav>
    </header>
  );
};

export default Header;