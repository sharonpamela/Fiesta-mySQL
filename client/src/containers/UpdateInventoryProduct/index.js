import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';
import './style.css';

class UpdateInventoryProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inventory_id: '',
            store_id:'',
            product_name: '',
            product_price: '',
            product_qty: '',
            product_comment: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        // this.handleSelectChange = this.handleSelectChange.bind(this);
        this.isValidFloat = this.isValidFloat.bind(this);
    }

    componentDidMount() {
        const { inventory_id } = this.props.match.params;
        const { store_id } = this.props.match.params;
        this.setState({ inventory_id: inventory_id, store_id: store_id });

        axios.get(`http://localhost:3001/api/inventory/${inventory_id}`)
            .then(response => {
                console.log(response)
                this.setState({
                    product_name: response.data[0].product_name,
                    product_price: response.data[0].local_price,
                    product_qty: response.data[0].quantity,
                    product_comment: response.data[0].comment
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    handleInputChange(e) {
        let value = e.target.value;
        let name = e.target.name;
        this.setState(prevState => ({
            ...prevState, [name]: value
        }), () => console.log(this.state))
    }

    isValidFloat(num) {
        let regex = /^\d*\.?\d*$/;
        if (regex.test(num)) {
            return true;
        }
        return false;
    }

    handleSubmit = async event => {
        event.preventDefault();

        let inventory_id = this.state.inventory_id;
        let product_name = this.state.product_name;
        let product_price = this.state.product_price;
        let product_qty = this.state.product_qty;
        let product_comment = this.state.product_comment;

        if (product_name === '') {
            swal("Oops!", "Product Name is a required field.", "error");
        } else if (product_price === '') {
            swal("Oops!", "Product Price is a required field.", "error");
        } else if (this.isValidFloat(product_price) === false) {
            swal("Oops!", "Enter a Valid Product Price. Example: 0.00", "error");
        } else if (product_qty === '') {
            swal("Oops!", "Product Qty is a required field.", "error");
        }

        if (product_name !== '' && product_price !== '' && this.isValidFloat(product_price) === true && product_qty !== '') {
            try {
                // update the product 
                const product_insert_response = await axios.put(`http://localhost:3001/api/inventory/${inventory_id}`, { inventory_id:inventory_id, product_name: product_name, local_price: product_price, product_quantity:product_qty, product_comment: product_comment }, { headers: { 'Accept': 'application/json' } });
                if (product_insert_response.status === 200) {
                    swal("Success!", "The product has been updated!", "info")
                    .then((value) => {
                        window.location.href = `/stores/products/${this.state.store_id}`
                    })
                }
            } catch (e) {
                console.log(e);
                swal("Oops!", "Something went wrong adding this product.", "error"); // adding product to inventory depends on a successful product creation first
            }
        }
    }

    render() {
        return (
            <div className="wrapper">
                <form className="container-fluid" encType="multipart/form-data">
                    <h2 className="header">Update Product</h2>
                    <h3>Product Name: {this.state.product_name}</h3>
                    <div className="add_row">
                        <label>Product Price  (*):</label>
                        <input
                            type="text"
                            id="product_price"
                            className="form-control"
                            name={"product_price"}
                            onChange={(e) => this.handleInputChange(e)}
                            value={this.state.product_price || '0.00'}
                            required
                        />
                    </div>
                    <div className="add_row">
                        <label>Product Qty (*):</label>
                        <input
                            type="text"
                            id="product_qty"
                            className="form-control"
                            name={"product_qty"}
                            onChange={(e) => this.handleInputChange(e)}
                            value={this.state.product_qty || ''}
                            required
                        />
                    </div>
                    <div className="add_row">
                        <label>Product Comments (optional):</label>
                        <input
                            type="text"
                            id="product_comment"
                            className="form-control"
                            name="product_comment"
                            onChange={(e) => this.handleInputChange(e)}
                            value={this.state.product_comment || ''}
                        />
                    </div>
                    <div className="add_store_action_btn_block">
                        <button onClick={this.handleSubmit} className="btn btn-outline-primary action_btn">Submit</button>
                        <Link to={`/stores/products/${this.state.store_id}`}><button className="btn btn-outline-danger action_btn">Cancel</button></Link>
                    </div>
                </form>
            </div>
        )
    }
}

export default UpdateInventoryProduct;



