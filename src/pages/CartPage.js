import React from 'react';
import { Container, Table, Button } from 'react-bootstrap';

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
            <th>Quantidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.nome}>
              <td>{item.nome}</td>
              <td>{item.preco}</td>
              <td>{item.quantidade}</td>
              <td>
                <Button variant="danger" onClick={() => removeFromCart(item.nome)}>Remover</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h3>Total: R$ {cart.reduce((total, item) => total + parseFloat(item.preco.replace("R$ ", "")) * item.quantidade, 0)}</h3>
    </Container>
  );
};

export default CartPage;
