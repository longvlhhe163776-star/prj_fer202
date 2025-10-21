import React, { useContext, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AuthContext } from '../Context/AuthContext';
import { CartContext } from '../Context/CartContext';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const { role } = useContext(AuthContext);
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const handleShowDetails = () => {
        if (role === 'user') {
            setShowModal(true); // Show modal immediately
        } else {
            navigate('/login');
        }
    };

    const handleAddToCart = () => {
        addToCart(product);
        setShowModal(false); // Close modal after adding to cart
    };

    return (
        <>
            <Card style={{ width: '18rem', margin: '1rem' }}>
                <div onClick={handleShowDetails}>
                    <Card.Img variant="top" src={product.image} alt={product.name} />
                </div>
                {/* <Card.Img variant="top" src={product.image} alt={product.name} /> */}
                <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                    <Card.Text><strong>Price: ${product.price}</strong></Card.Text>
                    <Button variant="primary" onClick={handleShowDetails}>Details</Button>
                </Card.Body>
            </Card>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{product.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={product.image} alt={product.name} style={{ width: '100%' }} />
                    <p>{product.description}</p>
                    <p><strong>Price: ${product.price}</strong></p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handleAddToCart}>Add to Cart</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ProductCard;
