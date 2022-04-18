import React from "react";
import { Navbar, Dropdown, DropdownButton } from "react-bootstrap";
import './Logout.css';

const Logout = () => {
    return(
        <Navbar bg="dark" variant="dark" fixed="top">
            <DropdownButton title="M E N U ">
                <Dropdown.Item href="/">Log out</Dropdown.Item>
            </DropdownButton>
        </Navbar>
    );
}

export default Logout;