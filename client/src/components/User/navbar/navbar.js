import React from "react";
import {NavLink} from "react-router-dom";
import {Dropdown} from "react-bootstrap";

const Navbar = (props) => {
    return (
        <div>
            <nav className="navbar py-3 navbar-expand-lg navbar-dark bg-dark">
                <NavLink to={'/auctions'} className="navbar-brand font-weight-bold">MERN</NavLink>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        <li className="nav-item mx-3">
                            <NavLink to={'/possessions'} className="nav-link active">Possessions</NavLink>
                        </li>
                        <li className="nav-item mx-3">
                            <NavLink to={'/auctions'} className="nav-link active">Auctions</NavLink>
                        </li>
                        <li className="nav-item mx-3">
                            <NavLink to={'/chat'} className="nav-link active">Chat</NavLink>
                        </li>
                        <li className="nav-item mx-3">
                            <NavLink to={'/sets'} className="nav-link active">Sets</NavLink>
                        </li>
                        <li className="nav-item mx-3">
                            <NavLink to={'/faq'} className="nav-link active">FAQ</NavLink>
                        </li>
                    </ul>
                    <span className={'ml-auto mr-4'}>Rating: {props.rating}</span>
                    <Dropdown>
                        <Dropdown.Toggle variant="dark" id="dropdown-basic">
                            Profile
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item>
                                <NavLink to={'/profile'} className={'text-decoration-none text-dark'}>
                                    Profile
                                </NavLink>
                            </Dropdown.Item>
                            <Dropdown.Item className={'disabled'}>Balance: {props.balance}</Dropdown.Item>
                            <button type={'button'} className={'btn btn-white p-0'} onClick={() => props.logout()}>
                                <Dropdown.Item>Logout</Dropdown.Item>
                            </button>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
