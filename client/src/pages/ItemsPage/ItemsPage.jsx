import { Row, Col } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import Item from '../../components/Item';

const ItemsPage = () => {

    const [items, setItems] = useState([]);

    const loadItems = () => {
        fetch('https://itx-frontend-test.onrender.com/api/product')
            .then(res => res.json())
            .then(allItems => setItems(allItems));
    }

    useEffect(() => loadItems(), []);

    return (
        <>
            <Row md={3} xs={1} lg={4} className='g-3' >
                {items.map(item => (
                    <Col key={item.id}><Item {...item} /></Col>
                ))}
            </Row>
        </>
    )
}

export default ItemsPage;
