import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Stores extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userLoggedIn: false
        }
    }
    render() {
        let stores =
        this.props.stores.map(store => (
            <p key={store.id}><Link to={`/stores/${store.id}`}>{store.store_name} - {store.store_city}, {store.store_state}</Link></p>
        )); 

        return (
            <div>
                <h2>List of Stores:</h2>
                {stores}
            </div>
        )
    }
}

export default Stores;