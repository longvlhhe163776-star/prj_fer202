import React, { useContext, useState, useEffect } from 'react';
import { Table, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';
import { FiShoppingCart } from 'react-icons/fi';

const Cart = () => {
    // Đã thêm 'clearCart' từ CartContext
    const { cart, removeFromCart, clearCart } = useContext(CartContext); 
    const navigate = useNavigate();
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        let total = 0;
        cart.forEach(product => {
            total += product.price;
        });
        setTotalPrice(total);
    }, [cart]);

    // SỬA HÀM handleCheckout TẠI ĐÂY
    const handleCheckout = () => {
        // 1. Hiển thị thông báo checkout thành công
        alert(`Thanh toán thành công! Tổng cộng: $${totalPrice.toFixed(2)}. Cảm ơn bạn đã mua hàng. 🛍️`); 
        
        // 2. Xóa giỏ hàng (giả định thanh toán đã xong)
        clearCart(); 

        // 3. Chuyển hướng đến trang hóa đơn/xác nhận
        navigate('/invoice'); 
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={8}>
                    <h2 className="text-center my-4"> <FiShoppingCart /> Shopping Cart</h2>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((product, index) => (
                                <tr key={product.id}>
                                    <td>{index + 1}</td>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td>
                                        <Button variant="danger" size="sm" onClick={() => removeFromCart(product.id)}>
                                            Remove
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <Button style={{ marginLeft: '10px' }} variant="primary" onClick={() => navigate('/home')}>
                                Back to Homepage
                            </Button>
                            <Button style={{ display: cart.length === 0 ? 'none' : '', marginLeft: '10px' }} variant="secondary" onClick={clearCart} className="mr-2">
                                Clear Cart
                            </Button>
                            {/* Nút Checkout vẫn gọi hàm handleCheckout đã được sửa */}
                            <Button style={{ display: cart.length === 0 ? 'none' : '', marginLeft: '10px' }} variant="primary" onClick={handleCheckout}>
                                Checkout
                            </Button>
                        </div>
                        <h4>Total: ${totalPrice.toFixed(2)}</h4>
                    </div>

                </Col>
            </Row>
        </Container>
    );
};

export default Cart;