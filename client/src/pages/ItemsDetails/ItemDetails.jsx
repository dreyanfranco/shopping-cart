import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Container, Row, Col, Form } from "react-bootstrap";

const ItemDetails = () => {

    const { product_id } = useParams();
    const [item, setItem] = useState({});

    const loadItemDetails = () => {
        fetch(`https://itx-frontend-test.onrender.com/api/product/${product_id}`)
            .then(response => response.json())
            .then(itemDetails => setItem(itemDetails));
    }

    useEffect(() => loadItemDetails());

    return (
        <Container>
            <Row>
                <Col md={{ span: 6 }}>
                    <img src={item.imgUrl} alt={item.model} style={{ objectFit: 'contain', height: 'fit-content' }} />
                </Col>
                <Col md={{ span: 6 }}>
                    <h3>Details</h3>
                    <ul>
                        <li>Brand: {item.brand}</li>
                        <li>Model: {item.model}</li>
                        <li>Price: {item.price}</li>
                    </ul>
                    <hr />
                    <Col>
                        <Form>

                        </Form>
                        <ul>
                            <li>Storage: {item.battery}</li>
                            <li>Colors:</li>
                        </ul>
                    </Col>
                    <Button>Add to cart</Button>
                </Col>
            </Row>
            <Link to={'/itemspage'}><Button variant='primary'>Go back</Button></Link>
        </Container>
    )
}

export default ItemDetails;