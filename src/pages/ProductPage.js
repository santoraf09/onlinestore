import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Image, Button } from 'react-bootstrap';

const produtos = [
  { id: 1, nome: "MacBook Pro M1", preco: "R$ 12.999", img: "/images/macbook.jpg", descricao: "MacBook Pro com chip M1 para máxima performance." },
  { id: 2, nome: "iPhone 14 Pro Max", preco: "R$ 9.999", img: "/images/iphone.jpg", descricao: "O iPhone 14 Pro Max redefine a experiência mobile." },
];

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

export default ProductPage;
