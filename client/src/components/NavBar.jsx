import React from 'react';
import { Container, Navbar as NavBarBs, Nav, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { BsCart2 } from "react-icons/bs";

export const NavBar = () => {
    return (
        <NavBarBs stycky='top' className='bg-white shadow-sm mb-3'>
            <Container className='me-auto'>
                <Nav>
                    <Nav.Link to="/" as={NavLink}>Home</Nav.Link>
                    <Nav.Link to="/itemspage" as={NavLink}>Items</Nav.Link>
                </Nav>
                <Button
                    style={{ position: "relative" }} variant='outline-primary'>
                    <BsCart2 size={30} />

                </Button>
                <div
                    className='rounded-circle bg-danger d-flex justify-content-center align-items-center' style={{
                        color: 'white',
                        width: '1.5rem',
                        height: '1.5rem',
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        transform: "translate(-5%, 25%)"
                    }}>
                    3
                </div>
            </Container>
        </NavBarBs>
    )
}
