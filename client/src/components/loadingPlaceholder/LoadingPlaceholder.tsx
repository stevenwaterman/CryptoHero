import React from 'react';
import {ELEMENT} from "../../modules/RootStore";
import Container from "react-bootstrap/Container";
import {LoadingPlaceholderProps} from "./LoadingPlaceholderContainer";
import {Button} from "react-bootstrap";

export default class LoadingPlaceholder extends React.Component<LoadingPlaceholderProps> {
    render(): ELEMENT {
        return <>
            <Container fluid={true} className="text-center" hidden={!this.props.loading}>
                <h4 className="display-3">Logging In</h4>
                <br/>
                <Button onClick={this.props.createAccount}>Retry</Button>
            </Container>
        </>
    }
}
