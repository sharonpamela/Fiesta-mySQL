import React, { Component } from 'react';

import axios from 'axios';
import './style.css';

class StoreDetail extends Component {
    state = {
        store_name: '',
        storeProducts: [],
        comments: [],
        userCommentField: ''
    }

    async componentDidMount() {
        // this.getComments();
        this.getProducts();
    }

    // getComments = async () => {

    //     const { id } = this.props.match.params;
    //     try {
    //         const commentResponse = await axios.get(`/api/stores/comments/${id}`);
    //         const comments = commentResponse.data;
    //         const { blog } = comments[0]
    //         console.log(blog);
    //         console.log('I am comments', comments);
    //         this.setState({ blog, comments });
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    getProducts = async () => {

        const { id } = this.props.match.params;
        try {
            const products_res = await axios.get(`/api/stores/${id}`);
            console.log(products_res)
            const store_name = products_res.data[0].store_name;
            const products_list = products_res.data;
            this.setState({ store_name: store_name, storeProducts: products_list });
            console.log(this.state)
        } catch (e) {
            console.log(e);
        }
    }

    // handleInputChange = event => {
    //     const { value } = event.target;
    //     this.setState({ userCommentField: value });
    // }

    handleSubmit = async event => {
        event.preventDefault();
        const { userCommentField: comment } = this.state.store_name;
        try {
            const response = await axios.post(`/api/blogs/${this.props.match.params.id}`, { comment });
            this.getComments();
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        let inventory =
            this.state.storeProducts.map(inventory => (
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
                            id="price"
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
                            id="qty"
                            aria-describedby="newQuantity"
                            placeholder="Enter new qty"
                        />
                    </div>

                    <textarea
                        className="text_area"
                        id="qty"
                        name={this.state.name + 'comment'}
                        maxLength={200}
                        value={this.state.comment}
                        onChange={this.handleCommentChange}
                        placeholder={"Enter comment"} />

                    <div id="action_btn_block">
                        <button onClick={this.handleSubmit} type="submit" className="btn btn-outline-primary action_btn">Update</button>
                        <button onClick={this.handleDelete} type="submit" className="btn btn-outline-danger action_btn">Delete</button>
                    </div>

                </div>
            ));

        return (
            <div className="wrapper">
                <form>
                    <h1 className="header">Store Products for {this.state.store_name}</h1>
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

                    <div className="form-group">
                    </div>
                </form>
            </div>
        )
    }
}

export default StoreDetail;



