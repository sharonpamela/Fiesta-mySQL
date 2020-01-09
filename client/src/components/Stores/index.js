import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

class Stores extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userLoggedIn: false
        }
    }
    render() {
        let stores = this.props.stores.map(store => (
            <div key={store.id} className="store_row">
                <div className="store_col">{store.store_name}</div>
                <div className="store_col">{store.store_city}, {store.store_state}</div>

                <div className="store_col" id="action_btn_block_stores">
                    <Link to={`/stores/${store.id}`}><button className="btn btn-outline-primary action_btn_store">View Store</button></Link>
                </div>
            </div>
        ));

        return (
            <div className="wrapper">
                <h2 className="header">Stores:</h2>

                <div className="store_row_header">
                    <h3>Name</h3>
                    <h3>Location</h3>
                    <h3>Actions</h3>
                </div>
                {stores}
                <div id="add_store"><button onClick={this.handleAddStore} className="btn btn-outline-primary">Add Store</button></div>
            </div>
        )
    }
}

export default Stores;