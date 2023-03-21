import React from 'react'
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Item = ({ id, brand, model, price, imgUrl }) => {
    const quantity = 1;
    return (
        <Card className='h-100'>
            <Card.Img variant='top' src={imgUrl} height='200px' style={{ objectFit: 'contain' }} />
            <Card.Body className='d-flex flex-column'>
                <Card.Title className='d-flex justify-content-between align-items-baseline mb-4'>
                    <span className='ms-2'>{brand}</span>
                    <span className='ms-2'>{model}</span>
                    <span className='ms-2 text-muted'>{price}</span>
                </Card.Title>
                <div className='mt-auto'>
                    {quantity === 1 ? (
                        <Link to={`/itemdetails/${id}`}><Button className='w-100'>More details</Button></Link>
                    ) : <div className='d-flex align-items-center flex-column' style={{ gap: '0.5rem' }} >
                        <div className='d-flex align-items-center justify-content-center' style={{ gap: '0.5rem' }}>
                            <Button>-</Button>
                            <div>
                                <span className='fs-3'>{quantity}</span> in cart
                            </div>
                            <Button>+</Button>
                        </div>
                        <Button variant='danger' size='0'>Remove</Button>
                    </div>}
                </div>
            </Card.Body>
        </Card>
    )
}

export default Item;