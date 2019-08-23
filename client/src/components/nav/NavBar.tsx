import React from "react";
import "./NavBar.css";

export default class NavBar extends React.PureComponent {
    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <nav className="navbar navbar-dark bg-primary mb-4">
                <div className="navbar-brand mx-auto">
                    <h4 className="logo display-4">
                        <b>CryptoHero</b>
                    </h4>
                </div>
                <form className="form-inline">
                    <select disabled={true} className="custom-select" id="accountSelector">
                        <option selected>Account 1</option>
                        <option>Account 2</option>
                        <option>Account 3</option>
                        <option>Account 4</option>
                        <option>Account 5</option>
                    </select>
                    <button className="btn" id="addAccount" type="button">
                        <span className="addAccount text-light">+</span>
                    </button>
                </form>
            </nav>
        )
    }
}