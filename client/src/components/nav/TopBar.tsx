import React from "react";
import "./NavBar.css";
import {Button, Form, Navbar} from "react-bootstrap";
import {TopBarProps} from "./TopBarContainer";

export default class TopBar extends React.PureComponent<TopBarProps> {
    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <Navbar bg="primary" variant="dark" className="mb-4">
                <Navbar.Brand className="mx-auto">
                    <h4 className="logo display-4">
                        <b>CryptoHero</b>
                    </h4>
                </Navbar.Brand>
                <Form className="form-inline">
                    <Form.Control as="select" value={this.props.selectedId} onChange={event => {
                        const selectedId = event.currentTarget.value;
                        if (selectedId != null)
                            this.props.selectAccount(selectedId)
                    }}>
                        {this.props.accounts.map(id => <option key={id} value={id}>{id}</option>)}
                    </Form.Control>
                    <Button onClick={this.props.createAccount}>
                        <span className="addAccount text-light">+</span>
                    </Button>
                </Form>
            </Navbar>
        )
    }
}