import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { 
  Navbar, 
  Nav, 
  Container, 
  Button, 
  Row, 
  Col, 
  Card, 
  Carousel, 
  ListGroup, 
  Form 
} from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import HomePage from './pages/HomePage.js';
import CartPage from './pages/CartPage.js';


const App = () => {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para a pesquisa

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Router>
      {/* HEADER */}
      <Navbar bg="dark" variant="dark" expand="lg" className="navbar-custom">
        <Container>
          <Navbar.Brand className="logo">Online Store</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/products">Products</Nav.Link>
          </Nav>
          <Form inline>
            <Form.Control
              type="text"
              placeholder="Pesquisar produtos"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Form>
          <Button variant="warning" href="/cart">
            <FaShoppingCart /> Cart ({cart.length})
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
              <ListGroup.Item action href="#">Eletrônicos</ListGroup.Item>
              <ListGroup.Item action href="#">Moda</ListGroup.Item>
              <ListGroup.Item action href="#">Casa & Decoração</ListGroup.Item>
              <ListGroup.Item action href="#">Beleza</ListGroup.Item>
              <ListGroup.Item action href="#">Esportes</ListGroup.Item>
            </ListGroup>
          </Col>

          {/* CONTEÚDO PRINCIPAL */}
          <Col md={10}>
            {/* CARROSSEL PROMOCIONAL */}
            <Carousel>
              <Carousel.Item>
                <img className="d-block w-100" src="/banner1.jpg" alt="Promoção 1" />
              </Carousel.Item>
              <Carousel.Item>
                <img className="d-block w-100" src="/banner2.jpg" alt="Promoção 2" />
              </Carousel.Item>
            </Carousel>

            {/* SEÇÃO DE PRODUTOS EM DESTAQUE */}
            <h3 className="text-center mt-4">Produtos em Destaque</h3>
            <Row className="justify-content-center">
              {[1, 2, 3].map((num) => (
                <Col md={4} key={num} className="mb-4">
                  <Card className="product-card">
                    <Card.Img variant="top" src={`/produto${num}.jpg`} />
                    <Card.Body>
                      <Card.Title>Produto {num}</Card.Title>
                      <Card.Text>
                        Descrição do produto {num}
                      </Card.Text>
                      <Button variant="success" onClick={() => addToCart(`Produto ${num}`)}>
                        Adicionar ao Carrinho
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>

      {/* RODAPÉ */}
      <footer className="text-center p-4 bg-dark text-white mt-5">
        <p>&copy; 2025 Online Store - Todos os direitos reservados</p>
      </footer>

      {/* ROTAS */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={< CartPage cart={cart} />} />
      </Routes>
    </Router>
  );
};

export default App;