import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';
import './style.css';

class AddNewStoreProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            store_name: '',
            store_id: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    componentDidMount() {
        const { store_name } = this.props.match.params;
        const { store_id } = this.props.match.params;
        this.setState({ store_name: store_name, store_id: store_id })
    }

    handleInputChange(e) {
        let value = e.target.value;
        let name = e.target.name;
        this.setState(prevState => ({
            ...prevState, [name]: value

        }), () => console.log(this.state))
    }

    handleSelectChange(e) {
        let value = e.target.value;
        let name = e.target.name;
        this.setState(prevState => ({
            ...prevState, [name]: value

        }), () => console.log(this.state))
    }

    handleSubmit = async event => {
        event.preventDefault();

        let storeName = this.state.store_name;
        let storeCity = this.state.store_city;
        let storeState = this.state.store_state;

        if (storeName === '') {
            swal("Oops!", "Store Name is a required field.", "error");
        } else if (storeCity === '') {
            swal("Oops!", "Store City is a required field.", "error");
        } else if (storeState === '') {
            swal("Oops!", "Store State is a required field.", "error");
        }

        if (storeName !== '' && storeCity !== '' && storeState !== '') {
            // handle the submission of the form data to the database
            axios.post('http://localhost:3001/api/stores', { store_name: storeName, store_city: storeCity, store_state: storeState }, { headers: { 'Accept': 'application/json' } })
                .then(response => {
                    console.log(response)
                    if (response.status === 200) {
                        swal("Success!", "A new store has been added!", "info")
                            .then((value) => {
                                window.location.href = "/stores"
                            })
                    }
                    if (response.data.status === false || response.data.status === '500') {
                        swal("Oops!", "Something went wrong adding this store.", "error");
                    }
                });
        }
    }

    render() {
        return (
            <div className="wrapper">
                <form className="container-fluid" encType="multipart/form-data">
                    <h2 className="header">Add New Product Page</h2>
                    <h3>Store Name: {this.state.store_name}</h3>
                    <div className="add_row">
                        <label>Product Name: </label>
                        <input
                            type="text"
                            id="store_name"
                            className="form-control"
                            name={"store_name"}
                            onChange={(e) => this.handleInputChange(e)}
                            value={this.state.store_name}
                            required
                        />
                    </div>
                    <div className="add_row">
                        <label>Product Price:</label>
                        <input
                            type="text"
                            id="store_city"
                            className="form-control"
                            name={"store_city"}
                            onChange={(e) => this.handleInputChange(e)}
                            value={this.state.store_city}
                            required
                        />
                    </div>
                    <div className="add_row">
                        <label>Product Image URL (optional):</label>
                        <input
                            type="text"
                            id="store_city"
                            className="form-control"
                            name={"store_city"}
                            onChange={(e) => this.handleInputChange(e)}
                            value={this.state.store_city}
                            required
                        />
                    </div>
                    <div className="add_row">
                        <label>Product Comments (optional):</label>
                        <input
                            type="text"
                            id="store_city"
                            className="form-control"
                            name={"store_city"}
                            onChange={(e) => this.handleInputChange(e)}
                            value={this.state.store_city}
                            required
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

export default AddNewStoreProduct;



