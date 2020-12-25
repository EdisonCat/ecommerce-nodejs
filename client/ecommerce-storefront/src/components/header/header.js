import React, { useState } from 'react';
import './header.css';
import locationIcon from '../../pictures/location-icon.png';
import logo from '../../pictures/Rooftop.png';
import searchIcon from '../../pictures/search-icon.png'
import usaIcon from '../../pictures/usa-icon.png';
import cartIcon from '../../pictures/cart-icon.png';
import { Dropdown } from 'react-bootstrap';
import { DropdownButton } from 'react-bootstrap';

export default function Header(props) {
    const [searchCategory, setSearchCategory] = useState('All Departments');
    const [zipcode, setZipcode] = useState(props.user === undefined ? 98109 : props.user.zipcode);
    const [show, setShow] = useState(false);
    const categories = [
        { value: 'All Departments', label: 'All Departments' },
        { value: 'Deals', label: 'Deals' },
        { value: 'Amazon Fresh', label: 'Amazon Fresh' },
        { value: 'Amazon Devices', label: 'Amazon Devices' },
        { value: 'Amazon Pharmacy', label: 'Amazon Pharmacy' },
    ];
    const menuContent1 = [
        {
            title: 'Your Account',
            content: [
                {
                    text: 'Account',
                    link: '/account'
                },
                {
                    text: 'Orders',
                    link: '/orders'
                },
                {
                    text: 'Sign Out',
                    link: '/signout'
                }
            ]
        },
        {
            title: 'Your List',
            content: [
                {
                    text: 'Create a List',
                    link: '/createlist'
                },
            ]
        },
        {
            title: 'Buy Again',
            content: [
                {
                    text: 'item1',
                    link: '/item/1'
                },
                {
                    text: 'item2',
                    link: '/item/2'
                }
            ]
        }
    ];

    return (
        <div className="storefront-header">
            <div className="upper">
                <div className="logo"><img alt="header-logo" src={logo} width="80px" /></div>
                <div className="zipcode"><img alt="location" src={locationIcon} /><label>{zipcode}</label></div>
                <div className="search">
                    <form>
                        <select className="category-selector">
                            {categories.map(category => <option value={category.value}>{category.label}</option>)}
                        </select>
                        <input type="text" />
                        <button onClick={e => { e.preventDefault(); }}><img className="search-icon" alt="search" src={searchIcon} /></button>
                    </form>
                </div>
                <div className="languages"><button><img alt="languages" src={usaIcon} /></button></div>
                <div className="menu">
                    <Dropdown
                        role="menu"
                        show={show}
                        onMouseOver={() => setShow(true)}
                        onMouseLeave={() => setShow(false)}
                    >
                        <Dropdown.Toggle
                            variant="success"
                            id="dropdown-basic"
                            className="dropdown-button"
                        >
                            <div>
                                {"Hello, " + (props.user ? props.user.username : "")}
                            </div>
                            <div>
                                Account & Lists
                            </div>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown">
                            {
                                menuContent1.map(
                                    contentBlock =>
                                        <div className="dropdown-block">
                                            <b>{contentBlock.title}</b>
                                            <br />
                                            {contentBlock.content.map(
                                                content =>
                                                    <Dropdown.Item className="item">{content.text}</Dropdown.Item>)
                                            }</div>)
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className="orders">Orders</div>
                <div className="cart"><label><img alt="cart-icon" src={cartIcon} width="30px"/>Cart</label></div>
            </div>
            <div className="categories">
                <ul>
                    <li>All</li>
                    <li>Gift Cards</li>
                    <li>Prime</li>
                    <li>Prime Video</li>
                    {/* <li>{props.user.username}'s Amazon.com</li> */}
                    <li>Customer Services</li>
                    <li>Best Sellers</li>
                    <li>Browsing History</li>
                    <li>Buy Again</li>
                    <li>Find a Gift</li>
                    <li>Fresh</li>
                    <li>Whole Foods</li>
                    <li>Subscribe & Save</li>
                    <li>New Releases</li>
                    <li>Kindle Books</li>
                    <li>Today's Deals</li>
                    <li>Send an instant gift card</li>
                </ul>
            </div>
        </div>
    );
}