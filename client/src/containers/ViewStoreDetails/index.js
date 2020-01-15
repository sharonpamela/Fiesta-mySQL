import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './style.css';

class ViewStore extends Component {
    constructor(props) {
        super(props)

        this.state = {
            store_name: '',
            store_products: [],
            store_id: '',
            product_id: '',
            quantity: '',
            local_price: '',
            comments: '',
            userCommentField: '',
            isStoreEmpty: true,
            selected_id: '',
            isOn:{}

        }
        this.getProducts = this.getProducts.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    async componentDidMount() {
        // this.getComments();
        this.getProducts();
    }

    getProducts = async () => {
        const { store_id } = this.props.match.params;
        try {
            // get all the products of this store
            const products_res = await axios.get(`/api/stores/products/${store_id}`);
            if (products_res.data.length > 0) {
                this.setState({ isStoreEmpty: false, store_products: products_res.data });
            }
        } catch (e) {
            console.log(e);
        }

        try {
            // get the store info for a particular store
            const products_res = await axios.get(`/api/stores/${store_id}`);
            if (products_res.data.length > 0) {
                this.setState({ store_id: store_id, store_name: products_res.data[0].store_name });
            }
        } catch (e) {
            console.log(e);
        }
    }

    toggleState = () => {
        let toggleObj = this.state.store_products.map(inventory => (inventory.id:false ))
    }

    handleDelete = async (event, id) => {
        event.preventDefault();

        // handle the deletion of a store entry in the DB
        axios.delete(`http://localhost:3001/api/inventory/${id}`, { headers: { 'Accept': 'application/json' } })
            .then(response => {
                //remove it from store products
                let updatedProducts = this.state.store_products.filter(prod => prod.inventory_id !== id)
                this.setState({ store_products: updatedProducts })
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        let inventory =
            this.state.store_products.map(inventory => (
                <div className="store_row" key={inventory.inventory_id}>
                    <div className="store_col">
                        {/* <input
                            className="checkbox"
                            type="checkbox"
                            onChange={(e) => this.handleCheckbox(e)}
                            name={inventory.product_name}
                            // value={false}
                            id={inventory.inventory_id}
                            // checked={this.value}
                        /> */}
                        {inventory.product_name}
                    </div>
                    <div className="store_col">
                        ${inventory.local_price.toFixed(2)}
                        {/* <input
                            type="text"
                            value={this.state.newPrice}
                            onChange={this.handlePriceChange}
                            className="input_field"
                            id={"price_" + inventory.inventory_id}
                            aria-describedby="newPrice"
                            placeholder="Enter new price"
                        /> */}
                    </div>
                    <div className="store_col">
                        {inventory.quantity}
                        {/* <input
                            type="text"
                            value={this.state.newQty}
                            onChange={this.handleQtyChange}
                            className="input_field"
                            id={"qty_" + inventory.inventory_id}
                            aria-describedby="newQuantity"
                            placeholder="Enter new qty"
                        /> */}
                    </div>
                    <div className="store_col">
                    {inventory.comment} 
                    {/* <textarea
                        className="text_area"
                        id={"comment_" + inventory.inventory_id}
                        name={'comment_' + inventory.inventory_id}
                        maxLength={200}
                        value={this.state.comment}
                        onChange={this.handleCommentChange}
                        placeholder={inventory.comment} 
                        /> */}

                    </div>
                   

                    <div id="action_btn_block">
                        {/* <button onClick={(e) => this.handleUpdate(e, inventory.inventory_id)} type="submit" className="btn btn-outline-primary action_btn">Update</button> */}
                        <div id="add_btn_store"><Link to={`/inventory/${inventory.inventory_id}`}><button className="btn btn-outline-primary action_btn">Update</button></Link></div>
                        <button onClick={(e) => this.handleDelete(e, inventory.inventory_id)} type="submit" className="btn btn-outline-danger action_btn">Delete</button>
                    </div>
                </div>
            ));

        let storeDetailsForm =
            <form>
                <div className="store_container">
                    <div className="store_row_header">
                        <h3>Name</h3>
                        <h3>Local Price</h3>
                        <h3>Local Quantity</h3>
                        <h3>Comments</h3>
                        <h3>Actions</h3>
                    </div>
                    {inventory}
                </div>
            </form>

        return (
            <div className="wrapper">
                <h2 className="header">Store Details Page</h2>
                <h3>Store Name: {this.state.store_name}</h3>
                <div id="add_btn_store"><Link to={`/products/add/${this.state.store_name}/${this.state.store_id}`}><button className="btn btn-outline-primary action_btn_store">Add New Store Product</button></Link></div>
                {this.state.isStoreEmpty ? <div>*** This store does not have any products associated. Please <Link to={`/products/add/${this.state.store_name}/${this.state.store_id}`}>add</Link> some merchandise. *** </div> : storeDetailsForm}
            </div>
        )
    }
}

export default ViewStore;