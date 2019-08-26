import React from "react";
import "./NavBar.css";
import {Button, Form, Navbar} from "react-bootstrap";

export default class TopBar extends React.PureComponent {
    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <Navbar bg="primary" variant="dark" className="mb-4">
                <Navbar.Brand className="mx-auto">
                    <h4 className="logo display-4">
                        <b>CryptoHero</b>
                    </h4>
                </Navbar.Brand>
                <Form className="form-inline">
                    <Form.Control as="select" disabled={true} value={"Account 1"}>
                        <option>Account 1</option>
                        <option>Account 2</option>
                        <option>Account 3</option>
                        <option>Account 4</option>
                        <option>Account 5</option>
                    </Form.Control>
                    <Button><span className="addAccount text-light">+</span></Button>
                </Form>
            </Navbar>
        )
    }
}