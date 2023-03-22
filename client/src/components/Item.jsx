import React from 'react'
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Item = ({ id, brand, model, price, imgUrl }) => {

    return (
        <Card className='h-100'>
            <Card.Img variant='top' src={imgUrl} height='200px' style={{ objectFit: 'contain' }} />
            <Card.Body className='d-flex flex-column'>
                <Card.Title className='d-flex justify-content-between align-items-baseline mb-4'>
                    <span className='ms-2'>{brand}</span>
                    <span className='ms-2'>{model}</span>
                    <span className='ms-2 text-muted'>{price}€</span>
                </Card.Title>
                <div className='mt-auto'>
                    <Link to={`/itemdetails/${id}`}><Button className='w-100'>More details</Button></Link>
                </div>
            </Card.Body>
        </Card>
    )
}

export default Item;