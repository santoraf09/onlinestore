import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const HomePage = ({ filteredProducts, addToCart }) => {
  console.log("Produtos filtrados:", filteredProducts);

  return (
    <Container>
      <h3 className="text-center mt-4">Produtos em Destaque</h3>
      <Row className="row-cols-1 row-cols-md-3 g-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((produto) => (
            <Col key={produto.id}>
              <Card className="product-card">
                <Card.Img variant="top" src={produto.img} alt={produto.nome} />
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
          ))
        ) : (
          <p className="text-center mt-4">Nenhum produto encontrado.</p>
        )}
      </Row>
    </Container>
  );
};

export default HomePage;
