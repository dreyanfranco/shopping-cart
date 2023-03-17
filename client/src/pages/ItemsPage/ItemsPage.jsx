import { Row, Col } from 'react-bootstrap';
import React from 'react';
import items from '../../data/items.json';
import { Item } from '../../components/Item';

export const ItemsPage = () => {
    return (
        <>
            <Row md={2} xs={1} lg={3} className='g-3' >
                {items.map(item => (
                    <Col key={item.id}><Item {...item} /></Col>
                ))}
            </Row>

        </>
    )
}
