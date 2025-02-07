import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import { Navbar, Nav, Container, Button, Row, Col, Card, Carousel, ListGroup, Form, Table, Image } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import ProductPage from './pages/ProductPage';

const produtos = [
  { id: 1, nome: "MacBook Pro M1", preco: "R$ 12.999", img: "/images/macbook.jpg", categoria: "Laptops & PCs", descricao: "MacBook Pro com chip M1 para máxima performance." },
  { id: 2, nome: "iPhone 14 Pro Max", preco: "R$ 9.999", img: "/images/iphone.jpg", categoria: "Smartphones", descricao: "O iPhone 14 Pro Max redefine a experiência mobile." },
  { id: 3, nome: "Headset Gamer HyperX", preco: "R$ 499", img: "/images/headset.jpg", categoria: "Acessórios Gamer", descricao: "Áudio imersivo para jogos e trabalho." },
  { id: 4, nome: "Monitor Ultrawide 34\"", preco: "R$ 2.799", img: "/images/monitor.jpg", categoria: "Monitores & TVs", descricao: "Monitor ultra-wide com alta taxa de atualização." },
  { id: 5, nome: "Mouse Logitech G Pro", preco: "R$ 349", img: "/images/mouse.jpg", categoria: "Periféricos", descricao: "Mouse gamer de alta precisão e desempenho." }
];

const App = () => {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(produtos);

  useEffect(() => {
    console.log("Atualizando produtos...");
    if (searchTerm === "") {
      setFilteredProducts(produtos);
    } else {
      setFilteredProducts(
        produtos.filter((produto) =>
          produto.nome.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm]);
  
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <Router>
      {/* HEADER */}
      <Navbar style={{ backgroundColor: "#1f2833" }} variant="dark" expand="lg">
        <Container fluid> {/* Usar "fluid" faz o conteúdo ocupar toda a largura */}
          <Navbar.Brand as={Link} to="/" className="logo">
            Tech Store
          </Navbar.Brand>

          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/products">Produtos</Nav.Link>
          </Nav>

          <Form className="d-flex search-bar">
            <Form.Control
              type="text"
              placeholder="Pesquisar tecnologia..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form>

          <Button variant="warning" as={Link} to="/cart" className="mx-3">
            🛒 Carrinho ({cart.length})
          </Button>
        </Container>
      </Navbar>

      {/* CONTEÚDO PRINCIPAL */}
      <Container fluid>
        <Row>
          {/* SIDEBAR */}
          <Col md={2} className="sidebar">
            <h5>Categorias</h5>
            <ListGroup>
              <ListGroup.Item action href="#">Smartphones</ListGroup.Item>
              <ListGroup.Item action href="#">Laptops & PCs</ListGroup.Item>
              <ListGroup.Item action href="#">Acessórios Gamer</ListGroup.Item>
              <ListGroup.Item action href="#">Periféricos</ListGroup.Item>
              <ListGroup.Item action href="#">Monitores & TVs</ListGroup.Item>
            </ListGroup>
          </Col>

          {/* CONTEÚDO PRINCIPAL */}
          <Col md={10}>
            <Routes>
              <Route path="/" element={<HomePage filteredProducts={filteredProducts} addToCart={addToCart} />} />
              <Route path="/produto/:id" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
            </Routes>
          </Col>
        </Row>
      </Container>

      {/* RODAPÉ */}
      <footer className="text-center p-4 bg-dark text-white mt-5">
        <p>&copy; 2025 Tech Store - Todos os direitos reservados</p>
      </footer>
    </Router>
  );
};

export default App;
