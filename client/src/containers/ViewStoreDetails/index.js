import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './style.css';

class ViewStore extends Component {
    state = {
        store_name: '',
        store_products: [],
        store_id:'',
        comments: [],
        userCommentField: '',
        isStoreEmpty: true
    }

    async componentDidMount() {
        // this.getComments();
        this.getProducts();
    }

    getProducts = async () => {
        const { store_id } = this.props.match.params;
        try {
            const products_res = await axios.get(`/api/stores/products/${store_id}`);
            if (products_res.data.length > 0) {
                const products_list = products_res.data;
                this.setState({ isStoreEmpty: false, store_products: products_list });
            }
        } catch (e) {
            console.log(e);
        }

        try {
            const products_res = await axios.get(`/api/stores/${store_id}`);
            // console.log(products_res)
            if (products_res.data.length > 0) {
                this.setState({ store_id:store_id, store_name: products_res.data[0].store_name });
            }
        } catch (e) {
            console.log(e);
        }
    }

    handleUpdate = (event,id) => {
        event.preventDefault();
        console.log("Updating..."+id)

    }

    render() {
        let inventory =
            this.state.store_products.map(inventory => (
                <div className="store_row" key={inventory.inventory_id}>
                    <div className="store_col">
                        {inventory.product_name}
                    </div>
                    <div className="store_col">
                        ${inventory.product_price}
                        <input
                            type="text"
                            value={this.state.newPrice}
                            onChange={this.handlePriceChange}
                            className="input_field"
                            id={"price_" + inventory.inventory_id}
                            aria-describedby="newPrice"
                            placeholder="Enter new price"
                        />
                    </div>
                    <div className="store_col">
                        {inventory.quantity}
                        <input
                            type="text"
                            value={this.state.newQty}
                            onChange={this.handleQtyChange}
                            className="input_field"
                            id={"qty_" + inventory.inventory_id}
                            aria-describedby="newQuantity"
                            placeholder="Enter new qty"
                        />
                    </div>

                    <textarea
                        className="text_area"
                        id={"comment_" + inventory.inventory_id}
                        name={'comment_' + inventory.inventory_id}
                        maxLength={200}
                        value={this.state.comment}
                        onChange={this.handleCommentChange}
                        placeholder={"Enter comment"} />

                    <div id="action_btn_block">
                        <button onClick={(e) => this.handleUpdate(e,inventory.inventory_id)} type="submit" className="btn btn-outline-primary action_btn">Update</button>
                        <button onClick={this.handleDelete} type="submit" className="btn btn-outline-danger action_btn">Delete</button>
                    </div>
                </div>
            ));

        let storeDetailsForm =
            <form>
                <div className="store_container">
                    <div className="store_row_header">
                        <h3>Name</h3>
                        <h3>Price</h3>
                        <h3>Quantity</h3>
                        <h3>Comments</h3>
                        <h3>Actions</h3>
                    </div>
                    {inventory}
                </div>
            </form>

        return (
            <div className="wrapper">
                <h2 className="header">Store View Page</h2>
                <h3>Store Name: {this.state.store_name}</h3>
                <div id="add_btn_store"><Link to={`/products/add/${this.state.store_name}/${this.state.store_id}`}><button className="btn btn-outline-primary action_btn_store">Add New Store Product</button></Link></div>
                {this.state.isStoreEmpty ? <div>*** This store does not have any products associated. Please <Link to={`/products/add/${this.state.store_name}/${this.state.store_id}`}>add</Link> some merchandise. *** </div> : storeDetailsForm}
            </div>
        )
    }
}

export default ViewStore;