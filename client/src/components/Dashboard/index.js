import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./style.css";
import storeimg from './../../img/stores.png';
import prodimg from './../../img/products.png';

class Dashboard extends Component {
    render() {
        return (
            <div className="options">
                <Link to='/stores'>
                    <div className="card">
                        <p>Stores</p>
                        <img className="icon" alt="stores icon" src={storeimg} />
                    </div>
                </Link>

                <Link to='/products'>
                    <div className="card">
                        <p>Products</p>
                        <img className="icon" alt="product icon" src={prodimg} />
                    </div>
                </Link>
            </div>
        )
    }
}
export default Dashboard;
