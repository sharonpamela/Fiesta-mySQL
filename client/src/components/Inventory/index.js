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
         let inventory = this.props.inventory.map(inventory => (
                <div className="inventory_row" key={inventory.id}>
                    <div className="inventory_col">
                        {inventory.product_name}
                    </div>

                    <div className="inventory_col">
                        {inventory.store_name}
                    </div>

                    <div className="inventory_col">
                        {inventory.quantity}
                        <input
                            type="text"
                            value={this.state.newQty}
                            onChange={this.handleQtyChange}
                            className="input_field_inventory"
                            id="qty"
                            aria-describedby="newQuantity"
                            placeholder="New qty"
                        />
                    </div>

                    <textarea
                        className="text_area inventory_col"
                        id="qty"
                        name={this.state.name + 'comment'}
                        maxLength={200}
                        value={this.state.comment}
                        onChange={this.handleCommentChange}
                        placeholder={"Enter comment"}
                    />

                    <div id="action_btn_block_inventory ">
                        <button onClick={this.handleSubmit} type="submit" className="btn btn-outline-primary action_btn_inventory">Update Inventory</button>
                    </div>
                </div>
            ))
        return (
            <div className="wrapper">
                <h2 className="header">Current Inventory of All Products Across All Stores:</h2>
                <div className="inventory_container_inventory">
                    <div className="inventory_row_header" key={uuid()}>
                        <h3 className="inventory_col">Product Name</h3>
                        <h3 className="inventory_col">Store Name</h3>
                        <h3 className="inventory_col">Quantity</h3>
                        <h3 className="inventory_col">Comments</h3>
                        <h3 className="inventory_col">Actions</h3>
                    </div>
                    {inventory}
                </div>
            </div>
        )

        }
    }

    export default Inventory;