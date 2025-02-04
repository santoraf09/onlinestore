import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import { Navbar, Nav, Container, Button, Row, Col, Card, Carousel, ListGroup, Form, Table, Image } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';

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
    setFilteredProducts(
      produtos.filter((produto) =>
        produto.nome.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <Router>
      {/* HEADER */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">Tech Store</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/cart">
              <FaShoppingCart /> Carrinho ({cart.length})
            </Nav.Link>
          </Nav>
          <Form inline>
            <Form.Control
              type="text"
              placeholder="Pesquisar tecnologia..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form>
        </Container>
      </Navbar>

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

// Página principal com a lista de produtos
const HomePage = ({ filteredProducts, addToCart }) => (
  <>
    <h3 className="text-center mt-4">Produtos em Destaque</h3>
    <Row className="row-cols-1 row-cols-md-3 g-4">
      {filteredProducts.length > 0 ? filteredProducts.map((produto) => (
        <Col key={produto.id}>
          <Card className="product-card">
            <Card.Img variant="top" src={produto.img} />
            <Card.Body>
              <Card.Title>{produto.nome}</Card.Title>
              <Card.Text>{produto.preco}</Card.Text>
              <Button variant="primary" as={Link} to={`/produto/${produto.id}`}>
                Ver Detalhes
              </Button>
              <Button variant="success" className="ms-2" onClick={() => addToCart(produto)}>
                Adicionar ao Carrinho
              </Button>
            </Card.Body>
          </Card>
        </Col>
      )) : <p className="text-center mt-4">Nenhum produto encontrado.</p>}
    </Row>
  </>
);

// Página de detalhes do produto
const ProductPage = () => {
  const { id } = useParams();
  const produto = produtos.find(p => p.id === parseInt(id));

  if (!produto) return <h2>Produto não encontrado</h2>;

  return (
    <Container className="text-center">
      <h1>{produto.nome}</h1>
      <Image src={produto.img} fluid />
      <p>{produto.descricao}</p>
      <h3>{produto.preco}</h3>
      <Button variant="success">Comprar Agora</Button>
    </Container>
  );
};

// Página do carrinho de compras
const CartPage = ({ cart, setCart }) => {
  const removeFromCart = (nome) => {
    setCart(cart.filter(item => item.nome !== nome));
  };

  return (
    <Container>
      <h2>Seu Carrinho</h2>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Produto</th>
            <th>Preço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.nome}>
              <td>{item.nome}</td>
              <td>{item.preco}</td>
              <td>
                <Button variant="danger" onClick={() => removeFromCart(item.nome)}>Remover</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h3>Total: R$ {cart.reduce((total, item) => total + parseFloat(item.preco.replace("R$ ", "")), 0)}</h3>
    </Container>
  );
};

export default App;
