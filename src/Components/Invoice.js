import React, { useContext, useState, useEffect } from 'react';
import { Table, Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../Context/CartContext';

const Invoice = () => {
    const { cart, clearCart } = useContext(CartContext);
    const navigate = useNavigate();
    const [totalPrice, setTotalPrice] = useState(0);
    const [loggedInUser, setLoggedInUser] = useState(null);
    
    useEffect(() => {
        // Lấy thông tin người dùng từ localStorage khi component được render
        const user = JSON.parse(localStorage.getItem('loggedInUser'));
        console.log(user);
        
        if (user) {
            setLoggedInUser(user);
        }

        // Tính tổng giá trị đơn hàng khi giỏ hàng thay đổi
        let total = 0;
        cart.forEach(product => {
            total += product.price;
        });
        setTotalPrice(total);
    }, [cart]);

    const handleConfirmOrder = async () => {
        if (!loggedInUser) {
            console.error('User not logged in.');
            return;
        }

        // Tạo đối tượng order mới
        const order = {
            user: loggedInUser.username,
            cart: cart.map(product => ({
                id: product.id,
                name: product.name,
                price: product.price,
            })),
            address: loggedInUser.address,
        };

        try {
            // Gửi POST request để thêm order vào JSON server
            await axios.post('http://localhost:3000/orders', order);

            // Xóa giỏ hàng sau khi đã đặt hàng thành công
            clearCart();

            // Chuyển hướng về trang home
            navigate('/home');
        } catch (error) {
            console.error('Error saving order:', error);
        }
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={8}>
                    <h2 className="text-center my-4">Invoice</h2>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Product</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((product, index) => (
                                <tr key={product.id}>
                                    <td>{index + 1}</td>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <div className="d-flex justify-content-between align-items-center">
                        <Button variant="secondary" onClick={() => navigate('/cart')}>
                            Back to Cart
                        </Button>
                        <h4>Total: ${totalPrice.toFixed(2)}</h4>
                        <Button variant="primary" onClick={handleConfirmOrder}>
                            Confirm Order
                        </Button>
                    </div>
                    {/* Hiển thị thông tin người dùng và đơn hàng sau khi đặt hàng */}
                    {loggedInUser && (
                        <div className="mt-4">
                            <h5>Order Details:</h5>
                            <p>User: {loggedInUser.username}</p>
                            <p>Address: {loggedInUser.address}</p>
                            <p>Items:</p>
                            <ul>
                                {cart.map((item, index) => (
                                    <li key={index}>{item.name} - ${item.price.toFixed(2)}</li>
                                ))}
                            </ul>
                            <Button variant="primary" onClick={() => navigate('/home')}>
                                Back to Homepage
                            </Button>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Invoice;
