import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { CartDispatchContext, CartContext } from "../../context/ShoppingCartContext";
import { useQuery } from "@tanstack/react-query";
import './styles.css';

const cacheTime = 60 * 60 * 1000;

const ItemDetails = () => {
    const dispatch = useContext(CartDispatchContext);
    const cart = useContext(CartContext);
    const [storage, setStorage] = useState();
    const [color, setColor] = useState();
    const { product_id } = useParams();

    const fetchItemDetails = async () => {
        const response = await fetch(`https://itx-frontend-test.onrender.com/api/product/${product_id}`)
        return response.json();
    }

    const { data, isLoading } = useQuery({ queryKey: ["item-detail", product_id], queryFn: fetchItemDetails, staleTime: cacheTime, cacheTime })

    useEffect(() => {
        if (!data) return;

        setStorage(data.options.storages[0].code)
        setColor(data.options.colors[0].code)
    }, [data]);

    const quantity = cart.items.find(item => item.id === data?.id)?.quantity || 0;

    const handleAddOneToCart = (product) => {
        dispatch({ type: 'addOneToCart', payload: { ...product, options: { color, storage } } })
    }

    const handleRemoveOneItem = (id) => {
        dispatch({ type: 'removeOneFromCart', payload: id })
    }

    const handleDeleteFromCart = (id) => {
        dispatch({ type: 'deleteFromCart', payload: id })
    }

    const handleStorageChange = (event) => {
        setStorage(parseInt(event.target.value));
    }
    const handleColorChange = (event) => {
        setColor(parseInt(event.target.value));
    }

    return (
        <Container>
            {isLoading ?
                <p>Loading...</p>
                :
                <>
                    <Row>
                        <Col md={{ span: 6 }} className='text-center'>
                            <img src={data.imgUrl} alt={data.model} style={{ objectFit: 'contain', height: 'fit-content' }} />
                        </Col>
                        <Col md={{ span: 6 }}>

                            <h3>Details</h3>
                            <ul>
                                <li>Brand: {data.brand}</li>
                                <li>Model: {data.model}</li>
                                <li>Price: {data.price}€</li>
                            </ul>
                            <hr />
                            <Col>
                                <Form>
                                    <ul>
                                        <li>Storage:
                                            <Form.Select className="w-50 mt-2" onChange={(event) => handleStorageChange(event)}>
                                                {data.options.storages.map((storage) => (
                                                    <option key={storage.code} value={storage.code}>{storage.name}</option>
                                                ))}
                                            </Form.Select></li>
                                        <li>
                                            Colors:
                                            <Form.Select className="w-50 mt-2" onChange={(event) => handleColorChange(event)}>
                                                {data.options.colors.map((color) => (
                                                    <option key={color.code} value={color.code}>{color.name}</option>
                                                ))}
                                            </Form.Select>
                                        </li>
                                    </ul>
                                </Form>
                            </Col>
                            <div className='mt-auto d-flex align-items-center justify-content-center'>
                                {quantity === 0 ? (
                                    <Button onClick={() => handleAddOneToCart(data)} className='w-50'>Add to cart</Button>
                                ) : <div className='d-flex align-items-center flex-column' style={{ gap: '0.5rem' }} >
                                    <div className='d-flex align-items-center justify-content-center' style={{ gap: '0.5rem' }}>
                                        <Button onClick={() => handleRemoveOneItem(data.id)}>-</Button>
                                        <div>
                                            <span className='fs-3'>{quantity}</span> in cart
                                        </div>
                                        <Button onClick={() => handleAddOneToCart(data)} >+</Button>
                                    </div>
                                    <Button onClick={() => handleDeleteFromCart(data.id)} variant='danger' size='0'>Delete</Button>
                                </div>}
                            </div>
                            <Link to={'/itemspage'} className="mt-3 d-flex justify-content-center align-content-center"><Button variant='primary' className='w-25' >Go back</Button></Link>
                        </Col>
                    </Row>
                </>
            }
        </Container>
    )
}

export default ItemDetails;