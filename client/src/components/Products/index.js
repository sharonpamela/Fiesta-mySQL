import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            property: false
        }
    }

    render() {
        let products =
            this.props.products.map(product => (
                // <div key={product.id}>
                //     <img src={product.product_image_url} crossOrigin="true" alt={product.product_name} className="product_img prod_col" />
                //     <Link to={`/product/${product.id}`}>
                //         {product.product_name} - ${product.product_price}
                //     </Link>
                // </div>
                <div key={product.id} className="prod_row">
                    
                    <div className="prod_col">
                        <img src={product.product_image_url} crossOrigin="true" alt={product.product_name} className="product_img prod_col" />
                    </div>
                    <div className="prod_col">{product.product_name}</div>
                    <div className="prod_col">
                        ${product.product_price}
                        <input
                            type="text"
                            value={this.state.newQty}
                            onChange={this.handleQtyChange}
                            className="input_field"
                            id="qty"
                            aria-describedby="newQuantity"
                            placeholder="New price"
                        />
                    </div>

                    <div className="prod_col" id="action_btn_block_prod">
                        {/* <Link to={`/stores/${store.id}`}><button className="btn btn-outline-primary action_btn_store">Summit Changes</button></Link> */}
                        <div id="update_product"><button onClick={this.handleUpdate} className="btn btn-outline-primary">Update</button></div>

                    </div>
                </div>
            ));

        return (
            <div className="wrapper">
                <h2 className="header">All Products:</h2>
                <div className="prod_row_header">
                    <h3>Image</h3>
                    <h3>Name</h3>
                    <h3>Price</h3>
                    <h3>Action</h3>
                </div>
                {products}
                <div id="add_product"><button onClick={this.handleAddProduct} className="btn btn-outline-primary add_action_btn">Add Product</button></div>
            </div>
        )
    }
}

export default Products;


