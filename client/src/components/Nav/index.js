import React from 'react';
import { Link } from 'react-router-dom';

const Nav = props => {
    return (
        <nav className='navbar navbar-light'>
            <Link className='navbar-brand' to='/'>Home</Link>
            {/* <ul className='navbar-nav'>
                <li className='nav-item'>
                    <Link to='/blogs'>Blogs</Link>
                </li>
            </ul> */}
        </nav>
    )
};

export default Nav;