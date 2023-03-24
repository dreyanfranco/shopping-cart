import { Row, Col, Container, Form } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import Item from '../../components/Item';

const cacheTime = 60 * 60 * 1000;

const ItemsPage = () => {
    const [items, setItems] = useState([]);
    const fetchItems = async () => {
        const response = await fetch('https://itx-frontend-test.onrender.com/api/product')
        return response.json();
    }

    const { data, isLoading } = useQuery({ queryKey: ["items"], queryFn: fetchItems, staleTime: cacheTime, cacheTime })

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setItems(
            data.filter(item => item.brand.toLowerCase().includes(query) || item.model.toLowerCase().includes(query))
        )
    }

    useEffect(() => {
        if (!data) return;
        setItems(data);
    }, [data])

    return (
        <Container>
            {isLoading ?
                <p>Loading...</p>
                :
                <>
                    <Form className='mb-4 d-flex justify-content-end align-items-center'>
                        <Form.Control type="search" className="w-25"
                            aria-label="Search" placeholder='Search' onInput={(event) => handleSearch(event)} />
                    </Form>
                    <Row xs={1} md={3} lg={4} className='g-3' >
                        {items.map(item => (
                            <Col key={item.id}><Item {...item} /></Col>
                        ))}
                    </Row>
                </>
            }
        </Container>
    )
}

export default ItemsPage;
