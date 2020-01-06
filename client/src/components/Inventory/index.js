import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import uuid from 'react-uuid';

import './style.css';

class Inventory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inventory: false
        }
    }

    render() {
        let inventory =
            this.props.inventory.map(inventory => (
                <div className="inventory_entry" key={inventory.id}>
                    <div className="inventory_entry_product">{inventory.product_name}</div>
                    <div className="inventory_entry_store">{inventory.store_name}</div>
                    <div className="inventory_entry_qty">{inventory.quantity}</div>
                </div>
            ));

        return (
            <div>
                <h2>Current Inventory:</h2>
                <div className="inventory_container">
                    <div className="inventory_entry" key={uuid()}>
                        <h3 className="inventory_entry_product">Product Name</h3>
                        <h3 className="inventory_entry_store">Store Name</h3>
                        <h3 className="inventory_entry_qty">Quantity</h3>
                    </div>
                    {inventory}
                </div>
            </div>
        )
    }
}

export default Inventory

