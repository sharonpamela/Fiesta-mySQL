import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// import containers
import ViewStoreDetails from './containers/ViewStoreDetails';
import AddNewStore from './containers/AddNewStore';
import AddNewStoreProduct from './containers/AddNewStoreProduct';
import UpdateInventoryProduct from './containers/UpdateInventoryProduct';

// import Components
import Nav from './components/Nav';
import Dashboard from './components/Dashboard';
import Stores from './components/Stores';
import Products from './components/Products';
import Inventory from './components/Inventory';

import axios from 'axios';

class App extends Component {

  constructor() {
    super();
    this.state = {
      stores: [],
      products: [],
      inventory: []
    };
    this.handleDeleteStore = this.handleDeleteStore.bind(this);
  }
  componentDidMount() {
    axios.get('/api/stores')
      .then(response => {
        this.setState({ stores: response.data });
        // console.log(this.state);
      })
      .catch(e => {
        console.log(e);
      });

    axios.get('/api/products')
      .then(response => {
        this.setState({ products: response.data });
        // console.log(this.state);
      })
      .catch(e => {
        console.log(e);
      });

    axios.get('/api/inventory')
      .then(response => {
        this.setState({ inventory: response.data });
        // console.log(this.state);
      })
      .catch(e => {
        console.log(e);
      });
  }

  handleDeleteStore = (id) => {
    // handle the deletion of a store entry in the DB
    axios.delete(`http://localhost:3001/api/stores/${id}`, { headers: { 'Accept': 'application/json' } })
      .then(response => {
        // fetch the new list of stores
        axios.get('/api/stores')
          .then(response => {
            this.setState({ stores: response.data });
          })
          .catch(e => {
            console.log(e);
          });
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    return (
      <Router>
        <Nav />
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route exact path='/stores' render={() => <Stores stores={this.state.stores} handleDeleteStore={this.handleDeleteStore} />} />
          <Route exact path='/stores/add' component={AddNewStore} />
          <Route exact path='/stores/products/:store_id' component={ViewStoreDetails} />
          <Route exact path='/products' render={() => <Products products={this.state.products} />} />
          <Route exact path='/products/add/:store_name/:store_id' component={AddNewStoreProduct} />
          <Route exact path='/inventory/:inventory_id' component={UpdateInventoryProduct} />
          <Route exact path='/inventory' render={() => <Inventory inventory={this.state.inventory} />} />
        </Switch>
      </Router>
    );
  }
}

export default App;
